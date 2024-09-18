import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FinancesSectionId } from '@/views/Finances/types';
import type { ParsedUrlQuery } from 'querystring';

export interface DecodedUrlState {
  [key: string]: {
    [paramKey: string]: string[] | undefined;
  };
}

const ENABLED_SECTIONS_KEY = 'availableKeys';

export const buildInMemoryUrlState = (query: ParsedUrlQuery): DecodedUrlState => {
  const availableKeys =
    typeof query[ENABLED_SECTIONS_KEY] === 'string'
      ? query[ENABLED_SECTIONS_KEY].split(',')
      : query[ENABLED_SECTIONS_KEY] ?? [];

  if (
    (query.metric !== undefined || query.granularity !== undefined) &&
    !availableKeys.includes(FinancesSectionId.BREAKDOWN_CHART) // breakdown chart special case
  ) {
    availableKeys.push(FinancesSectionId.BREAKDOWN_CHART);
  }

  const state: DecodedUrlState = {};

  availableKeys.forEach((sectionKey) => {
    state[sectionKey] = {};

    Object.keys(query).forEach((queryKey) => {
      if (queryKey === 'metric' || queryKey === 'granularity') {
        // breakdown chart special case
        queryKey += FinancesSectionId.BREAKDOWN_CHART;
      }
      // all the params of each section have the "section key" appended to end of its name to prevent collisions
      if (queryKey.endsWith(sectionKey)) {
        const paramKey = queryKey.replace(sectionKey, '');
        const value = sectionKey === FinancesSectionId.BREAKDOWN_CHART ? query[paramKey] : query[queryKey];
        state[sectionKey][paramKey] = typeof value === 'string' ? value.split(',') : value;
      }
    });
  });

  return state;
};

const useRestorationFromUrlState = (
  sectionKey: string,
  onInit?: (state: DecodedUrlState[keyof DecodedUrlState]) => void
) => {
  const router = useRouter();
  const [urlState, setUrlState] = useState<DecodedUrlState>({});

  const [initialized, setInitialized] = useState<boolean>(false);

  // initialize state from url state and run onInit event
  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    const decodedUrlState = buildInMemoryUrlState(router.query);
    onInit?.(decodedUrlState[sectionKey]);
  }, [initialized, onInit, router.query, sectionKey]);

  // keep update in sync with url state
  useEffect(() => {
    const decodedUrlState = buildInMemoryUrlState(router.query);
    setUrlState(decodedUrlState);
  }, [router.query]);

  const updateUrlFromState = useCallback(
    (state: DecodedUrlState) => {
      const availableKeys = Object.keys(state);

      const availableKeysFiltered = availableKeys.filter((key) => key !== FinancesSectionId.BREAKDOWN_CHART);

      const queries: ParsedUrlQuery = {};

      availableKeys.forEach((sectionKey) => {
        Object.keys(state[sectionKey]).forEach((paramKey) => {
          if (sectionKey === FinancesSectionId.BREAKDOWN_CHART) {
            queries[paramKey] = state[sectionKey][paramKey];
          } else {
            queries[`${paramKey}${sectionKey}`] = state[sectionKey][paramKey];
          }
        });
      });

      router
        .replace(
          {
            query: {
              ...router.query,
              [ENABLED_SECTIONS_KEY]: availableKeysFiltered,
              ...queries,
            },
          },
          undefined,
          {
            shallow: true,
          }
        )
        .catch((error) => {
          if (!error.cancelled) {
            throw error;
          }
        });
    },
    [router]
  );

  const handleStateUpdate = useCallback(
    (sectionKey: string, data: { [paramKey: string]: string | string[] }) => {
      setUrlState((prevState) => {
        const newState = { ...prevState };
        if (!newState[sectionKey]) {
          newState[sectionKey] = {};
        }
        Object.keys(data).forEach((paramKey) => {
          const value = data[paramKey];
          newState[sectionKey][paramKey] = typeof value === 'string' ? value.split(',') : value;
        });

        updateUrlFromState(newState);
        return newState;
      });
    },
    [updateUrlFromState]
  );

  const handleCurrentSectionStateUpdate = useCallback(
    (data: { [paramKey: string]: string | string[] }) => {
      handleStateUpdate(sectionKey, data);
    },
    [handleStateUpdate, sectionKey]
  );

  return {
    urlState,
    handleStateUpdate,
    handleCurrentSectionStateUpdate,
  };
};

export default useRestorationFromUrlState;
