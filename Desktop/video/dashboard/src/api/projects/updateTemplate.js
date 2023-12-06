import axios from "../axios";
import FormData from "form-data";
import { toast } from "react-toastify";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async (id, parameters, old) => {
  const formData = new FormData();
  for (let key in parameters) {
    if (key == "files")
      for (let value of parameters.files) formData.append("files", value);
    else formData.append(key, parameters[key]);
  }
  formData.append("files", parameters.files);
  formData.append("old", JSON.stringify(old));

  const send = async (message = {}, part = 0) => {
    console.log({ message, part });
    formData.set("message", JSON.stringify(message));
    formData.set("part", part);
    return axios({
      method: "post",
      url: "projects/updateTemplate/" + id,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res.data)
      .then(async ({ message: m, part: p, error }) => {
        if (error) return { error };
        if (p >= 3) return m;
        message = { ...message, ...m };
        if (part == p) await wait(10000);
        else
          switch (part) {
            case 1:
              toast.info("تم رفع الملفات بنجاح");
              break;
            case 2:
              toast.info("تم انشاء الفيديو");
              break;
          }
        part = p;
        return send(message, part);
      });
  };
  return send();
};
