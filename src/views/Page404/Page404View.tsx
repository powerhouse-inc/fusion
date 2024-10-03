import { useRouter } from 'next/router';
import CustomError from '@/components/Error/CustomError';
import type { FC } from 'react';

const Page404View: FC = () => {
  const router = useRouter();

  return (
    <CustomError
      description="The page couldn't be found"
      skyButtonTitle="Go Back to Homepage"
      callback={() => {
        router.push('/');
      }}
    />
  );
};

export default Page404View;
