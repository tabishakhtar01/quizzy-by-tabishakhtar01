import axios from "axios";

const list = () => axios.get("/questions");
const create = payload => axios.post("/questions/", payload);
const update = ({ id, payload }) => axios.put(`/questions/${id}`, payload);
const show = id => axios.get(`/questions/${id}`);
const destroy = id => axios.delete(`/questions/${id}`);

const questionsApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default questionsApi;
