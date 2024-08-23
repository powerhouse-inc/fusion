import { styled } from '@mui/material';
import React from 'react';
import ItemLegendAxisValues from './ItemLegendAxisValues';

const mobileAxisYValues = [
  {
    width: 13,
  },
  {
    width: 26,
  },
  {
    width: 16,
  },
  {
    width: 25,
  },
  {
    width: 16,
  },
  {
    width: 25,
  },
  {
    width: 16,
  },
  {
    width: 25,
  },
  {
    width: 16,
  },
];

const LegendAxisYItems: React.FC = () => (
  <LegendAxisY>
    <Mobile>
      {mobileAxisYValues.map((_, index) => (
        <LegendAxisYItemContainer key={index}>
          <ItemLegendAxisValues width={16} />
        </LegendAxisYItemContainer>
      ))}
    </Mobile>
    <Table>
      {mobileAxisYValues.map((_, index) => (
        <LegendAxisYItemContainer key={index}>
          <ItemLegendAxisValues width={48} />
        </LegendAxisYItemContainer>
      ))}
    </Table>
  </LegendAxisY>
);

export default LegendAxisYItems;

const LegendAxisY = styled('div')({
  display: 'flex',
});
const LegendAxisYItemContainer = styled('div')({
  display: 'flex',
});

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  justifyContent: 'flex-end',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
const Table = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'flex-end',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 12,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 20,
  },
}));
