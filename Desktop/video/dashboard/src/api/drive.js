import axios from "./axios";
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios({
      url: "projects/drive/upload",
      method: "post",
      data: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
};
