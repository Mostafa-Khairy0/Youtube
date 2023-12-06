import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAccess from "../api/getAccess";
import { toast } from "react-toastify";
const initialState = {
  value: ""
};
export const setAccess = createAsyncThunk(
  "access/setAccess",
  async ({email,password},{rejectWithValue,fulfillWithValue,dispatch}) => {
    const {error,success,accessKey}=await getAccess(email, password)
    if(error)
      return rejectWithValue(error)
    if(success)
      return fulfillWithValue({success,accessKey})
  }
);

const accessSlice = createSlice({
  name: "access",
  initialState,
  extraReducers:{
    [setAccess.rejected]: (_,action) => {
      toast.error(action.payload)
    },
    [setAccess.fulfilled]: (state,action) => {
      toast.success(action.payload.success)
      state.value=action.payload.accessKey
    },
    signOut:(state)=>{
      state.value=""
    }
  }
});
export const {signOut}=accessSlice.actions 
export default accessSlice.reducer;