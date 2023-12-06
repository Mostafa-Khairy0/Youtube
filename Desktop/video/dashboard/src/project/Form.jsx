import { useRef, useState, useEffect } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../store/projectsSlice.js";
import InputFile from "./InputFile";
import { setCategories } from "../store/categoriesSlice";

const Form = ({ id, name, description, category, time, image }) => {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.categories.value);
  if (categories?.length > 0)
    categories = [...categories].sort((a) => (a.name == category ? -1 : 1));
  const submitRef = useRef("");
  const [isChanged, setIsChaned] = useState(false);
  useEffect(() => {
    dispatch(setCategories());
  }, [dispatch]);
  const submitHandeler = (e) => {
    e.preventDefault();

    name = e.target.elements.name.value;
    description = e.target.elements.description.value;
    category = e.target.elements.category.value ?? category;
    time = new Date(e.target.elements.time.value);
    const imageFile = e.target.elements.image.files[0];
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryName", category);
    formData.append("time", time);
    formData.append("image", image);
    formData.append("imageFile", imageFile);

    dispatch(updateProject({ id, formData }));
  };
  return (
    <form
      method="post"
      className={styles.form}
      onSubmit={submitHandeler}
      onChange={() => {
        setIsChaned(true);
        submitRef.current.style.opacity = "1";
      }}
    >
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <label htmlFor="name">الاسم</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={name}
            placeholder={name}
          />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="description">الوصف</label>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={description}
            placeholder={description}
          />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <label htmlFor="time">وقت انشاء التصميم</label>
          <input
            type="date"
            name="time"
            id="time"
            defaultValue={new Date(time).toISOString().slice(0, 10)}
          />
        </div>
        <div className={styles.select}>
          <label htmlFor="version">التصنيف</label>
          <select id="category" name="category" defaultValue={category}>
            {categories?.map(({ name }, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <InputFile type="image" file={image} name={"image"} />
      <input
        type="submit"
        value="ارسال التعديلات"
        ref={submitRef}
        onClick={(e) => {
          if (!isChanged) e.preventDefault();
        }}
      />
    </form>
  );
};

export default Form;
