import { CartActionTypes } from "../../types/actions";
import { CartState } from "../../types/intialStateType";
import { INTIALIZE_CART } from "../constants/index";

let intialState: CartState = {
  cart: [
    {
      id: 0,
      date: "",
      userId: 0,
      products: [],
    },
  ],
};
const cartReducer = (state = intialState, action: CartActionTypes) => {
  switch (action.type) {
    case INTIALIZE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
