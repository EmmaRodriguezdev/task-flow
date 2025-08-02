import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IWorkspaceResponse } from "../infrastructure/interfaces/workspace.entity";
import { WorkspaceDataSource } from "../infrastructure/datasources/workspace.data-source";

export const fetchWorkspacesByUserId = createAsyncThunk(
  "workspace/fetchWorkspacesByUserId",
  async (userId: number) => {
    const workspaceDataSource = new WorkspaceDataSource();
    const response = await workspaceDataSource.getWorkspacesByUserId(userId);
    return response.map((workspace) => ({
        id: workspace.id,
        ownerId: workspace.ownerId,
        name: workspace.name,
    }))
  }
);

export interface WorkspaceState {
  workspaceSelected: IWorkspaceResponse | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
}

const initialState = {
  workspaceSelected: null,
  loading: "idle",
} satisfies WorkspaceState as WorkspaceState;

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action) => {
      state.workspaceSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkspacesByUserId.fulfilled, (state, action) => {
      state.workspaceSelected =
        action.payload[0] ?? null
    });
  },
});

export const { setWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
