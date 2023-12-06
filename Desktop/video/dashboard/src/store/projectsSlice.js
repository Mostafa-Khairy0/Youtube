import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import get from "../api/projects/getProjects";
import update from "../api/projects/updateProject"  
import {toast} from "react-toastify";
import updateTemp from "../api/projects/updateTemplate";
const initialState = {value: []};

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_,{fulfillWithValue,getState}) => {
    let projects = getState().projects.value
    if(projects.length==0){
      projects=await get()
      return fulfillWithValue(projects)
    }
    return fulfillWithValue(projects)
  }
);
export const updateProjects = createAsyncThunk(
  "projects/updateProjects",
  async (_,{fulfillWithValue}) => {
      const projects=await get()
      return fulfillWithValue(projects)
  }
);
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({id, formData},{fulfillWithValue}) => {
      const {error, success}=await update(id, formData)
      if(success)
        toast.success(success)
      else
        toast.error(error)
      return fulfillWithValue(id)
  }
);
export const updateTemplate = createAsyncThunk(
  "projects/updateTemplate",
  async ({id, parameters},{fulfillWithValue}) => {
      const {error, success, output}=await updateTemp(id, parameters)
      console.log({error, success, output})
      if(success)
        toast.success(success)
      else
        toast.error(error)
      return fulfillWithValue(id)
  }
);
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers:{
    [getProjects.fulfilled]: (state,action) => {
      if(Array.isArray(action.payload))
        state.value=action.payload
    },
    [updateProjects.fulfilled]: (state,action) => {
      if(Array.isArray(action.payload))
        state.value=action.payload
    }
  }
});
// export const {signOut}=projectsSlice.actions 
export default projectsSlice.reducer;