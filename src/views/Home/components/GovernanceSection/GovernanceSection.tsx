import { styled } from '@mui/material';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import { sectionsData } from '../../staticData';
import { SectionTitle } from '../FinancesSectionTitle/FinancesSectionTitle';
import ForumOverview from './ForumOverview/ForumOverview';
import Proposals from './Proposals/Proposals';

interface GovernanceSectionProps {
  governanceProposals: ExtendedExecutiveProposal[];
  hatAddress: string;
}

const GovernanceSection: React.FC<GovernanceSectionProps> = ({ governanceProposals, hatAddress }) => (
  <SectionContainer>
    <SectionTitle>{sectionsData.titles[1]}</SectionTitle>

    <Proposals governanceProposals={governanceProposals} hatAddress={hatAddress} />
    <ForumOverview />
  </SectionContainer>
);

export default GovernanceSection;

const SectionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));
