import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductDetail,
  fetchProducts,
  fetchProductsByTech,
} from "@/api/productApi";
import { Product, Products } from "@/types/Product";
import { getTechInitialValues } from "./userSlice";

interface ProductState {
  loading: boolean;
  products: Product[];
  techProducts: Products;
  product: Product | null;
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  techProducts: [],
  product: null,
  error: null,
};

// Thunk actions
//createAsyncThunk 参数全局唯一就行，叫什么名字无所谓
export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const { data } = await fetchProducts();
  return data;
});
export const getProductsByTech = createAsyncThunk(
  "product/getProductsbyTech",
  async (tech_id: string | number) => {
    const data = await fetchProductsByTech(tech_id);
    return data;
  }
);
export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (productId: number) => {
    const data = await fetchProductDetail(productId);
    return data;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    clearProductDetail: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTechInitialValues.fulfilled, (state, action) => {
      state.techProducts = action.payload.techProducts;
      state.products = action.payload.products;
    });
    builder
      .addCase(getProducts.pending, (state) => {
        // 处理加载状态
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<Products>) => {
          // 处理成功状态和数据
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
    builder
      .addCase(getProductDetail.pending, (state) => {
        // 处理加载状态
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductDetail.fulfilled,
        (state, action: PayloadAction<Product>) => {
          // 处理成功状态和数据
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(getProductDetail.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
    builder
      .addCase(getProductsByTech.pending, (state) => {
        // 处理加载状态
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductsByTech.fulfilled,
        (state, action: PayloadAction<Products>) => {
          // 处理成功状态和数据
          state.loading = false;
          state.techProducts = action.payload;
        }
      )
      .addCase(getProductsByTech.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { selectProduct, clearProductDetail } = productSlice.actions;

export default productSlice.reducer;
