import { createSlice, configureStore } from "@reduxjs/toolkit";

const rootReducer = createSlice({
  name: "reducer",
  initialState: {
    view: "home",
    controller: {
        activeAgent: "AGENT_0xdca632abbe28"
    }
  },
  reducers: {
    toPage: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const {
  toPage,
} = rootReducer.actions;

export const store = configureStore({
  reducer: rootReducer.reducer,
});

export default rootReducer.reducer;
