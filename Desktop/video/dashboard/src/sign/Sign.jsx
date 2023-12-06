import {useEffect} from 'react'
import styles from './style.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {setAccess} from "../store/accessSlice.js"
import { useNavigate } from 'react-router-dom'
const Sign = () => {
  const access = useSelector((state)=> state.access.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandel=(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(setAccess({email,password}))
  }
  useEffect(()=>{
    if (access!=="")
      navigate("/users")
  },[access,navigate])
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandel}>
        <label htmlFor='email'>تسجيل الدخول</label>
        <input type="email" name="email" id='email' placeholder='البريد الالكترونى'/>
        <input type="password" name="password" id='password' placeholder='كلمة السر'/>
        <input type="submit" value="تسجيل" />
      </form>
    </div>
  )
}

export default Sign
