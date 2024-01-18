export interface LoginState {
  alertVisible: boolean;
  alertVariant: string;
  alertMessage: string;
  bootTime: string;
  loading: boolean;
}

const initialState: LoginState = {
  alertVisible: false,
  alertVariant: "info",
  alertMessage: "",
  bootTime: "",
  loading: false,
};

export default function LoginReducer(state = initialState, action: any) {
  switch (action.type) {
    case "LOGIN":
      state = { ...state, alertVisible: false };
      break;
    case "LOGIN_LOADING":
      state = { ...state, loading: true };
      break;
    case "LOGIN_OK":
      state = { ...state, alertVisible: false, loading: false };
      break;
    case "LOGIN_FAILED":
      state = {
        ...state,
        alertVisible: true,
        alertMessage: action.payload,
        alertVariant: "error",
        loading: false,
      };
      break;

    case "LOGOUT":
      state = {
        ...state,
        alertVisible: true,
        alertMessage: action.payload,
        alertVariant: "success",
        loading: false,
      };
      break;
    case "SET_BOOT_TIME":
      state = { ...state, bootTime: action.payload };
      break;
    default:
      break;
  }
  return state;
}
