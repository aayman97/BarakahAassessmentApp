import React from "react";
import { TouchableOpacity } from "react-native";

type props = {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const MainButton = ({ children, onPress, disabled = false }: props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={`w-full h-14 ${disabled ? "bg-light-gray" : "bg-light-green"} rounded-lg items-center justify-center`}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default MainButton;
