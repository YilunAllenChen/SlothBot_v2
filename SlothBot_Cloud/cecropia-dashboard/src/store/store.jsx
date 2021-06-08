import { createSlice, configureStore } from "@reduxjs/toolkit";

const rootReducer = createSlice({
  name: "reducer",
  initialState: {
    view: "home",
    controller: {
      activeAgent: null,
      agentStatus: null,
      agentStatusReady: false,
      agentDataChart: null,
      agentDataReady: false,
      selectedDataView: null,
      agnetInstructions: [],
      agentInstructionsReady: false,
    },
  },
  reducers: {
    toPage: (state, action) => {
      state.view = action.payload;
    },

    selectActiveAgentAndUnreadyData: (state, action) => {
      state.controller.activeAgent = action.payload;
      state.controller.agentDataReady = false;
      state.controller.agentInstructionsReady = false;
      state.controller.agentStatusReady = false;
    },

    setVisualization: (state, action) => {
      state.controller.agentDataReady = action.payload.agentDataReady;
      state.controller.agentDataChart = action.payload.agentDataChart;
      state.controller.selectedDataView = action.payload.selectedDataView;
    },

    setVisualizedSensorDataView: (state, action) => {
      state.controller.selectedDataView = action.payload;
    },

    setFetchedAgentInstruction: (state, action) => {
      state.controller.agentInstructions = action.payload.agentInstructions;
      state.controller.agentInstructionsReady =
        action.payload.agentInstructionsReady;
    },

    setAgentStatusData: (state, action) => {
      state.controller.agentStatus = action.payload.agentStatus;
      state.controller.agentStatusReady = action.payload.agentStatusReady;
    }

  },
});

export const {
  toPage,
  selectActiveAgentAndUnreadyData,
  setVisualization,
  setVisualizedSensorDataView,
  setFetchedAgentInstruction,
  setAgentStatusData
} = rootReducer.actions;

export const store = configureStore({
  reducer: rootReducer.reducer,
});

export default rootReducer.reducer;
