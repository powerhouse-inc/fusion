import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useUrlAnchor = () => {
  const pathname = usePathname();
  const [anchor, setAnchor] = useState<string | undefined>();

  useEffect(() => {
    if (pathname && pathname.lastIndexOf('#') !== -1) {
      const _anchor = pathname.substring(pathname.lastIndexOf('#') + 1);
      setAnchor(_anchor);
    } else {
      setAnchor('');
    }
  }, [pathname]);

  return anchor;
};
