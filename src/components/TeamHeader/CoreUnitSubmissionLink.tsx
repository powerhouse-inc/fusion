import { styled } from '@mui/material';
import { DateTime } from 'luxon';
import {
  getLatestMip39FromCoreUnit,
  getMipUrlFromCoreUnit,
  getSubmissionDateFromCuMip,
} from '@/core/businessLogic/coreUnits';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';
import ExternalLinkButton from '../ExternalLinkButton/ExternalLinkButton';

interface CoreUnitSubmissionLinkProps {
  team: Team;
}

const CoreUnitSubmissionLink: React.FC<CoreUnitSubmissionLinkProps> = ({ team }) => {
  if (team.type === ResourceType.Delegates) {
    return (
      <SinceDateCoreUnit href="https://makerburn.com/#/expenses/core-units/DELEGATES">
        Onchain Transactions
      </SinceDateCoreUnit>
    );
  } else {
    const submissionDate = getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(team as unknown as CoreUnit));
    if (!submissionDate) return null;
    return (
      <SinceDateCoreUnit href={getMipUrlFromCoreUnit(team as unknown as CoreUnit) ?? ''}>
        {`Since ${DateTime.fromJSDate(submissionDate).toFormat('d-MMM-y').toUpperCase()}`}
      </SinceDateCoreUnit>
    );
  }
};

export default CoreUnitSubmissionLink;

const SinceDateCoreUnit = styled(ExternalLinkButton)(({ theme }) => ({
  alignSelf: 'baseline',
  padding: '0px 2px 0px 4px',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '24px',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  '&:hover': {
    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },
  '& div': {
    width: 16,
    height: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    padding: '0px 6px 0px 8px',
  },
}));
