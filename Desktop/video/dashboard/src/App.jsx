import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sign from "./sign/Sign";
import "./App.css";
import Users from "./users/Users"
import Layout from "./layout/Layout";
import Projects from "./projects/Projects";
import CreateProject from "./createProject/CreateProject";
import Settings from "./settings/Settings";
import { AxiosInterceptors } from "./api/AxiosInterceptors";
import { useSelector } from 'react-redux'
import Loader from "./loader/Loader";
import Project from "./project/Project";
function App() {
  const isLoad = useSelector((state)=> state.isLoad.value)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sign />
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/projects",
          children: [
            {
              index: true,
              element: <Projects />,
            },
            {
              path: ":projectId",
              element: <Project />,
            }
          ]
        },
        {
          path: "/create-project",
          element: <CreateProject />
        },
        {
          path: "/settings",
          element: <Settings />
        }
      ]
    }
  ]);
  return (
    <Fragment>
      <AxiosInterceptors>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          theme="light"
          className="toast"
          rtl
        />
        {isLoad && <Loader />}
      </AxiosInterceptors>
    </Fragment>
  );
}

export default App;
