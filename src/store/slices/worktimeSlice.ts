import {
  getTechUserWorkTimeApi,
  saveTechUserWorkTimeApi,
} from "@/api/worktimeApi";
import {
  TechWorktime,
  TechWorktimeBlock,
  TechWorktimeBlocks,
} from "@/types/TechWorktime";
import { arrTechTime } from "@/util/dict";
import { convertToTechBlockTimeBlocks } from "@/util/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface worktimeState {
  loading: boolean;
  worktimeBlocks: TechWorktimeBlocks;
}

const initialState: worktimeState = {
  loading: false,
  worktimeBlocks: [],
};

//createAsyncThunk 参数全局唯一就行，叫什么名字无所谓
export const getTechUserWorkTime = createAsyncThunk(
  "worktime/getTechUserWorkTime",
  async (openid: string) => {
    const res = await getTechUserWorkTimeApi(openid);
    return res;
  }
);
export const saveTechUserWorkTime = createAsyncThunk(
  "worktime/saveTechUserWorkTime",
  async (params: {
    tech_user_id: string;
    worktime_blocks: TechWorktimeBlock[];
  }) => {
    const res = await saveTechUserWorkTimeApi(params);
    return res;
  }
);

const worktimeSlice = createSlice({
  name: "worktime",
  initialState,
  reducers: {
    clearTechworkTime: (state) => {
      state.worktimeBlocks = [];
    },
    setTechWorkTimeBlocks: (
      state,
      action: PayloadAction<TechWorktimeBlocks>
    ) => {
      state.worktimeBlocks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTechUserWorkTime.pending, (state, action: PayloadAction) => {
        state.loading = true;
      })
      .addCase(
        getTechUserWorkTime.fulfilled,
        (state, action: PayloadAction<TechWorktime[]>) => {
          state.worktimeBlocks = convertToTechBlockTimeBlocks(action.payload);
        }
      )
      .addCase(
        getTechUserWorkTime.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(
      saveTechUserWorkTime.fulfilled,
      (state, action: PayloadAction) => {
        state.loading = false;
      }
    );
  },
});

export const { clearTechworkTime, setTechWorkTimeBlocks } =
  worktimeSlice.actions;

export default worktimeSlice.reducer;
