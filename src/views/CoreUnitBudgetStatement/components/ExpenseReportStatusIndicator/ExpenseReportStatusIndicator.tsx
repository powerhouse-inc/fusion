import { styled } from '@mui/material';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { BASE_URL } from '@/config/routes';
import { BudgetStatus } from '@/core/models/interfaces/types';
import ExpenseReportStatus from '../ExpenseReportStatus/ExpenseReportStatus';

export type ExpenseReportStatusIndicatorProps = {
  budgetStatus?: BudgetStatus;
  showCTA: boolean;
  className?: string;
};

const ExpenseReportStatusIndicator: React.FC<ExpenseReportStatusIndicatorProps> = ({
  budgetStatus,
  showCTA,
  className,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = useMemo(() => {
    const currentUrl = new URL(pathname ?? '', BASE_URL);
    const currentQueryParams = new URLSearchParams(searchParams ?? '');
    currentQueryParams.set('section', 'comments');

    return `${currentUrl.pathname}?${currentQueryParams.toString()}${currentUrl.hash}`;
  }, [pathname, searchParams]);

  return (
    <IndicatorContainer className={className}>
      {budgetStatus && <ExpenseReportStatus status={budgetStatus} />}
      {showCTA && budgetStatus !== BudgetStatus.Final && (
        <Link href={url} shallow={true} legacyBehavior>
          <StyledLink>Go to {budgetStatus}</StyledLink>
        </Link>
      )}
    </IndicatorContainer>
  );
};

export default ExpenseReportStatusIndicator;

const IndicatorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    marginLeft: 16,
  },
}));

const StyledLink = styled('a')(({ theme }) => ({
  marginLeft: 8,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: '#447AFB',
  cursor: 'pointer',
  minWidth: 'fit-content',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));
