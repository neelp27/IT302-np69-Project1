import axios from "axios";

class MyDataService {
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
    );
  }

  getRatings() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/np69_makeup/ratings`);
  }
  
  login(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/np69_login`, data);
  }

  addcomments(id, data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/np69_makeup/${id}/comments`, data);
  }

  updateReview(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/np69_makeup/review`, data)
  }
  
  deleteReview(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/np69_makeup/review`,
      { data: { review_id: id, user_id: userId } }
    )
  }
  
  
  addcomments(id, data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/np69_makeup/${id}/addcomments`, data);
  }
}

export default new MyDataService();
