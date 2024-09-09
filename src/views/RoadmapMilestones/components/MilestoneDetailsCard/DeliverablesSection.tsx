import { styled } from '@mui/material';
import type { MDeliverable } from '@/core/models/interfaces/deliverables';
import DeliverableCard from '@/views/ActorProjects/components/DeliverableCard/DeliverableCard';
import { splitInRows } from '@/views/ActorProjects/components/ProjectCard/ProjectCard';

interface DeliverablesSectionProps {
  deliverables: MDeliverable[];
}

const DeliverablesSection: React.FC<DeliverablesSectionProps> = ({ deliverables }) => {
  const deliverablesRows = splitInRows(deliverables, 2);

  return (
    <DeliverablesContainer>
      <Header>
        <TitleBox>
          <Title>Deliverables</Title>
          <Count>{deliverables?.length}</Count>
        </TitleBox>
      </Header>

      <DeliverablesGrid>
        {deliverables.length === 0 && <NoDeliverables>No Deliverable Available</NoDeliverables>}

        {deliverablesRows.map((row) =>
          row.map((deliverable) => (
            <DeliverableCard
              key={deliverable.id}
              isProjectCard={false}
              deliverable={deliverable}
              viewMode={'detailed'}
              maxKeyResultsOnRow={row.map((d) => d.keyResults.length).reduce((a, b) => Math.max(a, b), 0)}
            />
          ))
        )}
      </DeliverablesGrid>
    </DeliverablesContainer>
  );
};

export default DeliverablesSection;

const DeliverablesContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',

  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 16,
  },
}));

const TitleBox = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 14,
}));

const Title = styled('h3')(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '120%',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  margin: 0,

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
  },
}));

const Count = styled('div')(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '120%',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
  },
}));

const DeliverablesGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,

    '& > *': {
      width: '100%',
      maxWidth: 'calc(50% - 12px)',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,

    '& > *': {
      maxWidth: 'calc(50% - 16px)',
    },
  },
}));

const NoDeliverables = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  maxWidth: '100%',
  color: theme.palette.isLight ? '#B6BCC2' : '#6E7A8A',
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  padding: '64px 0',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
  },
}));
