import React from 'react';
import { Stack, Avatar, Typography, Grid } from '@mui/material';

import CustomizeMui from '../../../utils/theme/customizeMui';

import ErrorMessage from '../../../components/ErrorMessage';

const UserInfo = ({ data }) => {
  if (!Object.keys(data).length) return <ErrorMessage />;
  const { avatarStyles } = CustomizeMui();

  return (
    <Stack direction="row" spacing={2} alignItems="center" mt={4} mb={6}>
      <Avatar
        sx={{ ...avatarStyles, width: 72, height: 72, fontSize: 24 }}>
        {data.firstName[0]}{data.lastName[0]}
      </Avatar>
      <Grid container wrap="nowrap" direction="column" width="calc(100% - 88px)">
        <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
          {data.firstName} {data.lastName}
        </Typography>
        <Typography variant="caption" fontSize="14px" color="text.secondary" sx={{ wordWrap: "break-word" }}>
          {data.email}
        </Typography>
      </Grid>
    </Stack>
  );
}

export default UserInfo;