import {
  addTechAddressApi,
  deleteTechAddressApi,
  getTechAddressesApi,
  getTechDefaultAddressApi,
  getTechUserHistoryLocalApi,
  updateTechAddressApi,
} from "@/api/addressApi";
import { Address, EmptyTechAddress } from "@/types/Address";
import { POIformatted } from "@/types/AddressManagement";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTechInitialValues } from "./userSlice";

interface AddressState {
  loadingTechAddresses: boolean;
  loadingTechDefaultAddress: boolean;
  address: POIformatted | null;
  defaultTechAddress: Address | null | undefined;
  locationPermissionOn: null | boolean;
  historyLocal: any[];
  selectedPoi: POIformatted | null; // 用户选择的POI
  techAddresses: Address[] | null;
  techEditedAddress: Address | null;
  error: string | null;
}

const initialState: AddressState = {
  // loading: false,
  address: null,
  loadingTechAddresses: false,
  loadingTechDefaultAddress: false,
  locationPermissionOn: null,
  historyLocal: [],
  defaultTechAddress: undefined,
  selectedPoi: null,
  techAddresses: null,
  techEditedAddress: EmptyTechAddress,
  error: null,
};

// Thunk actions
//createAsyncThunk 参数全局唯一就行，叫什么名字无所谓
export const getTechUserHistoryLocal = createAsyncThunk(
  "address/getTechUserHistoryLocal",
  async ({
    openid,
    pageNum,
    pageSize,
  }: {
    openid: string;
    pageNum: number;
    pageSize: number;
  }) => {
    const res = await getTechUserHistoryLocalApi(openid, pageNum, pageSize);
    return res;
  }
);

// Async Thunks
export const getTechAddresses = createAsyncThunk<Address[], string>(
  "address/getTechAddresses",
  async (openid: string) => {
    const response = await getTechAddressesApi(openid);
    return response;
  }
);

export const getTechDefaultAddress = createAsyncThunk(
  "address/getTechDefaultAddress",
  async (openid: string) => {
    const response = await getTechDefaultAddressApi(openid);
    return response;
  }
);

export const addTechAddress = createAsyncThunk(
  "addressManagement/addTechAddress",
  async (address: Address) => {
    const response = await addTechAddressApi(address);
    return response;
  }
);

export const updateTechAddress = createAsyncThunk(
  "addressManagement/updateTechAddress",
  async (params: { addressId: number; address: Address }) => {
    const response = await updateTechAddressApi(
      params.addressId,
      params.address
    );
    return response;
  }
);

export const deleteTechAddress = createAsyncThunk(
  "addressManagement/deleteTechAddress",
  async (addressId: number) => {
    await deleteTechAddressApi(addressId);
    return addressId;
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    selectPoi: (state, action: PayloadAction<POIformatted>) => {
      state.selectedPoi = action.payload;
    },
    setGaodeAddress: (state, action: PayloadAction<POIformatted>) => {
      const address = action.payload;
      state.address = {
        ...address,
        address:
          address.province +
          address.city +
          address.district +
          address.street +
          address.region,
      };
    },
    setLocationPermissionOn: (state, action: PayloadAction<boolean>) => {
      state.locationPermissionOn = action.payload;
    },
    setEditedAddress: (state, action: PayloadAction<Address>) => {
      state.techEditedAddress = action.payload;
    },
    clearEditedAddress: (state) => {
      state.techEditedAddress = EmptyTechAddress;
      state.selectedPoi = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTechInitialValues.fulfilled, (state, action) => {
      state.defaultTechAddress = action.payload.defaultAddress;
    });
    builder
      .addCase(getTechAddresses.pending, (state) => {
        state.loadingTechAddresses = true;
      })
      .addCase(
        getTechAddresses.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loadingTechAddresses = false;
          state.techAddresses = action.payload;
        }
      )
      .addCase(getTechAddresses.rejected, (state) => {
        state.loadingTechAddresses = false;
      });
    builder
      .addCase(getTechDefaultAddress.pending, (state) => {
        state.loadingTechDefaultAddress = true;
      })
      .addCase(getTechDefaultAddress.fulfilled, (state, action) => {
        state.loadingTechDefaultAddress = false;
        state.defaultTechAddress = action.payload ? action.payload : null;
        // Handle default address logic here
        state.error = null;
      })
      .addCase(getTechDefaultAddress.rejected, (state, action) => {
        state.loadingTechDefaultAddress = false;
        state.error = action.error.message || "Failed to fetch default address";
      });

    builder.addCase(
      addTechAddress.fulfilled,
      (state, action: PayloadAction<Address>) => {
        if (!state.techAddresses) {
          state.techAddresses = [action.payload];
        } else {
          state.techAddresses.push(action.payload);
        }
        state.error = null;
      }
    );

    builder.addCase(updateTechAddress.fulfilled, (state, action) => {
      const index = state.techAddresses.findIndex(
        (addr) => addr.id === action.payload.id
      );
      if (index !== -1) {
        state.techAddresses[index] = action.payload;
      }
      state.error = null;
    });
    builder.addCase(deleteTechAddress.fulfilled, (state, action) => {
      state.techAddresses = state.techAddresses.filter(
        (addr) => addr.id !== action.payload
      );
      state.error = null;
    });
  },
});

export const {
  setGaodeAddress,
  setLocationPermissionOn,
  selectPoi,
  setEditedAddress,
  clearEditedAddress,
} = addressSlice.actions;
addressSlice.actions;

export default addressSlice.reducer;
