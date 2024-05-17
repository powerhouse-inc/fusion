import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Card from '@/components/Card/Card';
import BudgetTransitionChart from '../BudgetTransitionChart/BudgetTransitionChart';
import TransitionDataPicker from '../TransitionDataPicker/TransitionDataPicker';
import type { BudgetTransitionPlainData } from '../../types';
import type { TransitionDataPickerProps } from '../TransitionDataPicker/TransitionDataPicker';

interface BudgetTransitionStatusSectionProps extends TransitionDataPickerProps {
  data: BudgetTransitionPlainData;
}

const BudgetTransitionStatusSection: React.FC<BudgetTransitionStatusSectionProps> = ({
  selected,
  handleChange,
  data,
}) => (
  <Content id="section-budget-transition-status">
    <CardContainer>
      <TransitionDataPicker selected={selected} handleChange={handleChange} />
      <BudgetTransitionChart data={data} selected={selected} />
    </CardContainer>
  </Content>
);

export default BudgetTransitionStatusSection;

const Content = styled('section')({
  display: 'flex',

  scrollMarginTop: 130, // here
});

const CardContainer = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 21,
  borderRadius: 6,
  padding: '8px 8px 16px 8px',
  margin: '0 auto',
  width: '100%',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '16px',
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px  16px 24px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 32px 16px 32px',
  },
}));
