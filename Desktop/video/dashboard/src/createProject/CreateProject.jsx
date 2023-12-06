import { useEffect, useState } from "react";
import styles from "./style.module.css";
import createProject from "../api/projects/createProject";
import { uploadFile } from "../api/drive";
import { useDispatch, useSelector } from "react-redux";
import { FileInput } from "./FileInput";
import { toast } from "react-toastify";
import { setCategories } from "../store/categoriesSlice";
import { setIsLoad } from "../store/isLoadSlice";

const CreateProject = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.value);

  const openWebSocket = async ({ part, message }) => {
    const socket = new WebSocket(import.meta.env.VITE_SOCKET);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      console.log({ message, part });
      socket.send(JSON.stringify({ message, part }));
    };

    socket.onmessage = (event) => {
      const { type, message: m } = JSON.parse(event.data);
      console.log({ type, message: m });
      if (type == "close") {
        message = { ...message, ...m.message };
        part = m.part;
        socket.close();
      } else if (type != "info") {
        dispatch(setIsLoad(false));
        part = 9;
      }
      toast(m, { type, autoClose: 1000 * 60 });
    };

    socket.onclose = async (event) => {
      console.log("WebSocket connection closed:", event);
      if (part < 9) {
        await openWebSocket({ part, message });
      } else if (part == 9) {
        dispatch(setIsLoad(false));
        toast("تم الانتهاء بنجاح", { type: "success", autoClose: 1000 * 60 });
      }
    };

    socket.onerror = (error) => {
      dispatch(setIsLoad(false));
      console.error("WebSocket error:", error);
    };
    return socket;
  };

  const submitHandel = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const file = e.target.elements.file.files[0];
    const image = e.target.elements.image.files[0];
    const version = e.target.elements.version.value;
    const category = e.target.elements.category.value;
    const { url: fileURL } = await uploadFile(file);
    const { url: imageURL } = await uploadFile(image);
    toast.success("تم رفع الملفات بنجاح");

    const message = {
      name,
      description,
      file: fileURL,
      image: imageURL,
      version,
      category,
    };
    const part = 0;
    await openWebSocket({ message, part });
    dispatch(setIsLoad(true));
  };

  useEffect(() => {
    dispatch(setCategories());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>انشاء تصميم</h1>
      <form
        className={styles.form}
        onSubmit={submitHandel}
        method="post"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="اسم التصميم"
          required
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="وصف التصميم"
          required
        />
        <div className={styles.row}>
          <div className={styles.box}>
            <label htmlFor="version">اصدار التصميم</label>
            <select id="version" name="version" required>
              <option value="AE2022">AE2022</option>
              <option value="AE2023_AMD64">AE2023_AMD64</option>
            </select>
          </div>
          <div className={styles.box}>
            <label htmlFor="version">التصنيف</label>
            <select id="category" name="category" required>
              {categories?.map(({ name }, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.box}>
            <label htmlFor="file">ملف التصميم</label>
            <FileInput name="file" accept=".zip,.rar,.7z,.gz" required />
          </div>
          <div className={styles.box}>
            <label htmlFor="image">صورة التصميم</label>
            <FileInput name="image" accept="image/*" required />
          </div>
        </div>
        <input type="submit" value="تسجيل" />
      </form>
    </div>
  );
};

export default CreateProject;
