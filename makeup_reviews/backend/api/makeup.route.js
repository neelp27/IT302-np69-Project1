import express from 'express';
import MakeupController from './makeup.controller.js';
import CommentsController from './comments.controller.js'; // New controller for comments

const router = express.Router();

router.route('/').get(MakeupController.apiGetMakeup);

router
  .route('/comments')
  .post(CommentsController.apiPostComment) // New route for POST
  .put(CommentsController.apiUpdateComment) // New route for PUT
  .delete(CommentsController.apiDeleteComment); // New route for DELETE

export default router;