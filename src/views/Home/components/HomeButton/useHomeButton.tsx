import useScrollPosition from '@react-hook/window-scroll';
import { useEffect } from 'react';

const useHomeButton = () => {
  const scrollY = useScrollPosition();

  useEffect(() => {
    const homeButton = document.querySelector('.home-button') as HTMLDivElement;
    const header = document.querySelector('#home') as HTMLElement;
    if (scrollY > header.getBoundingClientRect().height + 100) {
      homeButton.style.display = 'flex';
    } else {
      homeButton.style.display = 'none';
    }
  });
};

export default useHomeButton;
