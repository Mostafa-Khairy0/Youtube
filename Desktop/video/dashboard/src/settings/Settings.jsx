import styles from "./style.module.css";
import updateAccess from "../api/updateAccess";
import ChangePlainlyAccess from "../api/projects/updatePlainly";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../store/projectsSlice";
import { setIsLoad } from "../store/isLoadSlice";
import { useEffect } from "react";

const Settings = () => {
  const projects = useSelector((state) => state.projects.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const updateAdmin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const oldPass = e.target[1].value;
    const newPass = e.target[2].value;
    const { success, error } = await updateAccess(email, oldPass, newPass);
    error ? toast.error(error) : toast.success(success);
  };
  const updatePlainly = async (e) => {
    e.preventDefault();
    const apiAccess = e.target.elements.apiAccess.value;
    const check = e.target.elements.continue.checked;
    if (!check) toast.error("يجب التاكيد اولا");
    else {
      dispatch(setIsLoad(true));
      console.log("######################start##########################")
      const change = new ChangePlainlyAccess(apiAccess, projects);
      await change.update();
      console.log("###################### end ##########################")
      dispatch(setIsLoad(false));
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => updateAdmin(e)}>
        <label htmlFor="email">تغيير البريد وكلمة السر</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="البريد الالكترونى"
          required
        />
        <input
          type="text"
          name="oldPass"
          id="oldPass"
          placeholder="كلمة السر القديمة"
          required
        />
        <input
          type="text"
          name="newPass"
          id="newPass"
          placeholder="كلمة السر الجديدة"
          required
        />
        <input type="submit" name="submit" id="submit" value="تحديث" />
      </form>
      <form className={styles.form} onSubmit={(e) => updatePlainly(e)}>
        <label htmlFor="email">تغيير حساب plainly</label>
        <input
          type="text"
          name="apiAccess"
          id="apiAccess"
          placeholder="API Access Token"
          required
        />
        <div className={styles.inputBox}>
          <div className={styles.confirm}>تاكيد</div>
          <input type="checkbox" name="continue" required />
        </div>
        <input type="submit" name="submit" id="submit" value="تحديث" />
      </form>
    </div>
  );
};

export default Settings;
