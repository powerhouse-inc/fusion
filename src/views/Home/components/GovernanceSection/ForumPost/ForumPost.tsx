import { styled } from '@mui/material';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import BulletIcon from '@/components/FancyTabs/BulletIcon';
import ForumInfoChip from '../ForumInfoChip/ForumInfoChip';

const ForumPost: React.FC = () => (
  <PostCard>
    <DescriptionContainer>
      <Title>Spell Crafting Q&A | Tuesday, January 30 at 4:30pm UTC</Title>
      <Tags>
        <Tag>
          <BulletIcon color="purple" /> Governance
        </Tag>
        <Tag>
          <BulletIcon color="gray" /> atlas-workshops
        </Tag>
        <Tag>
          <BulletIcon color="gray" /> gait
        </Tag>
      </Tags>
    </DescriptionContainer>
    <Stats>
      <ForumInfoChip type="likes" value="3" popular />
      <ForumInfoChip type="replies" value="15" />
      <ForumInfoChip type="date" value="15" />

      <ExternalLinkButton href="https://forum.makerdao.com/" />
    </Stats>
  </PostCard>
);

export default ForumPost;

const PostCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    boxShadow: 'unset',
    flexDirection: 'row',
    borderRadius: 12,
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  },
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  padding: 7,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 8,
    border: 'unset',
    minWidth: 340,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '15px 7px',
    minWidth: 510,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: 15,
    minWidth: 702,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 806,
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const Tags = styled('div')(() => ({
  display: 'flex',
  gap: 8,
}));

const Tag = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.colors.gray[600],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const Stats = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  width: '100%',

  '& > div:first-of-type': {
    minWidth: 94,
  },
  '& > div': {
    flex: '1 0 0',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
    padding: 15,
  },
}));
