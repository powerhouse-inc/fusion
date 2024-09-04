import { Avatar, styled } from '@mui/material';
import Link from 'next/link';
import { siteRoutes } from '@/config/routes';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';

interface OwnerTooltipContentProps {
  title: string;
  items: OwnerRef[];
}
const OwnerTooltipContent: React.FC<OwnerTooltipContentProps> = ({ title, items }) => (
  <TooltipContainer>
    <TooltipTitle>{title}</TooltipTitle>
    {items.map((item) => (
      <Item key={item.id} href={siteRoutes.ecosystemActorAbout(item.code)}>
        <ItemAvatar src={item.imageUrl} />
        <ItemName>{item.name}</ItemName>
      </Item>
    ))}
  </TooltipContainer>
);

export default OwnerTooltipContent;

const TooltipContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const TooltipTitle = styled('div')({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.3,
});

const Item = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const ItemAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  border: `2px solid ${'#fff'}`,
  boxShadow: '2px 4px 7px 0px rgba(26, 171, 155, 0.25)',
});

const ItemName = styled('div')({
  fontSize: 16,
  lineHeight: '22px',
  letterSpacing: 0.3,
});
