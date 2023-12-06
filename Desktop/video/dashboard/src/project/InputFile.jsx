import { useRef, useState } from "react";
import styles from "./style.module.css";

const InputFile = ({ type, file, name }) => {
  const inputRef = useRef("");
  const fileRef = useRef("");
  return (
    <div className={styles.inputImage}>
      <div
        className={styles.upload}
        style={{
          top: type == "audio" ? "calc(40% - 20px)" : "5px",
          left: type == "audio" ? "calc(50% - 20px)" : "5px",
        }}
        onClick={() => inputRef.current.click()}
      >
        <span className="material-symbols-rounded">cloud_upload</span>
      </div>
      {type == "image" ? (
        <img src={`${file}`} alt={type} ref={fileRef} />
      ) : type == "video" ? (
        <video src={`${file}`} alt={type} ref={fileRef} controls></video>
      ) : (
        <audio
          src={`${file}`}
          alt={type}
          ref={fileRef}
          className={styles.audio}
          controls
        ></audio>
      )}
      <input
        type="file"
        name={name}
        id={name}
        accept={`${type}/*`}
        ref={inputRef}
        className={styles.hide}
        onChange={(e) =>
          fileRef.current.setAttribute(
            "src",
            URL.createObjectURL(e.target.files[0])
          )
        }
      />
    </div>
  );
};

export default InputFile;
