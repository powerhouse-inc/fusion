import { styled } from '@mui/material';
import { useMemo } from 'react';
import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import { usLocalizedNumber } from '@/core/utils/humanization';
import { formatDateStringToQuarter, progressPercentage } from '../../utils';
import type { FC } from 'react';

interface MilestoneCardProps {
  milestone: Milestone;
}

const MilestoneCard: FC<MilestoneCardProps> = ({ milestone }) => {
  // percentage in value from 0 to 1
  const percentage = useMemo(() => progressPercentage(milestone.scope.progress), [milestone.scope.progress]);

  return (
    <Container>
      <Header>
        <CodesContainer>
          <SequenceCode>{milestone.sequenceCode}</SequenceCode>
          <Code>{milestone.code}</Code>
        </CodesContainer>
        <QuarterBox>
          <Quarter>
            {/* target date should be printed out with the format: Q4’23 */}
            {formatDateStringToQuarter(milestone.targetDate)}
          </Quarter>
        </QuarterBox>
      </Header>
      <TitleContainer>
        <Title className="overview-milestone-title">{milestone.title}</Title>
        <Description>{milestone.abstract}</Description>
      </TitleContainer>
      <Progress>
        <ProgressTitleWrapper>
          <ProgressTitleContainer>
            <ProgressTitle>Progress</ProgressTitle>
          </ProgressTitleContainer>
        </ProgressTitleWrapper>
        <ProgressBarContainer>
          <ProgressBar progress={percentage} />
          <ProgressLabel progress={percentage}>{usLocalizedNumber(percentage * 100, 0)}%</ProgressLabel>
        </ProgressBarContainer>
      </Progress>
      <ViewContainer>
        <InternalLinkButton href={`#${milestone.code}`} buttonType="primary" label="View" />
      </ViewContainer>
    </Container>
  );
};

export default MilestoneCard;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '0px 0px 8px 0px',

  [theme.breakpoints.up('tablet_768')]: {
    height: '100%',
  },
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const CodesContainer = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const SequenceCode = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
}));

const Code = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[950] : theme.palette.colors.gray[50],
}));

const QuarterBox = styled('div')(() => ({
  padding: '4px 0px',
  borderRadius: 8,
}));

const Quarter = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: '100%',
  margin: '8px 8px 0px',
  padding: '4px 8px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const Title = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const Description = styled('div')(({ theme }) => ({
  width: '100%',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.gray[500],
}));

const Progress = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: '4px 8px 0px',
  padding: '8px 8px 6px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const ProgressTitleWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ProgressTitleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2.67,
}));

const ProgressTitle = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const ProgressBarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[600],
}));

const ProgressBar = styled('div')<{ progress: number }>(({ theme, progress }) => ({
  width: `max(${progress * 100}%, ${progress === 0 ? 0 : 0.5}px)`,
  height: 16,
  borderRadius: `4px ${progress === 1 ? '4px 4px' : '0px 0px'} 4px`,

  ...(progress === 1 && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
  }),

  ...(progress !== 1 && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
  }),
}));

const ProgressLabel = styled('span')<{ progress: number }>(({ theme, progress }) => ({
  position: 'absolute',
  top: 0,
  right: 8,
  fontWeight: 700,
  fontSize: 12,
  lineHeight: '16px',

  ...(progress === 1 && {
    color: theme.palette.colors.slate[50],
  }),

  ...(progress !== 1 && {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[600],
  }),
}));

const ViewContainer = styled('div')(() => ({
  margin: '4px 8px 0px',
  '& > a': {
    width: '100%',
    justifyContent: 'center',
    padding: '4px 16px',
    '&:hover': {
      padding: '4px 16px',
    },
  },
}));
