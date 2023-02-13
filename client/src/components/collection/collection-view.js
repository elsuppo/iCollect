import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCollectionItems } from '../../utils/requests/requests';
import CollectionInfo from './view-blocks/collection-info';
import CollectionTools from './view-blocks/collection-tools';
import CreateItem from './view-blocks/create-item';
import TableItems from './view-blocks/collection-table-items';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

const CollectionView = ({ collectionData }) => {
  const collectionId = useParams().id;
  const [items, setItems] = useState([]);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    onItemsRequest(collectionId);
  }, [collectionId])

  const onItemsRequest = (id) => {
    setError(null);
    setLoading(true);
    getAllCollectionItems(id)
      .then(res => {
        setItems(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }

  const onCreateItem = () => {
    setOpenModalForm(true);
  }

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
  };

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      <TableItems
        items={items}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </>
  ) : null;

  return (
    <>
      <CollectionInfo data={collectionData} />
      <CollectionTools
        onCreateItem={onCreateItem}
      />
      <CreateItem
        collectionId={collectionId}
        openModalForm={openModalForm}
        handleCloseModalForm={handleCloseModalForm}
        onItemsRequest={onItemsRequest}
      />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default CollectionView;