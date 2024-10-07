import styled from '@emotion/styled';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';

interface Props {
  count?: number;
  breadcrumbs: string[];
  isCoreUnit?: boolean;
}

const Breadcrumb = ({ isCoreUnit = false, count, breadcrumbs }: Props) => (
  <Stack direction="row">
    <BreadcrumbsStyle separator={<BreadcrumbSeparator />} aria-label="breadcrumb">
      {isCoreUnit && (
        <Typography key="1" color="#708390" fontFamily={'Inter, sans-serif'}>
          {`Core Units (${count})`}
        </Typography>
      )}

      {breadcrumbs && breadcrumbs.map((crumb, index) => <TypographyStyle key={index}>{crumb}</TypographyStyle>)}
    </BreadcrumbsStyle>
  </Stack>
);

const BreadcrumbsStyle = styled(Breadcrumbs)({
  '& .MuiBreadcrumbs-li': {
    '&:last-of-type p': {
      color: '#231536',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '19px',
      fontFamily: 'Inter, sans-serif',
    },
  },
  '& .MuiBreadcrumbs-separator': {
    marginLeft: '15px',
    marginRight: '15px',
  },
});

const TypographyStyle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: ' #708390',
  fontFamily: 'Inter, sans-serif',
});

export default Breadcrumb;
