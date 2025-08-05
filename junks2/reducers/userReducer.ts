// src/reducers/productReducer.js
import {
  COMMON_USER_REQUEST,
  COMMON_USER_FAILURE,
  LOAD_TECHUSER_SUCCESS,
  LOAD_ADDRESS_SUCCESS,
  LOAD_WXUSERINFO_SUCCESS,
  LOAD_GETWORKTIME_SUCCESS,
  LOAD_SAVEWORKTIME_SUCCESS,
  LOAD_JSAPITICKET_SUCCESS,
  LOAD_MOCKLBSADDRESS_SUCCESS,
  LOAD_PATHANALYSIS_SUCCESS,
  LOAD_WECHATLOGIN_SUCCESS,
  LOAD_UPDATE_USERPHONE_SUCCESS,
  SET_DEVICE,
  SET_WX_CODE,
  SET_ACCESS_TOKEN,
  SET_WX_USER,
  SET_COORD,
  SET_MOCK_USER,
  SET_MOCK_WX_USER,
  SET_MOCK_USER_PHONE,
} from "junks/actions/userAction";

import {
  COMMON_APPLY_REQUEST,
  LOAD_APPLY_STATUSES_SUCCESS,
  COMMON_APPLY_FAILURE,
} from "junks/actions/applyAction";

const initialState = {
  loading: false,

  user: {
    openid: "",
    user_nickname: "",
    user_sex: "",
    work_phone: "",
    user_phone: "",
    photo_work: "",
  },
  code: "",
  access_token: "",
  wxuser: {
    openid: "",
    headimgurl: "",
    nickname: "未登陆",
  },
  tech_address: {
    work_city: "登录获取",
  },
  tech_worktime: [],
  wxcoord: { lon: 0, lat: 0 },
  applyStatus: [],
  mockaddress: {},
  pathanalysis: {
    taxi_cost: 0,
    paths: [
      {
        distance: 0,
      },
    ],
  },
  wx_api_ticket: {},
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMON_USER_REQUEST:
    case COMMON_APPLY_REQUEST:
      return { ...state, loading: true, error: null };
    case COMMON_USER_FAILURE:
    case COMMON_APPLY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOAD_TECHUSER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOAD_APPLY_STATUSES_SUCCESS:
      return { ...state, loading: false, applyStatus: action.payload };
    case LOAD_WXUSERINFO_SUCCESS:
      return { ...state, loading: false, wxuser: action.payload };
    case LOAD_SAVEWORKTIME_SUCCESS:
    case LOAD_GETWORKTIME_SUCCESS:
      return { ...state, loading: false, tech_worktime: action.payload };
    case LOAD_JSAPITICKET_SUCCESS:
      return { ...state, loading: false, wx_api_ticket: action.payload };
    case LOAD_ADDRESS_SUCCESS:
      return { ...state, loading: false, tech_address: action.payload };
    case LOAD_MOCKLBSADDRESS_SUCCESS:
      return { ...state, loading: false, mockaddress: action.payload };
    case LOAD_PATHANALYSIS_SUCCESS:
      return { ...state, loading: false, pathanalysis: action.payload };
    case LOAD_WECHATLOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOAD_UPDATE_USERPHONE_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case SET_DEVICE:
      return { ...state, loading: false, device: action.payload };
    case SET_WX_CODE:
      return { ...state, loading: false, code: action.payload };
    case SET_ACCESS_TOKEN:
      return { ...state, loading: false, access_token: action.payload };
    case SET_WX_USER:
      return { ...state, loading: false, wxuser: action.payload };
    case SET_COORD:
      return { ...state, loading: false, wxcoord: action.payload };
    case SET_MOCK_USER:
    case SET_MOCK_USER_PHONE:
      console.log("SET_MOCK_USER_PHONE:", action.payload);
      return { ...state, loading: false, user: action.payload };
    case SET_MOCK_WX_USER:
      return { ...state, loading: false, wxuser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
