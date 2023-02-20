import React, { useState, useEffect, useContext } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { getAllCollectionsUser, deleteCollection } from '../../utils/requests/requests';
import CreateCollection from './account-collections/create-collection';
import CollectionCard from './account-collections/collection-card';
import { ToastContainer, toast } from 'react-toastify';
import GlobalContext from '../../utils/context/GlobalContext';

const AccountCollections = ({ userId }) => {
  const { status, userInfo } = useContext(GlobalContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [currentCollectionId, setCurrentCollectionId] = useState('');

  useEffect(() => {
    onRequestGetCollections(userId);
  }, [userId]);

  const onRequestGetCollections = (userId) => {
    setError(null);
    setLoading(true);
    getAllCollectionsUser(userId)
      .then(res => {
        setCollections(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setTimeout(() => setCurrentCollectionId(''), 300);
  };

  const onCreateCollection = () => {
    setOpenModalForm(true);
  };

  const onEditCollection = (collectionId) => {
    setCurrentCollectionId(collectionId);
    setTimeout(() => setOpenModalForm(true), 1000);
  };

  const onDeleteCollection = (collectionId) => {
    deleteCollection(collectionId)
      .then(res => {
        toast.info(res.message, { position: 'top-right' });
        onRequestGetCollections(userId);
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const cards = collections.map(collection => {
    return (
      <CollectionCard
        key={collection._id}
        {...collection}
        onEditCollection={onEditCollection}
        onDeleteCollection={onDeleteCollection}
      />
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ flexWrap: "wrap", rowGap: "24px", columnGap: "16px" }}
      mb={6}
    >
      {cards}
    </Stack>
  ) : null;

  return (
    <>
      <ToastContainer />
      <Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h5" fontWeight="500">Collections</Typography>
          {
            (status.isAuth && userId === userInfo.userId) || status.isAdmin ? (
              <>
                <Button variant="contained" onClick={onCreateCollection}>
                  + Add Collection
                </Button>
                <CreateCollection
                  openModalForm={openModalForm}
                  handleCloseModalForm={handleCloseModalForm}
                  userId={userId}
                  onRequestGetCollections={onRequestGetCollections}
                  collectionId={currentCollectionId}
                  toast={toast}
                />
              </>
            ) : null
          }
        </Stack>
        {errorMessage}
        {spinner}
        {content}
      </Stack>
    </>
  );
}

export default AccountCollections;