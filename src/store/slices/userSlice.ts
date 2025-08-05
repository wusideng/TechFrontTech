import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  fetchUserInfoByOpenId,
  fetchUserInfoByWxCode,
  getTechInitialValuesApi,
  // updateUserPhoneApi,
} from "@/api/userApi";
import { TechUser } from "@/types/TechUser";
import mockUserPhone from "@/lib/mockUserPhonehd.json";
import { deleteCookie } from "@/util/utils";
import { createApplyStatus } from "./applyStatusSlice";

interface UserState {
  loadingUser: boolean;
  loadUserInfoFailure: boolean;
  user: TechUser | null;
  // code: string;
  // access_token: string;
  error: any;
}

const initialState: UserState = {
  loadingUser: false,
  loadUserInfoFailure: false,
  user: null,
  // code: null,
  // code: "",
  // access_token: "",
  error: null,
};

export const getUserInfoByWxCode = createAsyncThunk(
  "user/getUserInfoByWxCode",
  async (params: { code: string }) => {
    const { code } = params;
    const user = await fetchUserInfoByWxCode(code);
    return user;
  }
);
export const getTechInitialValues = createAsyncThunk(
  "techUser/getTechInitialValues",
  async ({ openid, user_id }: { openid: string; user_id: number }) => {
    const res = await getTechInitialValuesApi(openid, user_id);
    return res;
  }
);

export const getUserInfoByOpenId = createAsyncThunk(
  "user/getUserInfoByOpenId",
  async () => {
    const user = await fetchUserInfoByOpenId();
    return user;
  }
);

// export const updateUserPhone = createAsyncThunk(
//   "user/updateUserPhone",
//   async (param: any) => {
//     const user = await updateUserPhoneApi(param);
//     return user;
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<ClientUser>) => {
    //   state.loadingUser = false;
    //   state.user = action.payload;
    // },
    // setAccessToken: (state, action: PayloadAction<string>) => {
    //   state.access_token = action.payload;
    // },
    // setInviteCode: (state, action: PayloadAction<string>) => {
    //   state.invite_code = action.payload;
    // },
    setMockUser: (state) => {
      state.user = mockUserPhone as TechUser;
    },

    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder;
    // .addCase(updateUserPhone.pending, (state) => {
    //   state.loadingUser = true;
    //   state.error = null;
    // })
    // .addCase(
    //   updateUserPhone.fulfilled,
    //   (state, action: PayloadAction<TechUser>) => {
    //     state.loadingUser = false;
    //     state.user = action.payload;
    //   }
    // )
    // .addCase(updateUserPhone.rejected, (state, action) => {
    //   state.loadingUser = false;
    //   state.error = action.error.message;
    // });
    builder.addCase(createApplyStatus.fulfilled, (state, action) => {
      const applyStatus = action.payload.data.apply_status;
      const applyType = action.payload.data.apply_type;
      if (applyType == "tech_join") {
        state.user.joinStatus = applyStatus;
      }
    });
    builder
      .addMatcher(
        isAnyOf(getUserInfoByWxCode.pending, getUserInfoByOpenId.pending),
        (state) => {
          state.loadingUser = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(getUserInfoByWxCode.fulfilled, getUserInfoByOpenId.fulfilled),
        (state, action) => {
          deleteCookie("openid");
          document.cookie = `openid=${action.payload.openid}; path=/; max-age=7200; domain=${window.location.hostname}`;
          state.loadingUser = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(getUserInfoByWxCode.rejected, getUserInfoByOpenId.rejected),
        (state, action) => {
          deleteCookie("openid");
          state.loadingUser = false;
          state.error = action.error.message;
          state.loadUserInfoFailure = true;
        }
      );
  },
});

export const {
  // setUser,
  // setAccessToken,
  // setInviteCode,
  setMockUser,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
