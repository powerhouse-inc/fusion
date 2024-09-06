import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import { DateTime } from 'luxon';
import type { SnapshotLimitPeriods } from '@ses/core/hooks/useBudgetStatementPager';
import type { ResourceType } from '@ses/core/models/interfaces/types';

export const CORE_UNIT_REQUEST = (shortCode: string) => ({
  query: gql`
    query CoreUnits($filter: CoreUnitFilter) {
      coreUnits(filter: $filter) {
        id
        code
        shortCode
        status
        sentenceDescription
        name
        image
        legacyBudgetStatementUrl
        category
        type
        socialMediaChannels {
          discord
          forumTag
          linkedIn
          twitter
          website
          youtube
          github
        }
        cuMip {
          mipTitle
          mipStatus
          mipCode
          accepted
          obsolete
          rejected
          rfc
          formalSubmission
          mipUrl
        }
        auditors {
          id
          username
        }
        budgetStatements {
          id
          month
          status
          publicationUrl
          activityFeed {
            id
            created_at
            event
            params
            description
          }
          comments {
            id
            budgetStatementId
            timestamp
            comment
            status
            author {
              id
              username
            }
          }
          budgetStatementFTEs {
            month
            ftes
          }
          auditReport {
            reportUrl
            timestamp
            auditStatus
          }
          budgetStatementWallet {
            name
            address
            currentBalance
            id
            budgetStatementLineItem {
              group
              actual
              forecast
              budgetCategory
              headcountExpense
              comments
              month
              budgetCap
              payment
            }
            budgetStatementTransferRequest {
              target {
                amount
                calculation
                description
                source {
                  code
                  url
                  title
                }
              }
              requestAmount
              walletBalance
              walletBalanceTimeStamp
            }
          }
          budgetStatementMKRVest {
            id
            mkrAmount
            mkrAmountOld
            vestingDate
            comments
          }
        }
        lastActivity {
          id
          created_at
          event
          params
          description
        }
        activityFeed {
          id
          created_at
          event
          params
          description
        }
      }
    }
  `,
  filter: {
    filter: {
      shortCode,
    },
  },
});

export const snapshotPeriodQuery = (ownerId: string | null, resourceType: ResourceType) => ({
  query: gql`
    query Snapshots($filter: SnapshotFilter) {
      snapshots(filter: $filter) {
        period
      }
    }
  `,
  filter: {
    filter: {
      ownerType: resourceType,
      ownerId,
    },
  },
});

export const getLastSnapshotPeriod = async (
  ownerId: string | null,
  resourceType: ResourceType
): Promise<SnapshotLimitPeriods | undefined> => {
  const { query, filter } = snapshotPeriodQuery(ownerId, resourceType);
  const data = await request<{ snapshots: [{ period: string }] }>(GRAPHQL_ENDPOINT, query, filter);

  if (!data?.snapshots?.length) {
    return undefined;
  }

  const periods = data.snapshots.map((snapshot) =>
    DateTime.fromFormat(snapshot.period, 'yyyy/MM', {
      zone: 'UTC',
    })
  );
  return {
    earliest: DateTime.min(...periods),
    latest: DateTime.max(...periods),
  };
};
