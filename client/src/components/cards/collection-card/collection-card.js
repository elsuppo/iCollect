import React, { useContext } from 'react';
import { Stack, Typography, Card, CardContent, CardMedia, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';

import GlobalContext from '../../../utils/context/GlobalContext';
import imageNotFound from '../../../utils/constants/image-not-found';

import CollectionCardTools from './collection-card-tools';
import { CardStyles } from '../../../styles/card-styles';

const CollectionCard = ({
  _id,
  subject,
  title,
  description,
  coverUrl,
  authorId,
  items,
  onEditCollection,
  onDeleteCollection,
  inAccount
}) => {
  const { status, userInfo } = useContext(GlobalContext);
  let navigate = useNavigate();
  const { messages } = useIntl();

  return (
    <Card sx={CardStyles}>
      <CardActionArea onClick={() => navigate(`/collections/${_id}`)}>
        <CardMedia
          sx={{ height: 160 }}
          image={coverUrl || imageNotFound}
          title={title}
        />
        <CardContent sx={{ padding: "16px 16px 0", height: 100 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="overline" lineHeight="18px" color="text.secondary">
              {subject}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {messages["app.collection.amount-items"]} {items}
            </Typography>
          </Stack>
          <Grid container wrap="nowrap" direction="column">
            <Typography gutterBottom variant="h6" noWrap>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {description}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
      {
        inAccount ? (
          (status.isAuth && authorId === userInfo.userId) || status.isAdmin ? (
            <CollectionCardTools
              onEditCollection={onEditCollection}
              onDeleteCollection={onDeleteCollection}
              collectionId={_id}
            />
          ) : null
        ) : (
          <Grid container wrap="nowrap" p={2} gap={1}>
            <Typography variant="overline" color="text.secondary">
              <FormattedMessage id="app.collection.by" />
            </Typography>
            <Typography variant="overline" color="text.secondary" noWrap>
              <Link to={`/users/${authorId._id}`}>
                {authorId.firstName} {authorId.lastName}
              </Link>
            </Typography>
          </Grid>
        )
      }
    </Card>
  );
}

export default CollectionCard;