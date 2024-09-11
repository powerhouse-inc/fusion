import { styled } from '@mui/material';
import Link from 'next/link';
import FooterIcon from 'public/assets/svg/fusion.svg';
import PowerhouseIcon from 'public/assets/svg/powerhouse.svg';
import { siteRoutes } from '@/config/routes';
import FooterContact from './FooterContact';
import { linkCategory, contactMakerDAO } from './data';

const Footer = () => (
  <FooterWrapper>
    <FooterContainer>
      <FooterColumnLink>
        {linkCategory.map(({ name, links }) => (
          <FooterColumn key={name}>
            <FooterColumnTitle>{name}</FooterColumnTitle>
            <FooterLinkWrapper>
              {links.map(({ label, link, Icon }) => (
                <FooterLink key={label} href={link} target="_blank">
                  {Icon && <Icon width="16" height="16" />}
                  {label}
                </FooterLink>
              ))}
            </FooterLinkWrapper>
          </FooterColumn>
        ))}
      </FooterColumnLink>
      <ContactSection>
        <FooterContactSky {...contactMakerDAO} />
      </ContactSection>
    </FooterContainer>
    <FooterBottom>
      <FooterIcon width="104" height="36" />
      <FooterBottomRight>
        <StyledLink href={siteRoutes.cookiesPolicy}>Cookie Policy</StyledLink>
        <StyledLink href={siteRoutes.disclaimer}>Disclaimer</StyledLink>
        <StyledLink href={'https://docs.sky.money/legal-terms'} target="_blank">
          Terms of Use
        </StyledLink>
        <BuiltWith>
          <FooterButtonLink>Built with</FooterButtonLink>
          <PowerhouseIcon width={16} height={16} />
          <FooterButtonLink>Powerhouse</FooterButtonLink>
        </BuiltWith>
      </FooterBottomRight>
    </FooterBottom>
  </FooterWrapper>
);

const FooterWrapper = styled('footer')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '18px 16px 16px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.background.dm,
  borderTop: `1px solid ${theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.gray[900]}`,
  [theme.breakpoints.up('tablet_768')]: {
    padding: '26px 32px 16px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '32px 32px 16px',
  },
  [theme.breakpoints.up('desktop_1920')]: {
    maxWidth: 1900,
    margin: '0 auto',
    borderTop: 'none',
  },
}));

const FooterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: 34,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 34,
    flexDirection: 'column',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 0,
    flexDirection: 'row',
  },
}));

const FooterLinkWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const FooterColumnLink = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 'auto',
  rowGap: 28,
  flexWrap: 'wrap',
  [theme.breakpoints.up('tablet_768')]: {
    gap: 64,
  },
}));

const FooterColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 140,
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 'revert',
  },
}));

const FooterLink = styled('a')(({ theme }) => ({
  margin: '5px 0',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.charcoal[300],
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  marginTop: 4,
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    color: theme.palette.colors.charcoal[400],
  },
}));

const FooterColumnTitle = styled('p')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  marginTop: 4,
  marginBottom: 12,
}));

const ContactSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 16,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}));

const FooterBottom = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[300],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'start',
  marginTop: '32px',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '28px',
  },
}));

const FooterBottomRight = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  columnGap: 24,
  rowGap: 8,
  marginTop: 13,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
}));

const BuiltWith = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  '& > p:first-of-type': {
    marginRight: 8,
  },
  '& > p:last-of-type': {
    marginLeft: 4,
  },
}));

const FooterButtonLink = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.colors.charcoal[300],
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '24px',
  textDecoration: 'none',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.colors.charcoal[300],
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '24px',
  textDecoration: 'none',
}));

const FooterContactSky = styled(FooterContact)(({ theme }) => ({
  '& > svg:first-of-type': {
    width: 48,
    height: 48,
  },
  [theme.breakpoints.up('tablet_768')]: {
    width: 'fit-content',
  },
}));

export default Footer;
