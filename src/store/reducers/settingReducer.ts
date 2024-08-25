import { SettingsActionTypes } from "../../types/actions";
import { SettingsState } from "../../types/intialStateType";
import { HIDE_TABBAR } from "../constants";

let intialState: SettingsState = {
  hideTabBar: false,
};

const settingReducer = (state = intialState, action: SettingsActionTypes) => {
  switch (action.type) {
    case HIDE_TABBAR:
      return {
        ...state,
        hideTabBar: action.payload,
      };
    default:
      return state;
  }
};

export default settingReducer;
