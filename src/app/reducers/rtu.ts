export interface RtuState {
  rtuDirection: string;
  current: number;
  frequency: number;
  torque: number;
}

const initialState: RtuState = {
  rtuDirection: "cw",
  current: 0,
  frequency: 0,
  torque: 0,
};

export default function RtuReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_RTU_DIRECTION":
      state = { ...state, rtuDirection: action.payload };
      break;
    case "SET_RTU_CURRENT":
      state = { ...state, current: action.payload };
      break;
    case "SET_RTU_FREQUENCY":
      state = { ...state, frequency: action.payload };
      break;
    case "SET_RTU_TORQUE":
      state = { ...state, torque: action.payload };
      break;
    default:
      break;
  }
  return state;
}
