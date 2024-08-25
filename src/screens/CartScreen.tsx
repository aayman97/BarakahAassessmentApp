import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import CheckoutSection from "../sections/cart/CheckoutSection";
import MainButton from "../components/general/MainButton";

const CartScreen = () => {
  const HeaderForCart = () => {
    return (
      <SafeAreaView>
        <View className="flex-row w-full items-center justify-between">
          <Text className="font-bold text-[30px]">Cart</Text>

          <TouchableOpacity className="rounded-full bg-light-gray items-center justify-center w-10 h-10">
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const AddressContainer = () => {
    return (
      <TouchableOpacity className="rounded-md bg-light-gray flex-row h-[50px] px-3 justify-between items-center mt-5">
        <View className="flex-row items-center justify-center gap-2">
          <Feather name="map-pin" size={24} color="#B4B8BB" />
          <Text className="font-semibold">92 High Street,London</Text>
        </View>

        <AntDesign name="right" size={24} color="#B4B8BB" />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-light-gray">
      <View className="w-full h-[180] bg-[#ffffff] rounded-b-[30px] px-4">
        <HeaderForCart />
        <AddressContainer />
      </View>

      <View className="w-full flex-1 bg-[#ffffff] rounded-t-[30px] px-4 mt-2 pt-4">
        <CheckoutSection />
      </View>

      <View className="absolute bottom-0 left-0 w-full px-4 bg-[transparent]">
        <MainButton
          onPress={() => {
            console.log("Checkout");
          }}
        >
          <Text className="text-lg font-bold">Checkout</Text>
        </MainButton>
      </View>
    </View>
  );
};

export default CartScreen;
