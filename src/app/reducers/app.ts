export interface AppState {
  apiConnected: boolean;
  authorized: boolean;
  loading: boolean;
}

const initialState: AppState = {
  apiConnected: false,
  authorized: false,
  loading: false,
};

export default function AppReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_APP_AUTHORIZED":
      state = { ...state, authorized: true };
      break;
    case "RESET_APP_AUTHORIZED":
      state = { ...state, authorized: false };
      break;
    case "SET_API_CONNECTED":
      state = { ...state, apiConnected: true };
      break;
    case "RESET_API_CONNECTED":
      state = { ...state, apiConnected: false, loading: true };
      break;
    // case "SET_APP_LOADING":
    //   state = { ...state, loading: true };
    //   break;
    // case "RESET_APP_LOADING":
    //   state = { ...state, loading: false };
    //   break;
    default:
      break;
  }
  return state;
}
