export interface NavbarState {
  opened: boolean;
}

const initialState: NavbarState = {
  opened: false,
};

export default function NavbarReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_NAVBAR_OPEN":
      state = { ...state, opened: action.payload };
      break;
    default:
      break;
  }
  return state;
}
