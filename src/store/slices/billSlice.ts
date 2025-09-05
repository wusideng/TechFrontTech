import {
  createBillApi,
  getBenefitDetailsApi,
  getBillByTechSumApi,
} from "@/api/billApi";
import { Bill, BillDetail } from "@/types/Bill";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BillState {
  loading: boolean;
  bill: Bill;
  sum: {
    total_product_unpaid_income?: number;
    total_product_paid_income?: number;
    total_order_count?: number;
    conversion_rate_ratio?: number;
  };
  details: BillDetail[];
}

const initialState: BillState = {
  loading: false,
  bill: null,
  sum: {},
  details: [],
};

// Thunk actions
//createAsyncThunk 参数全局唯一就行，叫什么名字无所谓
export const createBill = createAsyncThunk(
  "bill/createBill",
  async (data: Bill) => {
    const res = await createBillApi(data);
    return res;
  }
);

export const getBillByTechSum = createAsyncThunk(
  "bill/getBillByTechSum",
  async (openid: string) => {
    const res = await getBillByTechSumApi(openid);
    return res;
  }
);

export const getBenefitDetails = createAsyncThunk(
  "bill/getBenefitDetail",
  async (openid: string) => {
    const res = await getBenefitDetailsApi(openid);
    return res;
  }
);

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    clearBenefitDetails: (state) => {
      state.details = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBillByTechSum.pending,
        (state, action: PayloadAction<Bill>) => {
          state.loading = true;
        }
      )
      .addCase(
        getBillByTechSum.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.sum = action.payload;
        }
      )
      .addCase(
        getBillByTechSum.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(
      getBenefitDetails.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.details = action.payload;
      }
    );
    builder
      .addCase(createBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBill.fulfilled, (state, action: PayloadAction<Bill>) => {
        state.loading = false;
        state.bill = action.payload;
      })
      .addCase(createBill.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearBenefitDetails } = billSlice.actions;

export default billSlice.reducer;
