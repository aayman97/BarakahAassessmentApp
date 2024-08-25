import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "../general/CheckBox";
import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../../helpers/api/ApiFunctions";
import { Image } from "expo-image";

type props = {
  selectedProducts: ProductInCart[];
  item: ProductInCart;
  selectCurrentProduct: (item: ProductInCart) => void;
  index: number;
  decreaseByOne: (index: number) => void;
  increaseByOne: (index: number) => void;
};

const ProductCardForTheCart = ({ selectedProducts, item, selectCurrentProduct, decreaseByOne, increaseByOne, index }: props) => {
  const singleProductQuery = useQuery({
    queryKey: [`single_product_${item.productId}`],
    queryFn: () => getSingleProduct(item.productId),
  });

  if (singleProductQuery.isLoading || singleProductQuery.isError)
    return (
      <View className="flex-row w-full items-center h-[130] mt-10 justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <TouchableOpacity className="flex-row w-full items-center h-[130] mt-10" style={{ gap: 12 }}>
      <View className="h-full items-center justify-center">
        <CheckBox
          checked={selectedProducts.some((product) => {
            return product.productId === item.productId;
          })}
          onPress={() => selectCurrentProduct(item)}
        />
      </View>

      <View className="h-[100] w-[100] bg-light-gray rounded-md items-center justify-center">
        <Image className="w-3/4 h-3/4 rounded-md" source={{ uri: singleProductQuery.data?.data.image }} contentFit="contain" />
      </View>

      <View className="h-[100] justify-between flex-1">
        <Text numberOfLines={2} className="text-lg font-semibold">
          {singleProductQuery.data?.data.title}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-lg">£{singleProductQuery.data?.data.price} </Text>

          <View className="flex-row items-center" style={{ gap: 10 }}>
            <TouchableOpacity
              className="w-[30] h-[30] bg-light-gray items-center justify-center rounded-full"
              onPress={() => {
                decreaseByOne(index);
              }}
            >
              <Text className="font-bold text-xl">-</Text>
            </TouchableOpacity>

            <Text className="font-bold text-xl">{item.quantity}</Text>

            <TouchableOpacity
              className="w-[30] h-[30] bg-light-gray items-center justify-center rounded-full"
              onPress={() => {
                increaseByOne(index);
              }}
            >
              <Text className="font-bold text-xl">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full h-[1px] bg-light-gray absolute bottom-[-20]" />
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardForTheCart;
