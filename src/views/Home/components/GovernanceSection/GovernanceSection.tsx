import { styled } from '@mui/material';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import HomeSectionTitle from '../HomeSectionTitle/HomeSectionTitle';
import Section from '../Section/Section';
import ForumOverview from './ForumOverview/ForumOverview';
import Proposals from './Proposals/Proposals';

interface GovernanceSectionProps {
  governanceProposals: ExtendedExecutiveProposal[];
  hatAddress: string;
}

const GovernanceSection: React.FC<GovernanceSectionProps> = ({ governanceProposals, hatAddress }) => (
  <Section id="governance">
    <SectionContainer>
      <HomeSectionTitle hash="governance">Governance</HomeSectionTitle>

      <Proposals governanceProposals={governanceProposals} hatAddress={hatAddress} />
      <ForumOverview />
    </SectionContainer>
  </Section>
);

export default GovernanceSection;

const SectionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));
