import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import React from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import OwnerTooltipContent from '../OwnerTooltipContent/OwnerTooltipContent';

interface SupportedTeamsAvatarGroupProps {
  supporters: OwnerRef[];
}

const SupportedTeamsAvatarGroup: React.FC<SupportedTeamsAvatarGroupProps> = ({ supporters }) => (
  <SESTooltip content={<OwnerTooltipContent title="Supporters" items={supporters} />}>
    <StyledAvatarGroup total={supporters.length}>
      {supporters.map((supporter) => (
        <StyledAvatar key={supporter.id} alt={supporter.name} src={supporter.imageUrl} />
      ))}
    </StyledAvatarGroup>
  </SESTooltip>
);

export default SupportedTeamsAvatarGroup;

const StyledAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#343442'}`,
  background: theme.palette.isLight ? '#fff' : '#10191F',
  padding: 3,
  borderRadius: 20,
  cursor: 'pointer',

  '& .MuiAvatar-root': {
    border: 'none',
  },

  '& .MuiAvatarGroup-avatar': {
    width: 24,
    height: 24,
    fontSize: 12,
    boxShadow: '1px 2px 3px 0px rgba(26, 171, 155, 0.25)',
  },
}));

const StyledAvatar = styled(Avatar)({
  width: 24,
  height: 24,
  boxShadow: '1px 2px 3px 0px rgba(26, 171, 155, 0.25)',

  '&:not(:last-of-type)': {
    marginLeft: -8,
  },
});
