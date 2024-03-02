import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let makeup;

export default class MakeupDAO {
  static async injectDB(conn) {
    if (makeup) {
      return
    }
    try {
      makeup = await conn.db(process.env.DB_NAME).collection('makeup');
    } catch (e) {
      console.error(`Unable to connect in MakeupDAO: ${e}`);
    }
  }
  
  static async getMakeup({
    filters = null,
    page = 0,
    makeupPerPage = 20,
    } = {}) {
      let query;
      if (filters) {
        if ("name" in filters) {
          query = { $text: { $search: filters['name'] } };
        } else if ("title" in filters) {
          query = { "title": { $eq: filters['title'] } };
        }
      }
      let cursor;
      try {
        cursor = await makeup
          .find(query)
          .limit(makeupPerPage)
          .skip(makeupPerPage * page);
        const makeupList = await cursor.toArray();
        const totalNumMakeup = await makeup.countDocuments(query);
        return { makeupList, totalNumMakeup };
      } catch (e) {
        console.error(`Unable to issue find command: ${e}`);
        console.error(e);
        return { makeupList: [], totalNumMakeup: 0 };
      }
  }
}
