import CustomError from '@/components/Error/CustomError';
import type { FC } from 'react';

const Page500View: FC = () => (
  <CustomError
    description="Something went wrong. We'll be right back."
    skyButtonTitle="Try again"
    callback={() => {
      window.location.reload();
    }}
  />
);

export default Page500View;
