import { SWRConfig, unstable_serialize as unstableSerialize } from 'swr';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import BreakdownTable from './BreakdownTable';
import { quarterlyResponseMocked, semiAnnualResponseMocked } from './storiesDataMock';
import { useBreakdownTable } from './useBreakdownTable';
import type { Meta } from '@storybook/react';

export default {
  title: 'Fusion/Views/Finances/Section/Main/BreakdownTable',
  component: BreakdownTable,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
    },
  },
} as Meta<typeof BreakdownTable>;

const loadingArgs = [
  {
    year: '2024',
    filters: [
      {
        id: '1',
        type: 'select',
        options: ['Budget', 'Forecast', 'Net Protocol Outflow', 'Net Expenses On-Chain', 'Actuals'].map((filter) => ({
          label: filter,
          value: filter,
        })),
        label: 'Metrics',
        selected: ['Budget'],
        multiple: true,
        onChange: () => null,
        widthStyles: {
          width: 140,
          menuWidth: 220,
        },
      },
      {
        id: '2',
        type: 'select',
        options: ['Annually', 'Quarterly'].map((filter) => ({
          label: filter,
          value: filter,
        })),
        label: 'Period',
        selected: 'Quarterly',
        onChange: () => null,
        widthStyles: {
          width: 140,
          menuWidth: 220,
        },
      },
    ],
    resetFilters: {
      canReset: false,
      onReset: () => null,
    },
    isLoading: true,
  },
];

const [[LoadingLightMode, LoadingDarkMode]] = createThemeModeVariants(BreakdownTable, loadingArgs, false);

// This component is needed to fetch and manage the state of the breakdown table data
// Additionally, it ensures that the SWR data is cached so the story has predictable results
// and don't need to query directly the API
const WrapperComponent = () => {
  const { periodFilter, activeMetrics, tableHeader, tableBody, isLoading, filters, resetFilters } = useBreakdownTable(
    '2024',
    [],
    []
  );

  return (
    <BreakdownTable
      activeItems={activeMetrics}
      selectedValue={periodFilter}
      year="2024"
      breakdownTable={tableBody ?? []}
      isLoading={isLoading}
      headerTable={tableHeader ?? []}
      title="MakerDAO Budget"
      filters={filters}
      resetFilters={resetFilters}
    />
  );
};

const [[DefaultLightMode, DefaultDarkMode]] = createThemeModeVariants(
  () => (
    <SWRConfig
      value={{
        fallback: {
          [unstableSerialize(['semiAnnual', '2024', 'atlas', 3])]: semiAnnualResponseMocked,
          [unstableSerialize(['quarterly', '2024', 'atlas', 3])]: quarterlyResponseMocked,
        },
      }}
    >
      <WrapperComponent />
    </SWRConfig>
  ),
  1,
  false
);

export { DefaultLightMode, DefaultDarkMode, LoadingLightMode, LoadingDarkMode };
