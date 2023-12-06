import axios from "../axios";
import FormData from "form-data";
export default async (name, description, version, category, file, image) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("project", file);
  formData.append("image", image);
  formData.append("aeVersion", version);
  formData.append("category", category);
  return axios({
    method: "post",
    url: "projects/create",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      return { error };
    });
  // .then((res)=>console.log(res));
};
