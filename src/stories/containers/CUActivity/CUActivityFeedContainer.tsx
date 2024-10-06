'use client';

import { styled } from '@mui/material';
import React from 'react';
import ActivityTable from '../../components/CUActivityTable/ActivityTable';
import { useCuActivity } from './useCuActivity';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface CUActivityContainerProps {
  coreUnit: CoreUnit;
  activities: ChangeTrackingEvent[];
}

const CUActivityFeedContainer: React.FC<CUActivityContainerProps> = ({ coreUnit, activities }) => {
  const { columns, onSortClick } = useCuActivity();

  return (
    <Wrapper>
      <Container>
        <InnerPage>
          <TableWrapper>
            <ActivityTable
              columns={columns}
              shortCode={coreUnit.shortCode}
              activityFeed={activities.map((activity) => ({
                activityFeed: activity,
              }))}
              sortClick={onSortClick}
            />
          </TableWrapper>
          <Title>Additional Notes</Title>
          <Paragraph>
            The table below reflects the activity regarding the {coreUnit.shortCode} Core Unit. Here you will be able to
            see all previous modifications that the Core Unit has made to their Expense Reports, FTEs, and more.
          </Paragraph>
        </InnerPage>
      </Container>
    </Wrapper>
  );
};

export default CUActivityFeedContainer;

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Container = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '64px',

  flex: 1,
  backgroundColor: theme.palette.isLight ? '#FFFFFF' : '#000000',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '79px',

  [theme.breakpoints.up('tablet_768')]: {
    paddingBottom: '128px',
  },
}));

const InnerPage = styled('div')(({ theme }) => ({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  paddingTop: 24,
  paddingRight: '64px',
  paddingLeft: '64px',
  [theme.breakpoints.down('tablet_768')]: {
    paddingRight: '16px',
    paddingLeft: '16px',
  },
  [theme.breakpoints.up('tablet_768')]: {
    paddingTop: 32,
  },
  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },
  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingRight: '48px',
    paddingLeft: '48px',
  },

  [theme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
}));

export const Title = styled('div')<{
  marginBottom?: number;

  fontSize?: string;
  responsiveMarginBottom?: number;
}>(({ marginBottom = 16, fontSize = '20px', responsiveMarginBottom, theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize,
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom,
  marginTop: 64,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '24px',
    marginBottom: `${responsiveMarginBottom || marginBottom}px`,
  },
}));

export const Paragraph = styled('p')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '16px',
  },
}));

const TableWrapper = styled('div')({
  maxWidth: '928px',
  width: '100%',
  margin: '0px auto',
});
