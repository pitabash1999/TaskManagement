import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

// Helper function for auth headers
const withAuth = async (callback) => {
  setAuthHeader(localStorage.getItem("token"), api);
  return await callback();
};

// Fetch Tasks
export const fetchTask = createAsyncThunk("task/fetchTask", async (status) => {
  return withAuth(async () => {
    const { data } = await api.get("/api/task/allTasks", {
      params: { status },
    });
    return data;
  });
});

// Fetch User's Tasks
export const fetchUsersTask = createAsyncThunk(
  "task/fetchUsersTask",
  async ({ status, userId }) => {
    return withAuth(async () => {
      const { data } = await api.get(`/api/task/assignedUserTask/${userId}`, {
        params: { status },
      });

      return data;
    });
  }
);

// Fetch Single Task
export const fetchTaskId = createAsyncThunk(
  "task/fetchTaskId",
  async (taskId) => {
    return withAuth(async () => {
      const { data } = await api.get(`/api/task/${taskId}`);
      return data;
    });
  }
);

// Create Task
export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData) => {
    return withAuth(async () => {
      const { data } = await api.post("/api/task/createTask", taskData);
      return data;
    });
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, updatedTaskData }) => {
    return withAuth(async () => {
      const { data } = await api.patch(
        `/api/task/updateTask/${id}`,
        updatedTaskData
      );
      return data;
    });
  }
);

export const assignTaskUser = createAsyncThunk(
  "task/assignTaskUser",
  async ({ id, userId }) => {
    try {
      const data = await withAuth(async () => {
        const response = await api.patch(
          `/api/task/${id}/user/${userId}/assign`,
          {}
        );
        return response.data;
      });
      // ✅ RETURN from the outer function
    } catch (error) {
      console.error("Assignment failed:", error);
      throw error;
    }
  }
);

// Delete Task
export const deleteTaskbyId = createAsyncThunk(
  "task/deleteTaskbyId",
  async (id) => {
    return withAuth(async () => {
      await api.delete(`/api/task/deleteTask/${id}`); // Added leading slash
      return id;
    });
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    taskDetails: null,
    usersTask: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    };

    builder
      // Fetch Tasks
      .addCase(fetchTask.pending, handlePending)
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTask.rejected, handleRejected)
      .addCase(fetchTaskId.fulfilled, (state, action) => {
        state.loading = false;
        state.taskDetails = action.payload;
      })

      // Fetch User's Tasks
      .addCase(fetchUsersTask.pending, handlePending)
      .addCase(fetchUsersTask.fulfilled, (state, action) => {
        state.loading = false;
        state.usersTask = action.payload;
      })
      .addCase(fetchUsersTask.rejected, handleRejected)

      // Create Task
      .addCase(createTask.pending, handlePending)
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload); // Add new task to beginning
      })
      .addCase(createTask.rejected, handleRejected)

      // Update Task
      .addCase(updateTask.pending, handlePending)
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload?.id ? { ...task, ...action.payload } : task
        );
      })
      .addCase(updateTask.rejected, handleRejected)

      // Assign Task
      .addCase(assignTaskUser.pending, handlePending)
      .addCase(assignTaskUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        );
      })
      .addCase(assignTaskUser.rejected, handleRejected)

      // Delete Task
      .addCase(deleteTaskbyId.pending, handlePending)
      .addCase(deleteTaskbyId.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskbyId.rejected, handleRejected);
  },
});

export default taskSlice.reducer;
