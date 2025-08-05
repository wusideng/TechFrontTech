// src/reducers/productReducer.js
import {
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  LOAD_TECHPRODUCT_REQUEST,
  LOAD_TECHPRODUCT_SUCCESS,
  LOAD_TECHPRODUCT_FAILURE,
  LOAD_PRODUCTDETAIL_REQUEST,
  LOAD_PRODUCTDETAIL_SUCCESS,
  LOAD_PRODUCTDETAIL_FAILURE,
} from "junks/actions/productAction";

const initialState = {
  loading: false,
  products: [],
  techProducts: [],
  product: {},
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_REQUEST:
    case LOAD_TECHPRODUCT_REQUEST:
    case LOAD_PRODUCTDETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: action.payload.data };
    case LOAD_TECHPRODUCT_SUCCESS:
      return { ...state, loading: false, techProducts: action.payload };
    case LOAD_PRODUCTDETAIL_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case LOAD_PRODUCT_FAILURE:
    case LOAD_TECHPRODUCT_FAILURE:
    case LOAD_PRODUCTDETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
