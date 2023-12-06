import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../store/projectsSlice";
import Table from "../table/Table";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const projects = useSelector((state) => state.projects.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const rows = projects.map((project) => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      category: project.categoryName,
      time: project.time,
      loves: project.lovesIDs?.length,
      image: project.files.image,
    };
  });
  const columns = [
    {
      type: "image",
      field: "image",
      headerName: "التصميم",
      renderCell: (x) => (
        <img src={x.value} alt="image" className={styles.image} />
      ),
    },
    { type: "string", field: "name", headerName: "الاسم", width: "120" },
    {
      type: "string",
      field: "description",
      headerName: "الوصف",
      width: "200",
    },
    { type: "string", field: "category", headerName: "الفئة", width:"150" },
    {
      type: "date",
      field: "time",
      headerName: "الوقت",
      valueGetter: ({ value }) => value && new Date(value),
      width: 120,
    },
    {
      align: "center",
      type: "number",
      field: "loves",
      headerName: "الاعجاب",
    },
  ];
  return (
    <div>
      <Table
        rows={rows}
        columns={columns}
        onRowClick={({ id }) => navigate(id)}
      />
    </div>
  );
};

export default Projects;
