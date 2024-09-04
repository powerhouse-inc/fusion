import { styled } from '@mui/material';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import Information from '@/components/icons/information';
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

const InfoWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 24,
  height: 24,
  cursor: 'pointer',
});
