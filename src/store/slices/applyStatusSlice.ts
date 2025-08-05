import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createApplyStatusApi,
  getApplyingStatusApi,
  getApplyStatusApi,
} from "@/api/applyApi";
import { ApplyStatus } from "@/types/ApplyStatus";

interface ApplyStatusState {
  loading: boolean;
  applyStatus: ApplyStatus[];
  error: any;
  applyingStatus: ApplyStatus[];
}

const initialState: ApplyStatusState = {
  loading: false,
  applyStatus: [],
  error: null,
  applyingStatus: [],
};

export const getApplyStatus = createAsyncThunk(
  "applyStatus/getApplyStatus",
  async (openid: string) => {
    const applyStatus = await getApplyStatusApi(openid);
    return applyStatus;
  }
);
export const getApplyingStatus = createAsyncThunk(
  "applyStatus/getApplyingStatus",
  async (openid: string) => {
    const applyStatus = await getApplyingStatusApi(openid);
    return applyStatus;
  }
);
export const createApplyStatus = createAsyncThunk(
  "applyStatus/createApplyStatus",
  async (param: ApplyStatus) => {
    const applyStatus = await createApplyStatusApi(param);
    return applyStatus;
  }
);
const applyStatusSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearApplyStatus: (state) => {
      state.applyStatus = [];
      state.applyingStatus = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplyStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplyStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.applyStatus = action.payload;
      })
      .addCase(getApplyStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getApplyingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplyingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.applyingStatus = action.payload;
      })
      .addCase(getApplyingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearApplyStatus } = applyStatusSlice.actions;

export default applyStatusSlice.reducer;
