// import express from 'express';
// const router = express.Router();
// import {
//   createUser,
//   getSingleUser,
//   saveBook,
//   deleteBook,
//   login,
// } from '../../controllers/user-controller.js';

// // import middleware
// import { authenticateToken } from '../../services/auth.js';

// // put authMiddleware anywhere we need to send a token for verification of user
// router.route('/').post(createUser).put(authenticateToken, saveBook);

// router.route('/login').post(login);

// router.route('/me').get(authenticateToken, getSingleUser);

// router.route('/books/:bookId').delete(authenticateToken, deleteBook);

// export default router;

import express from 'express';
const router = express.Router();
import (
  login,
  addUser
  saveNextUpMovie,
  saveSeenItMovie,
  removeMovie,
  rateMovie,
) from '../../controllers/user-controller.js';

import { authenticateToken } from '../../services/auth.js';

router.route('/').post(addUser);
router.route('/login').post(login);
router.route('/me').get(authenticateToken, getSingleUser);    // `getSingleUser` is not defined, so ????
router.route('/movies/nextUp').put(authenticateToken, saveNextUpMovie);
router.route('/movies/seenIt').put(authenticateToken, saveSeenItMovie);
router.route('/movies/:movieId').delete(authenticateToken, removeMovie);
router.route('/movies/:movieId').put(authenticateToken, rateMovie);

export default router; 


