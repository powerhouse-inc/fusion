import { styled } from '@mui/material';
import type { CheckboxFilter, CumulativeFilter } from '../types';
import type { ReactElement } from 'react';

interface FilterAsListBaseProps extends React.PropsWithChildren {
  label: string;
  element?: ReactElement;
  filter?: CheckboxFilter | CumulativeFilter;
}

const FilterAsListBase: React.FC<FilterAsListBaseProps> = ({ label, element, filter, children }) => (
  <Container>
    {element !== undefined ? (
      <ElementContainer onClick={filter !== undefined ? filter.onChange : undefined}>
        <Label>{label}</Label>
        {element}
      </ElementContainer>
    ) : (
      <Label>{label}</Label>
    )}
    <ListContainer>{children}</ListContainer>
  </Container>
);

export default FilterAsListBase;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const ElementContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: 8,
  cursor: 'pointer',
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
  paddingLeft: 8,
}));

const ListContainer = styled('div')(({ theme }) => ({
  borderRadius: 12,
  overflow: 'hidden',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.30)',
  boxShadow: theme.palette.isLight
    ? '0 0 17.4px rgba(30, 33, 36, 0.03) inset'
    : '0px 0px 17.4px 0px rgba(30, 33, 36, 0.03) inset',
}));
