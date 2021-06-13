import axios from "axios";

const list = () => axios.get("/questions");
const create = payload => axios.post("/questions/", payload);
// const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);
const show = id => axios.get(`/questions/${id}`);
// const destroy = id => axios.delete(`/quizzes/${id}`);

const questionsApi = {
  list,
  create,
  show,
  //   update,
  //   destroy,
};

export default questionsApi;
