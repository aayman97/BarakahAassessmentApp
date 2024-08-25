import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";

export const MainHeader = () => {
  return (
    <SafeAreaView className="flex-row items-center justify-between w-full">
      <TouchableOpacity className="w-[50] h-[50] rounded-full bg-light-green items-center justify-center">
        <MaterialCommunityIcons name="sale" size={24} color="black" />
      </TouchableOpacity>

      <View className="items-center justify-center">
        <Text className="font-light">Delievery Address</Text>
        <Text className="font-bold text-[20px] m-[5]">92 High Street, London</Text>
      </View>

      <TouchableOpacity className="w-[50] h-[50] rounded-full bg-light-gray items-center justify-center">
        <View className="w-[17] h-[17] rounded-full bg-light-green-with-blue border-2 border-[white] absolute top-[-3] right-[0]" />
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
