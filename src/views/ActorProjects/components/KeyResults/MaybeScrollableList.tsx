import { styled } from '@mui/material';
import React from 'react';
import SimpleBar from 'simplebar-react';

interface MaybeScrollableListProps extends React.PropsWithChildren {
  scrollable: boolean;
}

const MaybeScrollableList: React.FC<MaybeScrollableListProps> = ({ scrollable, children }) =>
  scrollable ? (
    <SimpleBarStyled
      style={{
        height: 150,
      }}
      autoHide={false}
    >
      <ResultList>{children}</ResultList>
    </SimpleBarStyled>
  ) : (
    <ResultList>{children}</ResultList>
  );

export default MaybeScrollableList;

const ResultList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  padding: '0px 8px 0px 0px',
  height: '100%',
});

const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  borderRadius: 12,

  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    borderRadius: 20,
    background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
  },
}));
