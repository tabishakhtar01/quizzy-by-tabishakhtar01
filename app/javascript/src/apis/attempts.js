import axios from "axios";

const list = () => axios.get("/attempts");
const create = payload => axios.post("/attempts/", payload);
const update = ({ attemptId, payload }) =>
  axios.put(`/attempts/${attemptId}`, payload);

const attemptsApi = {
  list,
  create,
  update,
};

export default attemptsApi;
