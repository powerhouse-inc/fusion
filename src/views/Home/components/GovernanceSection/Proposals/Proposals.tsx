import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import Proposal from '../Proposal/Proposal';

interface ProposalsProps {
  governanceProposals: ExtendedExecutiveProposal[];
  hatAddress: string;
}

const Proposals: React.FC<ProposalsProps> = ({ governanceProposals, hatAddress }) => {
  const openProposals = governanceProposals.filter((proposal) => proposal.active && hatAddress !== proposal.address);
  const activeProposals = governanceProposals.filter((proposal) => hatAddress === proposal.address);
  const passedProposals = governanceProposals.filter((proposal) => !proposal.active && hatAddress !== proposal.address);
  const slicedPassedProposals = passedProposals.slice(0, Math.min(3, passedProposals.length));

  return (
    <ProposalsContainer>
      {openProposals.length > 0 && (
        <SectionContainer>
          <SectionHeader isMain>
            <span>Open Executive Proposals</span>
            <ExternalLinkButton href="https://vote.makerdao.com/">Go to Sky vote</ExternalLinkButton>
          </SectionHeader>

          <ProposalList>
            {openProposals.map((proposal, index) => (
              <Proposal key={index} proposal={proposal} isHat={hatAddress === proposal.address} />
            ))}
          </ProposalList>
        </SectionContainer>
      )}

      {activeProposals.length > 0 && (
        <SectionContainer>
          <SectionHeader isMain={openProposals.length === 0}>
            <span>Active Executive Proposals</span>
            {openProposals.length === 0 && (
              <ExternalLinkButton href="https://vote.makerdao.com/">Go to Sky vote</ExternalLinkButton>
            )}
          </SectionHeader>

          <ProposalList>
            {activeProposals.map((proposal, index) => (
              <Proposal key={index} proposal={proposal} isHat={hatAddress === proposal.address} />
            ))}
          </ProposalList>
        </SectionContainer>
      )}

      {passedProposals.length > 0 && (
        <SectionContainer>
          <SectionHeader>
            <span>Passed Executive Proposals</span>
            {openProposals.length === 0 && activeProposals.length === 0 && (
              <ExternalLinkButton href="https://vote.makerdao.com/">Go to Makervote</ExternalLinkButton>
            )}
          </SectionHeader>

          <ProposalList>
            {slicedPassedProposals.map((proposal, index) => (
              <Proposal key={index} proposal={proposal} isHat={hatAddress === proposal.address} />
            ))}
          </ProposalList>
        </SectionContainer>
      )}
    </ProposalsContainer>
  );
};

export default Proposals;

const ProposalsContainer = styled(Card)(() => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const SectionContainer = styled('section')(() => ({}));

const SectionHeader = styled('div')<{ isMain?: boolean }>(({ theme, isMain = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '8px 16px',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  fontSize: isMain ? 18 : 16,
  fontWeight: isMain ? 700 : 600,
  lineHeight: isMain ? '120%' : '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '4px 24px',
  },
}));

const ProposalList = styled('div')(() => ({
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '0 8px 8px',
}));
