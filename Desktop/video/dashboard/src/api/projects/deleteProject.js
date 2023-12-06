import axios from "../axios";
export default async (id) => {
  return axios({
    method: "delete",
    url: "projects/deleteProject",
    data: { id },
  }).then((res) => res.data);
};
