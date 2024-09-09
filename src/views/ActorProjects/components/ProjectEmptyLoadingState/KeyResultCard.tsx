import { Skeleton, styled } from '@mui/material';
import React from 'react';
import KeyResultItem from './keyResulItem';

const KeyResultCard = () => (
  <Container>
    <TitleKeyResult variant="rectangular" />
    <KeyResultContainer>
      <KeyResultItem widthFirstItem={258} />
      <KeyResultItem widthFirstItem={120} />
      <KeyResultItem widthFirstItem={139} />
      <KeyResultItem widthFirstItem={160} />
      <KeyResultItem widthFirstItem={189} />
      <KeyResultItem widthFirstItem={167} />
    </KeyResultContainer>
  </Container>
);

export default KeyResultCard;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderRadius: 12,
  padding: '4px 8px 8px 8px',
  border: `1px solid  ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const TitleKeyResult = styled(Skeleton)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 67,
  borderRadius: 4,
  height: 18,
});

const KeyResultContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
