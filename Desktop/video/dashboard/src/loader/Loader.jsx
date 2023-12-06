import styles from './style.module.css'
import {useState, useEffect, useRef} from 'react'
function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Loader = () => {
  const [time,setTime]=useState(0)
  useInterval(()=>setTime((time)=>time+1), 1000);

  return (
    <div className={styles.container}>
        <svg className={styles.loader}>
          <circle cx={70} cy={70} r={70}/> 
        </svg>   
        <div className={styles.time}>
          {time}
        </div>
    </div>
  )
}

export default Loader