import {
  fetchContractStatusApi,
  submitDealerContractApi,
  submitLawContractApi,
  submitPortraitContractApi,
  submitTrainingContractApi,
} from "@/api/contractApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContractState {
  loading: boolean;
  error: string | null;
  status: string;
  contractFile: any;
}

const initialState: ContractState = {
  loading: false,
  error: null,
  status: "pending",
  contractFile: null,
};

// Thunk actions
//createAsyncThunk 参数全局唯一就行，叫什么名字无所谓
export const submitContract = createAsyncThunk(
  "contract/submitcontract",
  async ({ data, contract_type }: { data: any; contract_type: string }) => {
    let res;
    switch (contract_type) {
      case "portrait":
        res = await submitPortraitContractApi(data);
        break;
      case "law":
        res = await submitLawContractApi(data);
        break;
      case "dealer":
        res = await submitDealerContractApi(data);
        break;
      case "training":
        res = await submitTrainingContractApi(data);
        break;
    }
    return res;
  }
);

export const fetchContractStatus = createAsyncThunk(
  "contract/fetchContractStatus",
  async ({
    openid,
    contract_type,
  }: {
    openid: string;
    contract_type: string;
  }) => {
    const res = await fetchContractStatusApi(openid, contract_type);
    return res;
  }
);
const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    clearContractStatus: (state) => {
      state.status = "pending";
      state.contractFile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContract.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        submitContract.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.status = "apply";
          state.contractFile = action.payload;
          state.error = null;
        }
      )
      .addCase(submitContract.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
      });
    builder
      .addCase(fetchContractStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContractStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (typeof action.payload === "string") {
          state.status = action.payload;
        } else {
          state.status = (action.payload as any).status;
          state.contractFile = action.payload;
        }
      })
      .addCase(fetchContractStatus.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearContractStatus } = contractSlice.actions;

export default contractSlice.reducer;
