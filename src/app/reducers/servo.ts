export interface ServoState {
  rtuDirection: string;
  tcpDirection: string;
}

const initialState: ServoState = {
  rtuDirection: "cw",
  tcpDirection: "cw",
};

export default function ServoReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_RTU_DIRECTION":
      state = { ...state, rtuDirection: action.payload };
      break;
    case "SET_TCP_DIRECTION":
      state = { ...state, tcpDirection: action.payload };
      break;
    default:
      break;
  }
  return state;
}
