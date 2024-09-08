import { styled } from '@mui/material';
import CSSMediaQuery from '@/components/CSSMediaQuery/CSSMediaQuery';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import Contributors from './Contributors';
import Coordinators from './Coordinators';
import DeliverablesSection from './DeliverablesSection';
import MilestoneProgress from './MilestoneProgress';
import StatsData from './StatsData';

interface MilestoneDetailsCardProps {
  milestone: Milestone;
}

const MilestoneDetailsCard: React.FC<MilestoneDetailsCardProps> = ({ milestone }) => {
  const titleAndDescription = (
    <TitleAndDescriptionContainer>
      <Name>{milestone.title}</Name>

      <DescriptionContainer>
        {milestone.description.split('\n').map((paragraph, index) => (
          <Paragraph key={index}>{paragraph}</Paragraph>
        ))}
      </DescriptionContainer>
    </TitleAndDescriptionContainer>
  );

  return (
    <Card id={milestone.code}>
      <AsideTop>
        <Aside>
          <CodeBox>
            <Id>{milestone.sequenceCode}</Id>
            <Code>{milestone.code}</Code>
          </CodeBox>

          <MilestoneProgress data={milestone.scope} />
          <StatsData targetDate={milestone.targetDate} />
          <Coordinators coordinators={milestone.coordinators} />
          <Contributors contributors={milestone.contributors} />
        </Aside>

        <CSSMediaQuery max="desktop_1024">{titleAndDescription}</CSSMediaQuery>
      </AsideTop>
      <MilestoneContent>
        <CSSMediaQuery min="desktop_1024">{titleAndDescription}</CSSMediaQuery>

        <DeliverablesSection deliverables={milestone.scope?.deliverables} />
      </MilestoneContent>
    </Card>
  );
};

export default MilestoneDetailsCard;

const Card = styled('article')(({ theme }) => ({
  position: 'relative',
  scrollMarginTop: 170,

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const AsideTop = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    position: 'sticky',
    top: 170,
    height: 'fit-content',
  },
}));

const Aside = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '7px 15px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 340,
    minWidth: 340,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 304,
    minWidth: 304,
    gap: 16,
    padding: '15px 15px 23px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 379,
    minWidth: 379,
    padding: '15px 23px 23px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 416,
    minWidth: 416,
  },
}));

const TitleAndDescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '7px 15px 15px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,

  [theme.breakpoints.up('tablet_768')]: {
    height: '100%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    border: 'none',
    padding: 0,
  },
}));

const Name = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '120%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
  },
}));

const DescriptionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.slate[100],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const CodeBox = styled('div')(({ theme }) => ({
  display: 'flex',
  maxWidth: 'fit-content',
  gap: 4,
  borderRadius: 8,
  padding: '3px 7px',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,
}));

const Id = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '120%',
  },
}));

const Code = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '120%',
  },
}));

const MilestoneContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 20,
    maxWidth: 'calc(100% - 304px - 24px)',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 'calc(100% - 379px - 32px)',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 'calc(100% - 416px - 32px)',
  },
}));
