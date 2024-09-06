import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';

import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import AvatarPlaceholder from '@/stories/components/svg/avatar-placeholder';

interface Props {
  support: OwnerRef;
  isShowName?: boolean;
}

const ProjectSupportTooltip: React.FC<Props> = ({ support, isShowName = false }) => (
  <SESTooltip
    content={
      <TooltipContainer>
        <Title>Supporter</Title>
        <ContainerInfoTooltip>
          {support.imageUrl ? <AvatarStyled src={support.imageUrl} /> : <AvatarPlaceholder width={24} height={24} />}
          <Name>{support?.name}</Name>
        </ContainerInfoTooltip>
      </TooltipContainer>
    }
    placement="bottom-start"
  >
    <Container>
      {support.imageUrl ? <AvatarStyled src={support.imageUrl} /> : <AvatarPlaceholder width={24} height={24} />}
      {isShowName && <Name>{support?.name}</Name>}
    </Container>
  </SESTooltip>
);

export default ProjectSupportTooltip;

const TooltipContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  cursor: 'pointer',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.darkMode,
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  '& svg': {
    borderRadius: 20,
    boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.darkMode,
  },
}));

const ContainerInfoTooltip = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  '& svg': {
    borderRadius: 20,
    boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.darkMode,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'none',
  },
}));

const Name = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',
  ':hover': {
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
  },
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.charcoal[100],
  fontFamily: 'Inter,san-serif',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '21.6px',
}));
