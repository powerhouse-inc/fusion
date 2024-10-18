import { styled } from '@mui/material';
import React from 'react';
import CardSheetMobile from '@/components/CardSheetMobile/CardSheetMobile';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { FC } from 'react';

interface Props {
  shortCode: string;
}

const ItemCustomProject: FC<Props> = ({ shortCode }) => (
  <CardSheetMobile
    title="Projects"
    description={`View all the of the projects ${shortCode} is involved in and there status.`}
  >
    <ContainerChildren>
      <InternalLinkButton href={siteRoutes.ecosystemActorProjects(shortCode)} label="View Projects" showIcon />
    </ContainerChildren>
  </CardSheetMobile>
);

export default ItemCustomProject;

const ContainerChildren = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
