import {
  loaduser,
  errors,
  loadblogs,
  loadsingleuser,
  setloading,
  updatelike,
  setblogloading,
  loadsingleblogs,
  setloadingfalse,
  loadusers,
  logout,
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

export const asyncsingleuser = (username) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/singleuser/${username}`);
    dispatch(loadsingleuser(data.user));
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const asyncsingleblogs = (id) => async (dispatch) => {
  try {
    dispatch(setblogloading());
    const { data } = await Axios.get(`/single-stories/${id}`);
    console.log("loaduser action>>>>>", data);
    dispatch(loadsingleblogs(data?.blog));
  } catch (err) {
    dispatch(errors(err?.response?.data?.message));
  }
};

export const asyncloadblogs = () => async (dispatch) => {
  try {
    dispatch(setloading());
    const { data } = await Axios.get("/blogs");
    dispatch(loadblogs(data?.blogs));
  } catch (err) {
    dispatch(errors(err?.response?.data?.message));
  }
};

export const asynccreateblog = (blog) => async (dispatch) => {
  try {
    await Axios.post("/create-stories", blog);
    dispatch(asyncloadblogs());
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const asyncdeleteblog = (id) => async (dispatch) => {
  try {
    dispatch(setloading());
    await Axios.get("/delete-stories/" + id);
    dispatch(asyncloadblogs());
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const asyncupdateblog = (id, blog) => async (dispatch) => {
  try {
    dispatch(setloading());
    await Axios.put("/update-stories/" + id, blog);
    dispatch(asyncloadblogs());
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const asynclikeblog = (id, single) => async (dispatch) => {
  try {
    dispatch(setblogloading());
    const { data } = await Axios.get("/like/" + id);
    dispatch(updatelike({ likes: data.likes, id, single }));
  } catch (err) {
    console.log(err);
    dispatch(errors(err.response.data.message));
  }
};

export const asyncupdateprofile = (user) => async (dispatch) => {
  try {
    dispatch(setloading());
    await Axios.put("/update-profile/", user);
    dispatch(asyncloaduser());
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const asynloadusers = () => async (dispatch) => {
  try {
    dispatch(setloading());
    const { data } = await Axios.get("/users");
    dispatch(loadusers(data.users));
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};
