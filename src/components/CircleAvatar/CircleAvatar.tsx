import { styled } from '@mui/material';
import Identicon from 'identicon.js';
import padEnd from 'lodash/padEnd';
import Image from 'next/image';
import React from 'react';
import { getColorForString } from '@/core/utils/colors';
import { getTwoInitials } from '@/core/utils/string';

export interface CircleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  image?: string;
  identIcon?: boolean;
  className?: string;
}

export const CircleAvatar: React.FC<CircleAvatarProps> = ({
  identIcon = false,
  name,
  className,
  image,
  ...htmlAttributes
}) => {
  const identIconImage =
    identIcon &&
    new Identicon(padEnd(name, 43, 'a'), {
      format: 'svg',
      margin: 0,
    }).toString();

  const imageSource = identIcon ? `data:image/svg+xml;base64,${identIconImage}` : image;

  return (
    <Container className={className} name={name} {...htmlAttributes}>
      {imageSource ? (
        <ImageWrapper>
          <Image src={imageSource} alt={name} fill quality={50} />
        </ImageWrapper>
      ) : (
        getTwoInitials(name)
      )}
    </Container>
  );
};

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'name',
})<{
  name: string;
}>(({ theme, name }) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 900,
  borderRadius: '50%',
  color: 'white',
  backgroundColor: getColorForString(name),
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.reskinShortShadow,
  overflow: 'hidden',
}));

const ImageWrapper = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export default CircleAvatar;
