import useScrollPosition from '@react-hook/window-scroll';
import { useEffect } from 'react';

const useHomeButton = () => {
  const scrollY = useScrollPosition();

  useEffect(() => {
    const homeButton = document.querySelector('.home-button');
    const header = document.querySelector('#home');
    if (homeButton !== null && header !== null) {
      if (scrollY > header.getBoundingClientRect().height + 100) {
        (homeButton as HTMLDivElement).style.display = 'flex';
      } else {
        (homeButton as HTMLDivElement).style.display = 'none';
      }
    }
  }, [scrollY]);
};

export default useHomeButton;
