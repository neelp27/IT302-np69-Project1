import express from 'express';
import MakeupController from './makeup.controller.js';
//import ReviewsController from "./reviews.controller.js";

const router = express.Router();

router.route('/').get(MakeupController.apiGetMakeup);

// router
//   .route('/review')
//     .post(ReviewsController.apiPostReview)
//     .put(ReviewsController.apiUpdateReview)
//     .delete(ReviewsController.apiDeleteReview);

export default router;
