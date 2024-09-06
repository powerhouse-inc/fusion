import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '@/config/endpoints';
import type { Snapshots } from '@/core/models/dto/snapshotAccountDTO';
import { ResourceType } from '@/core/models/interfaces/types';

export const getDelegatesSnapshots = async () => {
  const query = gql`
    query Snapshots($filter: SnapshotFilter) {
      snapshots(filter: $filter) {
        period
      }
    }
  `;
  const filter = {
    filter: {
      ownerType: ResourceType.Delegates,
    },
  };

  const response = await request<{ snapshots: Snapshots[] }>(GRAPHQL_ENDPOINT, query, filter);

  return response.snapshots;
};
