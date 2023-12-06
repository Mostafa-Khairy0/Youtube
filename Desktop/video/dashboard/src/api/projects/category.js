import axios from "../axios";

export const getCategories = async () => {
  return axios({ url: "projects/getCategories", method: "get" }).then((res) => res.data);
};
