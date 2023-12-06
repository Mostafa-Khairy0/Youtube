import {useRef} from 'react'
import styles from './style.module.css'
import {data} from "./sidebar.json"
import { NavLink } from 'react-router-dom'
import {useDispatch } from 'react-redux'
import {signOut} from "../store/accessSlice"
const Sidebar = () => {
    const dispatch = useDispatch()
    const ref=useRef(null)
    const switchShow=(e)=>{
        if(ref.current.classList.contains(styles.show)){
            ref.current.classList.remove(styles.show)
            e.target.innerHTML="menu"
        }
        else{
            ref.current.classList.add(styles.show)
            e.target.innerHTML="close"
        }
    }
  return (
    <div className={styles.sidebar} ref={ref}>
        {
          data.map(({label,value,icon},index)=>
            <NavLink to={value?`/${value}`:"/"} key={index} className={styles.link} onClick={()=> value?"":dispatch(signOut())}>
                <span className="material-symbols-rounded">{icon}</span>
                <div className={styles.label}>{label}</div>
            </NavLink>
          )  
        }
        <span className={`material-symbols-rounded ${styles.menubar}`} onClick={switchShow}>menu</span>
    </div>
  )
}

export default Sidebar
