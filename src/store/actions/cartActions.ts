import { INTIALIZE_CART } from "../constants";

export function intializeCart(cart: Cart) {
  return {
    type: INTIALIZE_CART,
    payload: cart,
  };
}
