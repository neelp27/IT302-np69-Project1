import CommentsDAO from '../dao/CommentsDAO.js';

export default class CommentsController {
  static async apiPostComment(req, res, next) {
    try {
      const commentData = {
        makeup_id: req.body.makeupId, 
        text: req.body.text, 
        user_name: req.body.userName,
        user_id: req.body.userId, 
        lastModified: new Date(), 
      };

      const result = await CommentsDAO.addComment(commentData);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateComment(req, res, next) {
    try {
      const commentData = {
        comment_id: req.body.commentId, 
        text: req.body.text, 
        user_id: req.body.userId, 
        lastModified: new Date(), 
      };

      const result = await CommentsDAO.updateComment(commentData);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteComment(req, res, next) {
    try {
      const commentData = {
        comment_id: req.body.commentId, 
        user_id: req.body.userId,
      };

      const result = await CommentsDAO.deleteComment(commentData);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}