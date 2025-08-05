// import {
//   LOAD_ORDERS_REQUEST,
//   LOAD_ORDERS_SUCCESS,
//   LOAD_ORDERS_FAILURE,
//   LOAD_ORDER_REQUEST,
//   LOAD_ORDER_SUCCESS,
//   LOAD_ORDER_FAILURE,
//   LOAD_UPDATEORDER_REQUEST,
//   LOAD_UPDATEORDER_SUCCESS,
//   LOAD_UPDATEORDER_FAILURE,
//   LOAD_FETCHORDERSTATUS_REQUEST,
//   LOAD_FETCHORDERSTATUS_SUCCESS,
//   LOAD_FETCHORDERSTATUS_FAILURE,
// } from "@/actions/orderAction";

// const initialState = {
//   loading: false,
//   error: null,
//   orders: [],
//   order: {
//     client: {},
//     order_products: [],
//   },
//   orderStatus: [
//     {
//       order_status_photo: "",
//     },
//   ],
// };

// const commonReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_ORDERS_REQUEST:
//     case LOAD_ORDER_REQUEST:
//     case LOAD_UPDATEORDER_REQUEST:
//     case LOAD_FETCHORDERSTATUS_REQUEST:
//       return { ...state, loading: true, error: null };
//     case LOAD_ORDERS_SUCCESS:
//       return { ...state, loading: false, orders: action.payload };
//     case LOAD_ORDER_SUCCESS:
//       return { ...state, loading: false, order: action.payload };
//     case LOAD_UPDATEORDER_SUCCESS:
//       return { ...state, loading: false };
//     case LOAD_FETCHORDERSTATUS_SUCCESS:
//       return { ...state, loading: false, orderStatus: action.payload };
//     case LOAD_ORDERS_FAILURE:
//     case LOAD_ORDER_FAILURE:
//     case LOAD_UPDATEORDER_FAILURE:
//     case LOAD_FETCHORDERSTATUS_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default commonReducer;
