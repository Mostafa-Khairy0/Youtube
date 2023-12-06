import Sidebar from './Sidebar'
import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import styles from './style.module.css'

const Layout = () => {
    const access = useSelector((state)=> state.access.value)
    const navigate = useNavigate()
    useEffect(()=>{
      if(access==="")
        navigate("/")
    },[navigate,access])
  return (
    <div className={styles.layout}>
        <Outlet/>
        <Sidebar />
    </div>
  )
}

export default Layout