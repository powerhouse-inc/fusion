import { styled } from '@mui/material';
import Information from 'public/assets/svg/info_outlined.svg';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import type { FC } from 'react';

interface SectionTitleProps {
  title: string;
  tooltip?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title, tooltip }) => (
  <Wrapper>
    <Title>{title}</Title>
    {!!tooltip && (
      <SESTooltip content={tooltip} placement="bottom-start">
        <InfoWrapper>
          <Information />
        </InfoWrapper>
      </SESTooltip>
    )}
  </Wrapper>
);

export default SectionTitle;

const Wrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const Title = styled('h2')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '22px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const InfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 24,
  height: 24,
  cursor: 'pointer',

  '& > svg': {
    width: 16,
    height: 16,
  },
  '& > svg > path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
  '&:hover': {
    '& > svg > path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },
}));
