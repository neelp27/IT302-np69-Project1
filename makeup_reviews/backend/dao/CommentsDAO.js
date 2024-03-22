import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;
let comments;

export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) {
      return;
    }
    try {
      comments = await conn.db(process.env.DB_NAME).collection('comments');
    } catch (e) {
      console.error(`Unable to connect in CommentsDAO: ${e}`);
    }
  }

  static async addComment(commentData) {
    try {
      const result = await comments.insertOne(commentData);
      return result;
    } catch (e) {
      console.error(`Error occurred while adding comment: ${e}`);
      return { error: e };
    }
  }

  static async updateComment(commentData) {
    try {
      const filter = { _id: new ObjectId(commentData.comment_id) };
      const updateDoc = {
        $set: {
          text: commentData.text,
          user_id: commentData.user_id,
          lastModified: commentData.lastModified,
         
        },
      };
      const result = await comments.updateOne(filter, updateDoc);
      return result;
    } catch (e) {
      console.error(`Error occurred while updating comment: ${e}`);
      return { error: e };
    }
  }

  static async deleteComment(commentData) {
    try {
      const filter = {
        _id: new ObjectId(commentData.comment_id),
        user_id: commentData.user_id,
      };
      const result = await comments.deleteOne(filter);
      return result;
    } catch (e) {
      console.error(`Error occurred while deleting comment: ${e}`);
      return { error: e };
    }
  }
}