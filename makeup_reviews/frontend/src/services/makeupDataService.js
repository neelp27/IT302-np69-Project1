import axios from "axios";

class MakeupDataService {
  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/makeup?page=${page}`
    );
  }

  get(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/makeup/id/${id}`
    );
  }

  find(query, by = "title", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/makeup?${by}=${query}&page=${page}`
    )
  }

  getRatings() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/makeup/ratings`)
  }
}

export default new MakeupDataService();
