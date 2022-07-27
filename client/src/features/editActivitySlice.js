import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setModal, setModalTitle, setModalBody } from "./modalSlice";
import { setClickedLocation } from "./mapSlice";

export const updateActivity = createAsyncThunk(
  "editActivity/updateActivity",
  async (data, thunkAPI) => {
    const { bmr } = thunkAPI.getState().userData.userDetails;
    const caloriesBurned = (
      ((bmr * (data.activity === "running" ? 11 : 6.8)) / 24) *
      (Number(data.duration) / 60)
    ).toFixed(0);
    const res = await axios({
      url: "/activities/edit",
      method: "PUT",
      data: {
        ...data,
        caloriesBurned,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { dispatch } = thunkAPI;
    dispatch(setModal(true));
    dispatch(setModalTitle("Success!"));
    dispatch(setModalBody("Your activity has been updated!"));
    dispatch(setClickedLocation(null));
    dispatch(setClickedMap(false));
  }
);

const initialState = {
  currentActivityId: null,
  editValues: {
    activity: "",
    duration: "",
    date: "",
    coords: "",
  },
  clickedMap: false,
};

const editActivitySlice = createSlice({
  name: "editActivity",
  initialState,
  reducers: {
    setCurrentActivityId: (state, action) => {
      state.currentActivityId = action.payload;
    },
    setValues: (state, action) => {
      state.editValues[action.payload.name] = action.payload.value;
    },
    setClickedMap: (state, action) => {
      state.clickedMap = action.payload;
    },
  },
});

export const { setCurrentActivityId, setValues, setClickedMap } =
  editActivitySlice.actions;

export default editActivitySlice.reducer;
