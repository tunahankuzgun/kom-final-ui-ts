export interface TcpState {
  tcpDirection: string;
  error: number;
  tcpPosition: [pos: number];
  tcpTorque: number;
  tcpVelocity: number;
}

const initialState: TcpState = {
  tcpDirection: "cw",
  error: 0,
  tcpPosition: [0],
  tcpTorque: 0,
  tcpVelocity: 0,
};

export default function TcpReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_TCP_DIRECTION":
      state = { ...state, tcpDirection: action.payload };
      break;
    case "SET_TCP_ERROR":
      state = { ...state, error: action.payload };
      break;
    case "SET_TCP_POSITION":
      state = { ...state, tcpPosition: action.payload };
      break;
    case "SET_TCP_TORQUE":
      state = { ...state, tcpTorque: action.payload };
      break;
    case "SET_TCP_VELOCITY":
      state = { ...state, tcpVelocity: action.payload };
      break;
    default:
      break;
  }
  return state;
}
