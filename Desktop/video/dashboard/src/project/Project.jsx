import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../store/projectsSlice";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Form from "./Form";
import TempForm from "./TempForm";
import deleteProject from "../api/projects/deleteProject";
import { toast } from "react-toastify";

const Project = () => {
  const { projectId } = useParams();
  const projects = useSelector((state) => state.projects.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const project = projects.find(({ id }) => id === projectId);
  useEffect(() => {
    if (!project) navigate("/home");
  }, [navigate, project]);

  const deleteProjectf = async (e) => {
    e.preventDefault();
    const check = e.target.elements.continue.checked;
    console.log({ check });
    if (!check) toast.error("يجب التاكيد اولا");
    else {
      const { success, error } = await deleteProject(projectId);
      error ? toast.error(error) : toast.success(success);
    }
  };

  const {
    id,
    projectId: pId,
    name,
    description,
    categoryName,
    time,
    files: { image, video },
    parameters,
  } = project || {
    id: "",
    projectId: "",
    name: "",
    description: "",
    categoryName: "",
    time: new Date(),
    files: { image: "", video: "" },
    parameters: [],
  };
  return (
    <div className={styles.project}>
      <Form
        id={id}
        name={name}
        description={description}
        category={categoryName}
        time={time}
        image={image}
      />
      <TempForm id={pId} parameters={parameters} video={video} />

      <form className={styles.deleteForm} onSubmit={(e) => deleteProjectf(e)}>
        <div className={styles.inputBox}>
          <div className={styles.confirm}>تاكيد</div>
          <input type="checkbox" name="continue" required />
        </div>
        <input type="submit" name="submit" id="submit" value="حذف التصميم" />
      </form>
    </div>
  );
};

export default Project;
