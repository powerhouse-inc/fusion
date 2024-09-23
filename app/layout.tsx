'use client';

import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    const currentPath = window.location.pathname;
    const redirectUrl = `https://fusion.sky.money${currentPath}`;
    window.location.href = redirectUrl;
  }, []);

  return (
    <html lang="en">
      <body>
        <div>Redirecting...</div>
      </body>
    </html>
  );
}
