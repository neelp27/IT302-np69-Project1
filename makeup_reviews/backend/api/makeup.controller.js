import MakeupDAO from '../dao/MakeupDAO.js';

export default class MakeupController {
  static async apiGetMakeup(req, res, next) {
    const makeupPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : 20;
    const page = req.query.pageNumber ? parseInt(req.query.pageNumber) : 0;
    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.title) {
      filters.title = req.query.title; //type -> title changed
    }
    const { makeupList, totalNumMakeup } = await MakeupDAO.getMakeup({
      filters,
      page,
      makeupPerPage
    });

    let response = {
      makeup: makeupList,
      page: page,
      filters: filters,
      entries_per_page: makeupPerPage,
      total_results: totalNumMakeup
    };
    res.json(response);
  }
}
