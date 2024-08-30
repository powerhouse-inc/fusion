import { styled, useTheme } from '@mui/material';
import React from 'react';
import { HeaderRowSkeleton } from './HeaderRowSkeleton';
import RowSkeleton from './RowSkeleton';

interface Props {
  differentNumberOfRows?: boolean;
}

const BreakdownTableBodySkeleton: React.FC<Props> = ({ differentNumberOfRows = true }) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;

  return (
    <Container>
      <Header>
        <HeaderRowSkeleton />
      </Header>
      {differentNumberOfRows ? (
        <Body>
          <Mobile>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[52, 39]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[59, 67]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[49]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Mobile>

          <Tablet>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Tablet>

          <Desk1024>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Desk1024>

          <Desk1280>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Desk1280>

          <Desk1440>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Desk1440>
        </Body>
      ) : (
        <Body>
          <Mobile>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[37, 53]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[54, 53]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[54, 53]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[40, 61]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[65, 46]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Mobile>

          <Tablet>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[127, 76]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[94, 114]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Tablet>

          <Desk1024>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[109, 73]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[94, 114]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Desk1024>

          <Desk1280>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[146]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[148]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Desk1280>

          <Desk1440>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[146]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#fff' : theme.palette.colors.charcoal[900]}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[148]}
              backgroundRow={isLight ? theme.palette.colors.gray[50] : '#232832'}
            />
          </Desk1440>
        </Body>
      )}
    </Container>
  );
};

export default BreakdownTableBodySkeleton;

const Container = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.isLight ? 'rgba(212, 217, 225, 0.15)' : 'none'}`,
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

const Header = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : '#232832',
}));

const Body = styled('div')({});

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Tablet = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Desk1024 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Desk1280 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Desk1440 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
