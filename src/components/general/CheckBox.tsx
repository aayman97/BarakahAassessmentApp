import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type props = {
  checked: boolean;
  onPress: () => void;
  className?: string;
};
const CheckBox = ({ checked, onPress, className }: props) => {
  return (
    <TouchableOpacity
      className={`w-7 h-7 items-center justify-center rounded-md ${
        checked ? "bg-light-green-with-blue" : "bg-opacity-0 border-light-gray border-2"
      } ${className}`}
      onPress={onPress}
    >
      {checked && <MaterialIcons name="check" size={24} color="white" />}
    </TouchableOpacity>
  );
};

export default CheckBox;
