import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const submitTask = createAsyncThunk(
  "submissions/submitTask",
  async ({ taskId, gitHubLink }) => {
    setAuthHeader(localStorage.getItem("token"), api);
    try {
      const { data } = await api.post(
        `/api/submission/submit?taskId=${taskId}&gitHubLink=${gitHubLink}`,
        {}
      );

      return data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);

export const getSubmittionByTaskId = createAsyncThunk(
  "submissions/getSubmittionByTaskId",
  async ({ taskId }) => {
    setAuthHeader(localStorage.getItem("token"), api);
    try {
      const { data } = await api.get(`/api/submission/task/${taskId}`);

      return data;
    } catch (error) {
      throw Error(error.response?.data?.error || "Submission fetch failed");
    }
  }
);

export const acceptDeclineTask = createAsyncThunk(
  "submissions/acceptDeclineTask",
  async ({ submissionId, status }) => {
    setAuthHeader(localStorage.getItem("token"), api);
    try {
      const response = await api.patch(
        `/api/submission/completeTask/${submissionId}?status=${status}`,
        {}
      );
      const { data } = response;
      return data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);

const submissionSlice = createSlice({
  name: "submissions",
  initialState: {
    submissions: [],
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.status = "success";
        state.submissions.push(action.payload);
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSubmittionByTaskId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubmittionByTaskId.fulfilled, (state, action) => {
        state.status = "success";
        state.submissions = action.payload;
      })
      .addCase(getSubmittionByTaskId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(acceptDeclineTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions = state.submissions.map((item) =>
          item.id !== action.payload.id ? item : action.payload
        );
      })
      .addCase(acceptDeclineTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default submissionSlice.reducer;
