import { useEffect, useRef } from 'react';

import type { EChartsOption } from 'echarts-for-react';

const useFinancesBarChart = () => {
  const financesBarChartRef = useRef<EChartsOption>(null);

  useEffect(() => {
    const paths = (financesBarChartRef.current.ele as HTMLDivElement).getElementsByTagName('path');
    paths[paths.length - 1].style.transform = 'translateX(14.5%)';
    paths[paths.length - 2].style.transform = 'translateX(-8%)';
    paths[paths.length - 3].style.transform = 'translateX(-8%)';
    paths[paths.length - 4].style.transform = 'translateX(-5%)';
  }, []);

  return {
    financesBarChartRef,
  };
};

export default useFinancesBarChart;
