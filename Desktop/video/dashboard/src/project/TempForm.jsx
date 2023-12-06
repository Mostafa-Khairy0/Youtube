import { useRef, useState, Fragment } from "react";
import styles from "./style.module.css";
import InputFile from "./InputFile";
import { useDispatch } from "react-redux";
import updateTemplate from "../api/projects/updateTemplate";
import { toast } from "react-toastify";

const TempForm = ({ id, video, parameters }) => {
  const dispatch = useDispatch();
  const [isChanged, setIsChaned] = useState(false);
  const submitRef = useRef("");
  const videoRef = useRef("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    const obj = { files: [] };
    for (let ele of e.target.elements)
      if (ele.type == "text") obj[ele.name] = ele.value;
      else if (ele.type == "file" && ele.files.length > 0) {
        const file = ele.files[0];
        const blob = file.slice(0, file.size, file.type);
        const newFile = new File([blob], ele.id, { type: file.type });
        obj.files.push(newFile);
      }
    const {error, success, output}=await updateTemplate(id, obj, parameters )
    if(success){
      videoRef.current.setAttribute("src", output);
      toast.success(success)
    }
    else
      toast.error(error)
  };

  return (
    <form
      className={`${styles.form} ${styles.temp}`}
      onSubmit={handelSubmit}
      onChange={() => {
        setIsChaned(true);
        submitRef.current.style.opacity = "1";
      }}
    >
      <video
        src={video}
        controls
        className={styles.video}
        ref={videoRef}
      ></video>
      {parameters.map((param, index) => (
        <Fragment key={index}>
          {param.type == "text" ? (
            <input
              type="text"
              name={param.name}
              id={param.name}
              defaultValue={param.defaultValue}
              placeholder={param.defaultValue}
            />
          ) : (
            <InputFile
              type={param.type}
              file={param.defaultValue}
              name={param.name}
            />
          )}
        </Fragment>
      ))}
      <input
        type="submit"
        name="submit"
        value="تعديل القالب"
        ref={submitRef}
        onClick={(e) => {
          if (!isChanged) e.preventDefault();
        }}
      />
    </form>
  );
};

export default TempForm;
