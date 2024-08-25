export type CartState = {
  cart: Cart;
};

export type SettingsState = {
  hideTabBar: boolean;
};

export type RootState = {
  cartReducer: CartState;
  settingReducer: SettingsState;
};
