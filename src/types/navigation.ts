import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  ProductDetailsScreen: { product: Product };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;
export type ProductDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProductDetailsScreen">;
