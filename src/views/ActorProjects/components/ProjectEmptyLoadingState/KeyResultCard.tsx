import { Box, Skeleton } from '@mui/material';
import React from 'react';

const KeyResultCard = () => (
  <Box mt={3}>
    {[...Array(5)].map((_, index) => (
      <Box key={index} display="flex" alignItems="center" mt={1}>
        <Skeleton variant="rectangular" width={20} height={20} />
        <Skeleton variant="rectangular" width="80%" height={20} style={{ marginLeft: 8 }} />
      </Box>
    ))}
  </Box>
);

export default KeyResultCard;
