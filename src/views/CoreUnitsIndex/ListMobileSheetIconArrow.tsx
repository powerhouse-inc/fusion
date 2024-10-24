import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import SocialMediaLinksButton from '@/components/ButtonLink/SocialMediaLinksButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import { buildQueryString } from '@/core/utils/urls';

interface Props {
  coreUnit: CoreUnit;
  className?: string;
}

const ListMobileSheetIconArrow: React.FC<Props> = ({ coreUnit, className }) => {
  const router = useRouter();
  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);
  return (
    <ContainerLinksArrowsMobile className={className}>
      <SocialMediaLinksButton socialMedia={coreUnit.socialMediaChannels?.[0]} hideLabelIn={['desktop_1024']} />
      <InternalLinkButtonStyled href={`${siteRoutes.coreUnitAbout(coreUnit.shortCode)}/${queryStrings}`} showIcon />
    </ContainerLinksArrowsMobile>
  );
};

export default ListMobileSheetIconArrow;
const ContainerLinksArrowsMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  height: 32,
  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-end',
    gap: 8,
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  padding: '2px 8px 2px 8px',
  width: 40,
  height: 32,
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});
