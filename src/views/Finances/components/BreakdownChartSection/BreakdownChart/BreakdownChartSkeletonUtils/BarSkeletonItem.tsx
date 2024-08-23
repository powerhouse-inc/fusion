import { styled } from '@mui/material';
import React from 'react';

const mobileBarsValues = [
  {
    height: 148,
  },
  {
    height: 150,
  },
  {
    height: 155,
  },
  {
    height: 139,
  },
  {
    height: 150,
  },
  {
    height: 156,
  },
  {
    height: 162,
  },
  {
    height: 166,
  },
  {
    height: 164,
    heightRelative: 13,
  },
  {
    height: 162,
    heightRelative: 23,
  },
  {
    height: 169,
    heightRelative: 53,
  },
  {
    height: 168,
    heightRelative: 48,
  },
];
const tabletBarsValues = [
  {
    height: 195,
  },
  {
    height: 195,
  },
  {
    height: 196,
  },
  {
    height: 180,
  },
  {
    height: 185,
  },
  {
    height: 192,
  },
  {
    height: 197,
  },
  {
    height: 208,
  },
  {
    height: 211,
    heightRelative: 13,
  },
  {
    height: 215,
    heightRelative: 23,
  },
  {
    height: 220,
    heightRelative: 53,
  },
  {
    height: 228,
    heightRelative: 48,
  },
];
const DeskBarsValues = [
  {
    height: 245,
  },
  {
    height: 244,
  },
  {
    height: 246,
  },
  {
    height: 226,
  },
  {
    height: 256,
  },
  {
    height: 264,
  },
  {
    height: 273,
  },
  {
    height: 286,
  },
  {
    height: 291,
    heightRelative: 13,
  },
  {
    height: 297,
    heightRelative: 23,
  },
  {
    height: 303,
    heightRelative: 53,
  },
  {
    height: 308,
    heightRelative: 48,
  },
];

const BarSkeletonItems: React.FC = () => (
  <ContainerBars>
    <Mobile>
      {mobileBarsValues.map((item, index) => (
        <WrapperBox height={item.height} key={index}>
          {item.heightRelative && <InsideBox height={item.heightRelative} />}
        </WrapperBox>
      ))}
    </Mobile>
    <Table>
      {tabletBarsValues.map((item, index) => (
        <WrapperBox height={item.height} key={index}>
          {item.heightRelative && <InsideBox height={item.heightRelative} />}
        </WrapperBox>
      ))}
    </Table>
    <Desk>
      {DeskBarsValues.map((item, index) => (
        <WrapperBox height={item.height} key={index}>
          {item.heightRelative && <InsideBox height={item.heightRelative} />}
        </WrapperBox>
      ))}
    </Desk>
  </ContainerBars>
);
export default BarSkeletonItems;

const ContainerBars = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));
const WrapperBox = styled('div')<{ height: number; hasBorder?: boolean }>(({ theme, height }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  background: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  width: 16,
  borderRadius: 4,
  overflow: 'hidden',
  height,
  [theme.breakpoints.up('tablet_768')]: {
    width: 23,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 30,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 40,
  },
}));

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: 8,
  alignItems: 'flex-end',

  justifyContent: 'space-between',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Table = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    selfAlign: 'end',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },

  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
}));

const Desk = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 19,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',

    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 24,
  },
}));

const InsideBox = styled('div')<{ height?: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
  display: 'flex',
  top: 0,

  width: 16,
  position: 'absolute',
  height,
  [theme.breakpoints.up('tablet_768')]: {
    width: 23,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 30,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 40,
  },
}));
