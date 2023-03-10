import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from './reducers/userReducer';
import { collectionReducer } from './reducers/collectionReducer';
import { collectionsReducer } from './reducers/collectionsReducer';
import { itemsReducer } from './reducers/itemsReducer';
import { adminReducer } from './reducers/adminReducer';
import { tagsReducer } from './reducers/tagsReducer';
import { authReducer } from './reducers/authReducer';
import { commentsReducer } from './reducers/commentsReducer';
import { likesReducer } from './reducers/likesReducer';
import { optionsReducer } from './reducers/optionsReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    collection: collectionReducer,
    collections: collectionsReducer,
    items: itemsReducer,
    admin: adminReducer,
    tags: tagsReducer,
    auth: authReducer,
    comments: commentsReducer,
    likes: likesReducer,
    options: optionsReducer
  }
});