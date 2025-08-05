import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import addressSlice from "./slices/addressSlice";
import billSlice from "./slices/billSlice";
import contractSlice from "./slices/contractSlice";
import orderSlice from "./slices/orderSlice";
import productSlice from "./slices/productSlice";
// import worktimeSlice from "./slices/worktimeSlice";
import userSlice from "./slices/userSlice";
import applyStatusSlice from "./slices/applyStatusSlice";
import routerSlice from "./slices/routerSlice";
import worktimeSlice from "./slices/worktimeSlice";

/**
 * 配置Redux Store
 */
export const store = configureStore({
  reducer: {
    address: addressSlice,
    bill: billSlice,
    contract: contractSlice,
    order: orderSlice,
    product: productSlice,
    // worktimeSlice: worktimeSlice,
    user: userSlice,
    router: routerSlice,
    applyStatus: applyStatusSlice,
    worktime: worktimeSlice,
  },
});

// 从store本身推断RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 导出可重用的hooks，解决类型问题
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
