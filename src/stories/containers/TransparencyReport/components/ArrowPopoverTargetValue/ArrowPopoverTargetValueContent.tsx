import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import React from 'react';

interface Props {
  description?: string;
  mipNumber?: string;
  link?: string;
  name: string;
  longCode: string;
}

const ArrowPopoverTargetValueContent: React.FC<Props> = ({ description, link, name, mipNumber, longCode }) => (
  <Container>
    <Description>{description}</Description>
    <Source>Source</Source>
    <ContainerLinkWithMip>
      <MipNumber>{mipNumber}</MipNumber>
      <ContainerLink>
        <CustomLink
          children={`Modify Core Unit Budget - ${name} (${longCode})`}
          withArrow
          marginLeft="4px"
          href={link}
          iconWidth={10}
          fontWeight={400}
          iconHeight={10}
          style={{
            whiteSpace: 'normal',
            lineHeight: '15px',
            fontSize: '12px',
            letterSpacing: '1px',
            marginLeft: 0,
            paddingRight: 0,
          }}
        />
      </ContainerLink>
    </ContainerLinkWithMip>
  </Container>
);

export default ArrowPopoverTargetValueContent;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  // border: '2px solid red',
});
const Description = styled.div({
  marginBottom: 16,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: '#231536',
});
const Source = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 11,
  lineHeight: '13px',
  color: '#231536',
  marginBottom: 4,
});

const ContainerLinkWithMip = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: '#EDEFFF',
  borderRadius: 6,
  padding: 6,
});

const ContainerLink = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MipNumber = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: '#708390',
  marginBottom: 2,
  marginTop: 2,
  marginLeft: 1,
});
