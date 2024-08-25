import { INTIALIZE_CART, HIDE_TABBAR } from "../store/constants";

interface AddToCartAction {
  type: typeof INTIALIZE_CART;
  payload: Product;
}

interface HideTabBar {
  type: typeof HIDE_TABBAR;
  payload: boolean;
}

export type CartActionTypes = AddToCartAction;

export type SettingsActionTypes = HideTabBar;
