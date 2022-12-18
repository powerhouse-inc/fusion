import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import ExpenseReportStatus from '../common/expense-report-status/expense-report-status';
import Markdown from 'marked-react';
import { customRenderer, customRendererDark } from '../../../components/markdown/renderUtils';
import lightTheme from '../../../../../styles/theme/light';
import GenericCommentCard from './generic-comment-card';
import { useMediaQuery } from '@mui/material';
import { CommentsBudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';
import { useCoreUnitContext } from '../../../../core/context/CoreUnitContext';

export type AuditorCommentCardProps = {
  comment: CommentsBudgetStatementDto;
  hasStatusChange: boolean;
};

const AuditorCommentCard: React.FC<AuditorCommentCardProps> = ({ comment, hasStatusChange }) => {
  const { isLight } = useThemeContext();
  const { currentCoreUnit } = useCoreUnitContext();
  const isTablet = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  const formattedTimestamp = useMemo(() => {
    return DateTime.fromISO(comment.timestamp).toUTC().toFormat('dd-LLL-yyyy HH:mm ZZZZ');
  }, [comment.timestamp]);

  const action = hasStatusChange ? 'Submitted' : 'wrote';
  const roleString = useMemo(() => {
    if (currentCoreUnit?.auditors?.some((auditor) => auditor.id === comment.author.id)) {
      return 'Auditor';
    }
    return `${currentCoreUnit?.shortCode} Core Unit`;
  }, [comment, currentCoreUnit]);

  return (
    <GenericCommentCard variant={comment.status}>
      <CommentHeader hasComment={!!comment.comment}>
        <CommentInfo isLight={isLight}>
          {hasStatusChange && (
            <StatusLabelWrapper>
              <ExpenseReportStatus status={comment.status} />
            </StatusLabelWrapper>
          )}
          {isTablet && hasStatusChange ? (
            <>
              <MobileColumn>
                <Username>{comment.author.username}</Username>
                <UserRole isLight={isLight}>{roleString}</UserRole>
              </MobileColumn>
              <ActionAndDate>
                {action} on {formattedTimestamp}
              </ActionAndDate>
            </>
          ) : (
            <Text isLight={isLight}>
              {comment.author.username} <span>{roleString}</span> {action} on {formattedTimestamp}
            </Text>
          )}
        </CommentInfo>
      </CommentHeader>
      {comment.comment && (
        <CommentMessage isLight={isLight}>
          <Markdown value={comment.comment} renderer={isLight ? customRenderer : customRendererDark} />
        </CommentMessage>
      )}
    </GenericCommentCard>
  );
};

export default AuditorCommentCard;

const CommentHeader = styled.div<{ hasComment: boolean }>(({ hasComment = false }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: `16px 16px ${hasComment ? '0' : '16px'} 16px`,
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: `24px 16px ${hasComment ? '0' : '24px'} 16px`,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: `24px 32px ${hasComment ? '0' : '24px'} 32px`,
  },
}));

const StatusLabelWrapper = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 40,
  },
});

const Text = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#708390' : '#546978',

  '& span': {
    color: isLight ? '#231536' : '#D2D4EF',
  },
}));

const MobileColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const CommentInfo = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '15px',
  color: isLight ? '#708390' : '#546978',
  textTransform: 'uppercase',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'auto',
  },

  [lightTheme.breakpoints.down('table_834')]: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));

const Username = styled.div({
  // this is being used just for readability purposes
});

const UserRole = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '0 3px',
  },
}));

const ActionAndDate = styled.div({
  marginTop: 16,
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
  },
});

const CommentMessage = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  width: '100%',
  marginTop: 16,
  borderTop: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  padding: '16px 16px 24px',

  '& > *:first-of-type': {
    marginTop: '0',
  },

  '& ul': {
    paddingLeft: 14,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 24,
    padding: '16px 32px 24px',
  },
}));
