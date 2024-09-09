import { styled } from '@mui/material';
import AvatarPlaceholder from 'public/assets/svg/avatar_placeholder.svg';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';

interface CoordinatorsProps {
  coordinators: OwnerRef[];
}

const Coordinators: React.FC<CoordinatorsProps> = ({ coordinators }) => (
  <CoordinatorsBox>
    <Title>Coordinator(s)</Title>

    <CoordinatorsList>
      {coordinators?.map((coordinator) => (
        <Coordinator key={coordinator.id}>
          <AvatarPlaceholder width={24} height={24} />
          <CoordinatorName>{coordinator.name}</CoordinatorName>
        </Coordinator>
      ))}
    </CoordinatorsList>
  </CoordinatorsBox>
);

export default Coordinators;

const CoordinatorsBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '7px 15px',
  borderRadius: 12,
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '7px 15px 15px',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[600],
}));

const CoordinatorsList = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
}));

const Coordinator = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  alignSelf: 'stretch',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.charcoal[500],
  },
  '& rect': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700],
  },
}));

const CoordinatorName = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.slate[100],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
