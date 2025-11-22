import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Module = {
  _id?: string;
  name?: string;
  course?: string;
  editing?: boolean;
};

type ModulesState = {
  modules: Module[];
};

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // replace modules list
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },

    // mark one as editing
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },

    // update in memory only (used while typing)
    updateModuleLocal: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },

    // replace with server version
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id
          ? { ...action.payload, editing: false }
          : m
      );
    },

    // add new module
    addModule: (state, action: PayloadAction<Module>) => {
      state.modules.push(action.payload);
    },

    // remove module
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (m) => m._id !== action.payload
      );
    },
  },
});

export const {
  setModules,
  editModule,
  updateModuleLocal,
  updateModule,
  addModule,
  deleteModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;