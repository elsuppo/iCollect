import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { getUser, getAllUsers, updateSelectUsers } from '../controllers/users.js';
import { createCollection, getAllCollectionsUser, updateCollection, getOneCollection, deleteCollection } from '../controllers/collections.js';
import { createItem, getAllCollectionItems, getItem, updateItem, deleteItem, deleteItems } from '../controllers/items.js';
import { createComment, getAllItemComment } from '../controllers/comments.js';
import { addLike, getAllItemLikes, removeLike } from '../controllers/likes.js';
import { registerValidation, loginValidation, collectionValidation, itemValidation } from '../middlewares/validations.js';
import { handleValidationsErrors } from '../middlewares/handleValidationsErrors.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = new Router();

router.post('/auth/register', registerValidation, handleValidationsErrors, register);
router.post('/auth/login', loginValidation, handleValidationsErrors, login);
router.get('/auth/me', checkAuth, getMe);

router.get('/users/:userId', checkAuth, getUser);
router.get('/users', checkAuth, checkAdmin, getAllUsers);
router.patch('/users', checkAuth, checkAdmin, updateSelectUsers);

router.get('/users/:userId/collections', checkAuth, getAllCollectionsUser);
router.post('/collections', checkAuth, collectionValidation, handleValidationsErrors, createCollection);
router.get('/collections/:collectionId', getOneCollection);
router.patch('/collections/:collectionId', checkAuth, collectionValidation, handleValidationsErrors, updateCollection);
router.delete('/collections/:collectionId', checkAuth, deleteCollection);

router.post('/collections/:collectionId', checkAuth, itemValidation, handleValidationsErrors, createItem);
router.get('/collections/:collectionId/items', getAllCollectionItems);
router.get('/collections/:collectionId/items/:itemId', getItem);
router.patch('/collections/:collectionId/items/:itemId', checkAuth, itemValidation, handleValidationsErrors, updateItem);
router.delete('/collections/:collectionId/items/:itemId', checkAuth, deleteItem);
router.delete('/collections/:collectionId/items/', checkAuth, deleteItems);

router.post('/comments', checkAuth, createComment);
router.get('/comments/:itemId', checkAuth, getAllItemComment);

router.post('/likes', checkAuth, addLike);
router.get('/likes/:itemId', checkAuth, getAllItemLikes);
router.delete('/likes/:itemId', checkAuth, removeLike);

export default router;
