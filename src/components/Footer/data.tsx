import { styled } from '@mui/material';
import AtlasRiskDashboardIcon from 'public/assets/svg/atlas_risk_dashboard.svg';
import DiscordIcon from 'public/assets/svg/discord.svg';
import GithubIcon from 'public/assets/svg/github.svg';
import ConnectIcon from 'public/assets/svg/makerdao_connect.svg';
import FusionIcon from 'public/assets/svg/makerdao_fusion.svg';
import PowerhouseIcon from 'public/assets/svg/powerhouse.svg';
import SkyIcon from 'public/assets/svg/sky-footer.svg';
import X from 'public/assets/svg/x.svg';
import YoutubeIcon from 'public/assets/svg/youtube.svg';
import type { FooterContact, LinkCategory, TypeIconFooter } from './type';

const XStyled = styled(X)(({ theme }) => ({
  width: 22,
  height: 22,
  marginLeft: 6,

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 4,
    marginRight: 8,
  },
}));

const linkCategory: LinkCategory[] = [
  {
    name: 'Sky Ecosystem',
    links: [
      {
        label: 'Forum',
        link: 'https://forum.makerdao.com/',
      },
      {
        label: 'Voting Portal',
        link: 'https://vote.makerdao.com/',
      },
      {
        label: 'MIPs Portal',
        link: 'https://mips.makerdao.com/mips/list',
      },
      {
        label: 'Sky Atlas',
        link: 'https://sky-atlas.powerhouse.io/',
      },
    ],
  },
  {
    name: 'Documentation',
    links: [
      {
        label: 'Organization',
        link: 'https://sky.money/',
      },
      {
        label: 'Sky Technical Documentation',
        link: 'https://docs.sky.money/',
      },
      {
        label: 'Brand Assets',
        link: 'https://www.notion.so/ec871fa39f9d41bf9cc4446e7d1f6997?pvs=25',
      },
      {
        label: 'Github Repos',
        link: 'https://github.com/makerdao',
      },
    ],
  },
  {
    name: 'Related Platforms',
    links: [
      {
        label: 'Atlas Risk Dashboard',
        link: 'https://info.sky.money/',
        Icon: AtlasRiskDashboardIcon,
      },
      {
        label: 'Connect',
        link: 'https://connect.sky.money/',
        Icon: ConnectIcon,
      },
      {
        label: 'Fusion',
        link: 'https://fusion.sky.money/',
        Icon: FusionIcon,
      },
    ],
  },
];

const iconsMakerDAO: TypeIconFooter[] = [
  {
    Icon: DiscordIcon,
    href: 'https://discord.gg/skyecosystem',
    title: 'discord',
  },
  {
    Icon: XStyled,
    href: 'https://x.com/SkyEcosystem',
    title: 'twitter',
  },
  {
    Icon: YoutubeIcon,
    href: 'https://www.youtube.com/@skyecosystem',
    title: 'youtube',
  },
  {
    Icon: GithubIcon,
    href: 'https://github.com/makerdao',
    title: 'github',
  },
];

const iconsPowerhouse: TypeIconFooter[] = [
  {
    Icon: DiscordIcon,
    href: 'https://discord.com/invite/h7GKvqDyDP',
    title: 'discord',
  },
  {
    Icon: XStyled,
    href: 'https://x.com/PowerhouseDAO',
    title: 'twitter',
  },
  {
    Icon: GithubIcon,
    href: 'https://github.com/powerhouse-inc',
    title: 'github',
  },
];

const contactMakerDAO: FooterContact = {
  title: 'Contact Sky',
  subtitle: 'Official Community Channels',
  Icon: SkyIcon,
  links: iconsMakerDAO,
};

const contactPowerhouse: FooterContact = {
  title: 'Contact Powerhouse',
  subtitle: 'Official Community Channels',
  Icon: PowerhouseIcon,
  links: iconsPowerhouse,
};

export { linkCategory, contactMakerDAO, contactPowerhouse };
