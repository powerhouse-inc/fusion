import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { ProjectsAndSupportedProjects } from '@ses/core/models/interfaces/projects';

export const getProjectsQuery = (teamId: number | string) => ({
  query: gql`
    query TeamProjects($filter: ProjectFilter) {
      teamProjects(filter: $filter) {
        projects {
          __typename
          id
          owner {
            ref
            id
            imgUrl
            name
            code
          }
          code
          title
          abstract
          description
          status
          progress {
            ... on Percentage {
              __typename
              value
            }
            ... on StoryPoints {
              __typename
              completed
              total
            }
          }
          imgUrl
          budgetType
          deliverables {
            id
            parentIdRef
            code
            title
            description
            status
            progress {
              ... on Percentage {
                __typename
                value
              }
              ... on StoryPoints {
                __typename
                completed
                total
              }
            }
            owner {
              code
              name
              imgUrl
              id
              ref
            }
            keyResults {
              link
              title
              parentIdRef
              id
            }
            milestone
          }
        }
        supportedProjects {
          __typename
          id
          code
          title
          abstract
          description
          status
          budgetType
          progress {
            ... on Percentage {
              __typename
              value
            }
            ... on StoryPoints {
              __typename
              completed
              total
            }
          }
          projectOwner {
            code
            name
            imgUrl
            id
            ref
          }
          supportedDeliverables {
            id
            parentIdRef
            code
            title
            description
            status
            progress {
              ... on Percentage {
                __typename
                value
              }
              ... on StoryPoints {
                __typename
                completed
                total
              }
            }
            milestone
            owner {
              code
              name
              imgUrl
              id
              ref
            }
          }
          supportedKeyResults {
            link
            title
            parentIdRef
            id
          }
        }
      }
    }
  `,
  filter: {
    filter: {
      ownedBy: {
        id: teamId.toString(),
        ref: 'EcosystemActor',
      },
    },
  },
});

export const fetchProjects = async (id: string | number): Promise<ProjectsAndSupportedProjects> => {
  const { query, filter } = getProjectsQuery(id);
  const res = await request<{ teamProjects: ProjectsAndSupportedProjects }>(GRAPHQL_ENDPOINT, query, filter);

  return res?.teamProjects;
};
