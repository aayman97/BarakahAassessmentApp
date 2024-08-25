import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { View, TextInput } from "react-native";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <View className="w-full h-[60] bg-light-gray mt-[30] rounded-lg flex-row items-center justify-center px-2">
      <Feather name="search" size={30} color="#A1A7AA" />
      <TextInput
        placeholder="Search the entire shop"
        className={`text-[#A1A7AA] ml-2 max-w-[85%] text-[20px] font-semibold h-full`}
        placeholderTextColor={"#A1A7AA"}
      />
    </View>
  );
};
