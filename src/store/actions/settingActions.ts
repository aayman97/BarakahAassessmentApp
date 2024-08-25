import { HIDE_TABBAR } from "../constants";

export function hideTabbar(payload: boolean) {
  return {
    type: HIDE_TABBAR,
    payload: payload,
  };
}
