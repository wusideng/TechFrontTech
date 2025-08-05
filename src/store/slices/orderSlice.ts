import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getTodoOrderCountApi,
  updateOrderStatusApi,
  getOrderDetailApi,
  updateOrderStatusExportApi,
  fetchOrderStatusApi,
} from "@/api/orderApi";
import { OrderStatus } from "@/types/Order";
import { getTechInitialValues } from "./userSlice";

interface OrderState {
  loading: boolean;
  loadingOrderStatus: boolean;
  orders: any[];
  order: any;
  orderStatus: any[];
  error: string | null;
  todoOrderCount: number;
  totalCount: number | null; // orderscount
  pageNumber: number; //orders page number
}

const initialState: OrderState = {
  loading: false,
  loadingOrderStatus: false,
  orders: [],
  order: null,
  orderStatus: [],
  error: null,
  todoOrderCount: 0,
  totalCount: null, // orderscount
  pageNumber: 1, //orders page number
};

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (order_id: string) => {
    const order = await getOrderDetailApi(order_id);
    return order;
  }
);
export const getTodoOrderCount = createAsyncThunk(
  "order/getTodoOrderCount",
  async (user_id: string | number) => {
    const order = await getTodoOrderCountApi(user_id);
    return order;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (orderStatus: OrderStatus) => {
    const order = await updateOrderStatusApi(orderStatus);
    return order;
  }
);
export const updateOrderStatusExport = createAsyncThunk(
  "order/updateOrderStatusExport",
  async ({
    formData,
    orderStatus,
  }: {
    formData: FormData;
    orderStatus: OrderStatus;
  }) => {
    const order = await updateOrderStatusExportApi(formData, orderStatus);
    return order;
  }
);
export const getOrderStatus = createAsyncThunk(
  "order/getOrderStatus",
  async (order_id: number) => {
    const order = await fetchOrderStatusApi(order_id);
    return order;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{
        totalCount: number | null;
        data: any[];
        pageNumber: number;
      }>
    ) => {
      state.orders = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
    },

    clearOrderDetail: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTechInitialValues.fulfilled, (state, action) => {
      state.todoOrderCount = action.payload.todoOrderCount;
    });
    builder.addCase(getOrder.fulfilled, (state, action: PayloadAction<any>) => {
      // 处理成功状态和数据
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(getTodoOrderCount.fulfilled, (state, action: any) => {
      state.todoOrderCount = action.payload;
    });
    builder
      .addCase(getOrderStatus.pending, (state, action: any) => {
        state.loadingOrderStatus = true;
      })
      .addCase(getOrderStatus.fulfilled, (state, action: any) => {
        state.orderStatus = action.payload;
        state.loadingOrderStatus = false;
      })
      .addCase(getOrderStatus.rejected, (state, action: any) => {
        state.loadingOrderStatus = false;
      });
    builder.addCase(
      updateOrderStatus.fulfilled,
      (state, action: PayloadAction<any>) => {
        // 处理成功状态和数据
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getOrder.pending,
        getTodoOrderCount.pending,
        updateOrderStatus.pending,
        updateOrderStatusExport.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getOrder.rejected,
        getTodoOrderCount.rejected,
        updateOrderStatus.rejected,
        updateOrderStatusExport.rejected
      ),
      (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      }
    );
  },
});

export const { clearOrderDetail, setOrders } = orderSlice.actions;

export default orderSlice.reducer;
