import {useState, useRef, useEffect} from 'react'
import styles from './style.module.css'

export const FileInput = ({name, accept,required}) => {
    const [state, setState]=useState("اختر ملف");
    const ref=useRef(null);
    const handelChange=(e)=>{
        setState(e.target.files[0].name);
    }
    useEffect(()=>{},[state])
  return (
    <div className={styles.contfileInput} onClick={()=> ref.current.click()}>
        <span className="material-symbols-rounded">upload</span>
        <input type='file' id={name} name={name} accept={accept} className={styles.fileInput} ref={ref} onChange={handelChange} required={required}/>
        {state}
    </div>
  )
}
