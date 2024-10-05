import {
  loaduser,
  errors,
  logout,
  setloadingfalse,
  setloading,
} from "./UserSlice";
import Axios from "../Axios";

export const asyncloaduser = () => async (dispatch) => {
  try {
    dispatch(setloading());
    const { data } = await Axios.get("/me");
    if (data.success) {
      dispatch(loaduser(data.user));
    }
    dispatch(setloadingfalse());
  } catch (err) {
    dispatch(setloadingfalse());
    dispatch(errors(err?.response?.data?.message));
  }
};

export const asynclogout = () => async (dispatch) => {
  try {
    dispatch(setloading());
    await Axios.get("/logout");
    dispatch(logout());
    dispatch(setloadingfalse());
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

