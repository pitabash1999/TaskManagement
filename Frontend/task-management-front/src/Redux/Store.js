import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authslice from "./Authslice";
import taskSlice from "./Taskslice";
import submissionSlice from "./Submissionslice";

const rootReducer = combineReducers({
  auth: authslice,
  task: taskSlice,
  submissions: submissionSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
