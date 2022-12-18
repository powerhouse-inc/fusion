import { gql } from 'graphql-request';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';

export const CREATE_BUDGET_STATEMENT_COMMENT = (
  budgetStatementId: string,
  commentAuthorId: string,
  status?: BudgetStatus,
  comment?: string
) => ({
  query: gql`
    mutation BudgetStatementCommentCreate($input: BudgetStatementCommentInput) {
      budgetStatementCommentCreate(input: $input) {
        id
        comment
        budgetStatementId
        author {
          id
          username
        }
        status
        timestamp
      }
    }
  `,
  input: {
    input: {
      budgetStatementId,
      commentAuthorId,
      status,
      comment,
    },
  },
});
