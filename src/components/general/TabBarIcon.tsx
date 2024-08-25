import React, { useEffect } from "react";
import { Text, View } from "react-native";

type props = {
  focused: boolean;
  activeIcon: React.ReactElement;
  inActiveIcon: React.ReactElement;
  label: string;
  extraFunction?: () => void;
};

const TabBarIcon = ({ activeIcon, inActiveIcon, focused, label }: props) => {
  return (
    <View className="w-full items-center justify-center mt-3">
      {focused ? activeIcon : inActiveIcon}
      <Text
        className="mt-1 text-sm font-bold"
        style={{
          color: focused ? "black" : "#B4B8BB",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default TabBarIcon;
