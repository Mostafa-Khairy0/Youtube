import { Fragment, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoad } from "../store/isLoadSlice.js";
import { toast } from "react-toastify";

export const AxiosInterceptors = ({ children }) => {
  const dispatch = useDispatch();
  const access = useSelector((state) => state.access.value);
  useEffect(() => {
    const axiosRequest = axios.interceptors.request.use(
      function (config) {
        config.timeout = Number.MAX_SAFE_INTEGER;
        if (!config.url.includes("changePlainlyAccess"))
          dispatch(setIsLoad(true));
        config.headers.Authorization = `Bearer ${access}`;
        return config;
      },
      function (error) {
        console.log({ requestError: error });
        toast.error(error.message);
        dispatch(setIsLoad(false));
        return Promise.reject(error);
      }
    );
    const axiosRespone = axios.interceptors.response.use(
      function (response) {
        if (response.config.url.includes("changePlainlyAccess"))
          return response;
        else if (!response?.data?.part) dispatch(setIsLoad(false));
        else if (response?.data?.part == 3) dispatch(setIsLoad(false));
        return response;
      },
      async function (error) {
        console.log({ responeError: error });
        toast.error(error.message);
        dispatch(setIsLoad(false));
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(axiosRequest);
      axios.interceptors.response.eject(axiosRespone);
    };
  }, [access, dispatch]);
  return <Fragment>{children}</Fragment>;
};
