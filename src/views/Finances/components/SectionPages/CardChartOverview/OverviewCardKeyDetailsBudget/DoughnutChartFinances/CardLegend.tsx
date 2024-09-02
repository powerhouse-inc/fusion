import { styled } from '@mui/material';
import { sortDoughnutSeriesByValue } from '@ses/core/utils/sort';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import ItemLegendDoughnut from './ItemLegendDoughnut';

interface Props {
  isDeepLevel?: boolean;
  changeAlignment: boolean;
  doughnutSeriesData: DoughnutSeries[];
  toggleSeriesVisibility: (seriesName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  onLegendItemHover: (legendName: string) => void;
}

const CardLegend: React.FC<Props> = ({
  changeAlignment,
  isDeepLevel = true,
  doughnutSeriesData,
  onLegendItemHover,
  onLegendItemLeave,
  toggleSeriesVisibility,
}) => {
  const sortedDoughnutSeries = sortDoughnutSeriesByValue(doughnutSeriesData);
  return (
    <ContainerLegend isDeepLevel={isDeepLevel} changeAlignment={changeAlignment}>
      {sortedDoughnutSeries.map((data, index) => (
        <ItemLegendDoughnut
          key={index}
          changeAlignment={changeAlignment}
          doughnutData={data}
          onLegendItemHover={onLegendItemHover}
          onLegendItemLeave={onLegendItemLeave}
          toggleSeriesVisibility={toggleSeriesVisibility}
          isDeepLevel={isDeepLevel}
        />
      ))}
    </ContainerLegend>
  );
};

export default CardLegend;

const ContainerLegend = styled('div')<{ isDeepLevel: boolean; changeAlignment: boolean }>(
  ({ theme, isDeepLevel, changeAlignment }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: isDeepLevel && changeAlignment ? 'flex-start' : changeAlignment ? 'flex-start' : 'center',
    gap: isDeepLevel ? 4 : 8,
    maxWidth: '100%',
    maxHeight: 155,

    [theme.breakpoints.up('desktop_1280')]: {
      columnGap: 24,
      rowGap: isDeepLevel ? 10 : 8,
      marginTop: isDeepLevel ? 6 : 0,
    },
  })
);
