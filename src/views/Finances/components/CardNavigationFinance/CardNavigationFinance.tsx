import { styled, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { truncateDescription } from './utils';
import type { Theme } from '@mui/material';

interface Props {
  image: string;
  title: string;
  description: string;
  href: string;
  code?: string;
  isCompact: boolean;
}

const CardNavigationFinance: React.FC<Props> = ({ image, title, description, href, code, isCompact }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const truncatedDescription = truncateDescription(description);

  return (
    <NavigationCard isCompact={isCompact} className="no-select">
      <HeaderContainer>
        <ImageContainer>
          <ImageWrapper>
            <Image src={image} alt="Budget logo" fill unoptimized />
          </ImageWrapper>

          {isMobile && <InternalLinkButton href={href} />}
        </ImageContainer>

        <Code isCompact={isCompact}>{code}</Code>
      </HeaderContainer>

      <Title isCompact={isCompact}>{title}</Title>
      {!isCompact && <Description>{truncatedDescription}</Description>}

      {!isMobile && (
        <ButtonContainer isCentered={isCompact}>
          <InternalLinkButton href={href} label="Explore" />
        </ButtonContainer>
      )}
    </NavigationCard>
  );
};

export default CardNavigationFinance;

const NavigationCard = styled(Card)<{ isCompact: boolean }>(({ theme, isCompact }) => ({
  flexDirection: 'column',
  width: '100%',
  padding: isCompact ? 8 : '8px 16px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    flex: 1,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '8px 16px 16px',
  },
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const ImageContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& > a': {
    padding: '4px 8px 4px 8px',

    '&:hover': {
      padding: '4px 8px 4px 8px',
    },
  },
}));

const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 42,
  minWidth: 42,
  height: 42,
  borderRadius: '50%',
  overflow: 'hidden',
  boxShadow: `2px 4px 7px ${theme.palette.isLight ? 'rgba(25, 144, 255, 0.20)' : 'rgba(23, 24, 29, 0.30)'}`,

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: 32,
    minWidth: 32,
    height: 32,
  },
}));

const Title = styled('div')<{ isCompact: boolean }>(({ theme, isCompact }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '20px',
  marginTop: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  ...(isCompact
    ? {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',

        [theme.breakpoints.up('tablet_768')]: {
          marginBottom: 16,
        },
      }
    : {
        marginBottom: 4,

        [theme.breakpoints.up('desktop_1024')]: {
          fontSize: 16,
          lineHeight: '24px',
        },
      }),
}));

const Code = styled('div')<{ isCompact: boolean }>(({ theme, isCompact }) => ({
  fontSize: isCompact ? 14 : 16,
  fontWeight: 600,
  lineHeight: isCompact ? '22px' : '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.up('tablet_768')]: {
    alignSelf: 'center',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 'normal',
  color: theme.palette.colors.gray[500],

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 8,
  },
}));

const ButtonContainer = styled('div')<{ isCentered: boolean }>(({ theme, isCentered }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 'auto',

    ...(isCentered && {
      display: 'flex',
      justifyContent: 'center',
    }),
  },
}));
