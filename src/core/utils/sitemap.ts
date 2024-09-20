import { fetchCoreUnits } from '@/views/CoreUnitsIndex/cuTableAPI';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import { fetchBudgets } from '@/views/Finances/api/queries';
import { BASE_URL, siteRoutes } from '../../config/routes';
import { ResourceType } from '../models/interfaces/types';
import type { CoreUnitDto } from '../models/dto/coreUnitDTO';
import type { Team } from '../models/interfaces/team';
import type { MetadataRoute } from 'next';

type SitemapRoute = MetadataRoute.Sitemap[0];

interface RouteOptions {
  lastModified?: SitemapRoute['lastModified'];
  changeFrequency?: SitemapRoute['changeFrequency'];
  priority?: number;
}

export default class SitemapBuilder {
  /**
   * Create a single sitemap route.
   * @param url The relativeURL of the route.
   * @param lastModified The last modified date of the route.
   * @param changeFrequency The change frequency of the route.
   * @param priority The priority of the route.
   * @returns The sitemap route.
   */
  private createRoute(url: string, options?: RouteOptions): SitemapRoute {
    return {
      url: `${BASE_URL}${encodeURIComponent(url).replace(/%2F/g, '/')}`,
      lastModified: options?.lastModified || new Date().toISOString(),
      changeFrequency: options?.changeFrequency || 'weekly',
      priority: options?.priority || 1,
    };
  }

  /**
   * Get all the static routes that do not require API calls to build the URLs.
   * @returns The static routes.
   */
  private getStaticRoutes(): SitemapRoute[] {
    return [
      this.createRoute(siteRoutes.home),
      this.createRoute(siteRoutes.coreUnitsOverview),
      this.createRoute(siteRoutes.ecosystemActors),
      this.createRoute(siteRoutes.recognizedDelegate),
      this.createRoute(siteRoutes.recognizedDelegateReport),
      this.createRoute(siteRoutes.endgame),
      this.createRoute(siteRoutes.globalActivityFeed, { changeFrequency: 'daily' }),
      this.createRoute(siteRoutes.cookiesPolicy),
      this.createRoute(siteRoutes.disclaimer),
      this.createRoute(siteRoutes.contributors),
      // the roadmap should be dynamic once they are implemented and there is no just one hard-coded
      this.createRoute(siteRoutes.roadmapMilestones('ph-2024')),

      // auth
      this.createRoute(siteRoutes.login, { changeFrequency: 'never' }),
    ];
  }

  /**
   * Get all the routes related to a single core unit.
   * @param cu The core unit to get the routes for.
   * @returns The routes related to the core unit.
   */
  private getCoreUnitRoutes(cu: CoreUnitDto): SitemapRoute[] {
    return [
      this.createRoute(siteRoutes.coreUnitAbout(cu.shortCode)),
      this.createRoute(siteRoutes.coreUnitReports(cu.shortCode)),
      this.createRoute(siteRoutes.coreUnitActivityFeed(cu.shortCode)),
    ];
  }

  /**
   * Get all the routes related to a single ecosystem actor.
   * @param actor The ecosystem actor to get the routes for.
   * @returns The routes related to the ecosystem actor.
   */
  private getEcosystemActorRoutes(actor: Team): SitemapRoute[] {
    return [
      this.createRoute(siteRoutes.ecosystemActorAbout(actor.shortCode)),
      this.createRoute(siteRoutes.ecosystemActorReports(actor.shortCode)),
      this.createRoute(siteRoutes.ecosystemActorProjects(actor.shortCode)),
    ];
  }

  /**
   * Get all the routes related to each core unit.
   * @returns The dynamic core unit routes.
   */
  private async getDynamicCoreUnitRoutes(): Promise<SitemapRoute[]> {
    const coreUnits = (await fetchCoreUnits()) as CoreUnitDto[];
    return coreUnits.flatMap((cu) => this.getCoreUnitRoutes(cu));
  }

  /**
   * Get all the routes related to each ecosystem actor.
   * @returns The dynamic ecosystem actor routes.
   */
  private async getDynamicEcosystemActorRoutes(): Promise<SitemapRoute[]> {
    const actors = (await fetchActors(ResourceType.EcosystemActor)) as Team[];
    return actors.flatMap((actor) => this.getEcosystemActorRoutes(actor));
  }

  /**
   * Get all the routes related to the finances, including all its sub-levels.
   * @returns The dynamic finances routes.
   */
  private async getDynamicFinancesRoutes(): Promise<SitemapRoute[]> {
    const budgets = await fetchBudgets();

    return [
      this.createRoute(siteRoutes.finances(), { changeFrequency: 'monthly' }),
      ...budgets.map((budget) => this.createRoute(siteRoutes.finances(budget.codePath.replace('atlas/', ''))), {
        changeFrequency: 'monthly',
      }),
    ];
  }

  /**
   * Build all the dynamic routes.
   * @returns The dynamic routes.
   */
  private async getDynamicRoutes(): Promise<MetadataRoute.Sitemap> {
    const [cuRoutes, actorRoutes, financesRoutes] = await Promise.all([
      this.getDynamicCoreUnitRoutes(),
      this.getDynamicEcosystemActorRoutes(),
      this.getDynamicFinancesRoutes(),
    ]);

    return [...cuRoutes, ...actorRoutes, ...financesRoutes];
  }

  /**
   * Build the sitemap.
   * @returns The sitemap.
   */
  async build(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = this.getStaticRoutes();
    const dynamicRoutes = await this.getDynamicRoutes();

    return [...staticRoutes, ...dynamicRoutes];
  }
}
