import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import React from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { siteRoutes } from '@/config/routes';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import AvatarPlaceholder from '@/stories/components/svg/avatar-placeholder';
import type { Owner } from '@ses/core/models/interfaces/projects';

interface ProjectOwnerChipProps {
  tooltipText?: string;
  owner: Owner | OwnerRef;
  isShowName?: boolean;
}

const ProjectOwner: React.FC<ProjectOwnerChipProps> = ({ owner, tooltipText = 'Owner', isShowName = true }) => (
  <SESTooltip content={<TooltipText>{tooltipText}</TooltipText>} placement="bottom-start">
    <LinkStyled href={siteRoutes.ecosystemActorAbout(owner.code ?? '')}>
      {(owner as OwnerRef).imageUrl ? (
        <AvatarStyled src={(owner as OwnerRef).imageUrl} />
      ) : (
        <AvatarPlaceholder width={24} height={24} />
      )}
      {isShowName && <Name>{owner?.name}</Name>}
    </LinkStyled>
  </SESTooltip>
);

export default ProjectOwner;

const TooltipText = styled('div')({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.3,
});

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  cursor: 'pointer',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.darkMode,
}));
const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  '& svg': {
    borderRadius: 20,
    boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.darkMode,
  },
}));

const Name = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',
  ':hover': {
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[400],
  },
}));
