import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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

  const state: DecodedUrlState = {};

  availableKeys.forEach((sectionKey) => {
    state[sectionKey] = {};

    Object.keys(query).forEach((queryKey) => {
      // all the params of each section have the "section key" appended to end of its name to prevent collisions
      if (queryKey.endsWith(sectionKey)) {
        const paramKey = queryKey.replace(sectionKey, '');
        state[sectionKey][paramKey] =
          typeof query[queryKey] === 'string' ? query[queryKey].split(',') : query[queryKey];
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

      const queries: ParsedUrlQuery = {};

      availableKeys.forEach((sectionKey) => {
        Object.keys(state[sectionKey]).forEach((paramKey) => {
          queries[`${paramKey}${sectionKey}`] = state[sectionKey][paramKey];
        });
      });

      router
        .replace(
          {
            query: {
              ...router.query,
              [ENABLED_SECTIONS_KEY]: availableKeys,
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
          newState[sectionKey][paramKey] = typeof data[paramKey] === 'string' ? [data[paramKey]] : data[paramKey];
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
