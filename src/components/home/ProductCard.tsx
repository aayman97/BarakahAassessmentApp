import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/navigation";

const { width, height } = Dimensions.get("screen");
type ProductCardProps = {
  product: Product;
  index: number;
};

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const onPress = useCallback(() => {
    navigation.navigate("ProductDetailsScreen", {
      product: product,
    });
  }, []);
  const ProductImage = useCallback(() => {
    return (
      <View className="flex justify-center items-center bg-light-gray rounded-[25%] h-[70%] w-full">
        <Image className="w-2/3 h-2/3" source={{ uri: product.image }} contentFit="contain" />
      </View>
    );
  }, []);
  return (
    <TouchableOpacity className={`w-[48%] h-[250px] ${index % 2 !== 0 ? "ml-[3%]" : "ml-0"}  mt-[30px]`} onPress={onPress}>
      <ProductImage />
      <View className="px-1">
        <Text numberOfLines={2} className="font-bold text-base mt-[10]">
          {product.title}
        </Text>

        <View className="flex-row justify-between mt-3 items-center">
          <Text className="text-xl font-bold">€{product.price}</Text>
          <Text className="text-sm text-[#AFB3B7] font-bold line-through">€{(parseInt(product.price) * 1.1).toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
