import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { Image } from "expo-image";
import MainButton from "../components/general/MainButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { splitTextIntoSentences } from "../helpers/splitSentence";
import { addProductToCart } from "../helpers/api/ApiFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/intialStateType";
import { intializeCart } from "../store/actions/cartActions";

type props = NativeStackScreenProps<RootStackParamList, "ProductDetailsScreen">;

const sentences = splitTextIntoSentences(
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
);

const sentencesLimit = 2;

const ProductDetailsScreen = ({ navigation, route }: props) => {
  const { params } = route;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [moreLeft, setMoreLeft] = React.useState(0);
  const [moreTop, setMoreTop] = React.useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const cart = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationKey: ["product", params.product.id],
    mutationFn: () =>
      addProductToCart({
        products: cart[0].products,
        date: cart[0].date,
        id: cart[0].id,
        userId: cart[0].userId,
      }),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      // update cart api
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateCart = (product: Product) => {
    let cartTemp = [...cart];

    let productTemp = {
      productId: product.id,
      quantity: 1,
    };
    const exists = cartTemp[0].products.some((product) => product.productId === productTemp.productId);
    const index = cartTemp[0].products.findIndex((product) => product.productId === productTemp.productId);

    if (exists) {
      cartTemp[0].products[index].quantity++;
      dispatch(intializeCart(cartTemp));
    } else {
      cartTemp[0].products.push(productTemp);
    }

    addProductMutation.mutate();
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <View className="flex-1">
      {/* product images */}
      <View className="w-full h-1/2 p-3 items-center">
        <Image source={{ uri: params.product.image }} className="w-full h-full" contentFit="contain" />

        {/* header */}
        <SafeAreaView className="w-full h-14 absolute top-[70px]"></SafeAreaView>
      </View>
      <View className="w-full h-1/2 rounded-t-[30px] bg-[#ffffff] px-3 pt-10 ">
        <ScrollView
          contentContainerStyle={{
            backgroundColor: "white",
            paddingBottom: 30,
          }}
          style={{
            height: "50%",
          }}
        >
          {/* product title */}
          <Text className="font-bold text-lg">{params.product.title}</Text>

          {/* reviews,likes,and comments */}
          <View className="w-full flex-row mt-4" style={{ gap: 10 }}>
            <View className="p-1 border-2 flex-row w-fit items-center gap-1 rounded-md border-light-gray">
              <AntDesign name="star" size={24} color="#96CCC3" />
              <Text className="font-bold text-lg">
                4.8 <Text className="font-light text-sm">117 Reviews</Text>
              </Text>
            </View>

            <View className="p-1 border-2 flex-row w-fit items-center gap-1 rounded-md border-light-gray">
              <AntDesign name="like1" size={24} color="#C3E600" />
              <Text className="font-bold text-lg">94%</Text>
            </View>

            <View className="p-1 border-2 flex-row w-fit items-center gap-1 rounded-md border-light-gray">
              <MaterialCommunityIcons name="comment-question" size={24} color="#A2A7A9" />
              <Text className="font-bold text-lg">94%</Text>
            </View>
          </View>

          {/* price */}
          <View className="w-full h-14 bg-light-gray mt-4 rounded-lg flex-row items-center justify-between px-3">
            <View className="flex-row h-full items-center justify-center gap-x-2">
              <Text className="font-bold text-xl">£{params.product.price}</Text>
              <Text className="font-light text-base text-[#A7ACAF]">from £14 per month</Text>
            </View>
            <MaterialIcons name="info-outline" size={24} color="#a7acaf" />
          </View>

          {/* description */}

          <View className="mt-5 mb-5">
            <Text
              numberOfLines={expanded ? undefined : 3}
              ellipsizeMode={"tail"}
              onTextLayout={({ nativeEvent: { lines } }) => {
                const width = lines[lines.length - 1].width;
                const height = lines[lines.length - 1].y;

                setMoreTop(height);
                setMoreLeft(width);
              }}
              className="font-semibold text-[#a7acaf] leading-5"
            >
              {sentences.slice(0, sentencesLimit).join(" ")}
              {!expanded && sentences.length > sentencesLimit ? "..." : " "}
              {expanded ? sentences.slice(sentencesLimit).join(" ") : null}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                position: "absolute",
                left: expanded ? moreLeft : moreLeft - 80,
                top: moreTop,
              }}
              onPress={handleToggle}
            >
              {expanded ? <Text className="font-bold"> Read Less</Text> : <Text className="font-bold"> {"   "}Read more</Text>}
            </TouchableOpacity>
          </View>

          <MainButton
            onPress={() => {
              updateCart(params.product);
            }}
            disabled={loading}
          >
            {loading ? <ActivityIndicator size="large" /> : <Text className="font-bold text-lg">{"Add to cart"}</Text>}
          </MainButton>

          <Text className="self-center mt-4">Delievery on 26 October</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
