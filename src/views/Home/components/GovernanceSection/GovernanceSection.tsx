import { styled } from '@mui/material';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import { headerCardData, sectionsData } from '../../staticData';
import HomeSectionTitle from '../HomeSectionTitle/HomeSectionTitle';
import ForumOverview from './ForumOverview/ForumOverview';
import Proposals from './Proposals/Proposals';

interface GovernanceSectionProps {
  governanceProposals: ExtendedExecutiveProposal[];
  hatAddress: string;
}

const GovernanceSection: React.FC<GovernanceSectionProps> = ({ governanceProposals, hatAddress }) => (
  <SectionContainer>
    <HomeSectionTitle hash={headerCardData.buttonTexts[1].toLowerCase()}>{sectionsData.titles[1]}</HomeSectionTitle>

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
