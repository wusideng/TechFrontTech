import {
  COMMON_POSITION_REQUEST,
  COMMON_POSITION_FAILURE,
  LOAD_HISTORYLOCAL_SUCCESS,
  LOAD_LBSADDRESSPOI_SUCCESS,
} from "junks/actions/positionAction";

const initialState = {
  loading: false,
  pois: [],
  historyLocal: [],
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMON_POSITION_REQUEST:
      return { ...state, loading: true, error: null };
    case COMMON_POSITION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOAD_HISTORYLOCAL_SUCCESS:
      return { ...state, loading: false, historyLocal: action.payload };
    case LOAD_LBSADDRESSPOI_SUCCESS:
      return { ...state, loading: false, pois: action.payload };
    default:
      return state;
  }
};

export default commonReducer;
