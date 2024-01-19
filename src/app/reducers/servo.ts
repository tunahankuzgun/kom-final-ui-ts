export interface ServoState {
  direction: string;
}

const initialState: ServoState = {
  direction: "cw",
};

export default function ServoReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_DIRECTION":
      state = { ...state, direction: action.payload };
      break;
    default:
      break;
  }
  return state;
}
