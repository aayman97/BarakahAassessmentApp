import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CatalogScreen from "./src/screens/CatalogScreen";
import CartScreen from "./src/screens/CartScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import HomeStackNavigator from "./src/navigation/HomeStackNavigator";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "./src/store/configureStore";
import TabBarIcon from "./src/components/general/TabBarIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getCart } from "./src/helpers/api/ApiFunctions";
import { RootState } from "./src/types/intialStateType";
import { useEffect } from "react";
import { intializeCart } from "./src/store/actions/cartActions";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const hideTabbar = useSelector((state: RootState) => state.settingReducer.hideTabBar);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 85,
            display: hideTabbar ? "none" : "flex",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: (props) => {
              return (
                <TabBarIcon
                  focused={props.focused}
                  activeIcon={<Entypo name="home" size={30} color="#C3E600" />}
                  inActiveIcon={<AntDesign name="home" size={30} color="#B4B8BB" />}
                  label="Home"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{
            tabBarIcon: (props) => {
              return (
                <TabBarIcon
                  focused={props.focused}
                  activeIcon={<Ionicons name="document-text-sharp" size={30} color="#C3E600" />}
                  inActiveIcon={<Ionicons name="document-text-outline" size={30} color="#B4B8BB" />}
                  label="Catalog"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: (props) => {
              const cartQuery = useQuery({
                queryKey: ["cart"],
                queryFn: () => getCart(2),
              });

              const dispatch = useDispatch();

              const cart = useSelector((state: RootState) => state.cartReducer.cart);

              useEffect(() => {
                if (cartQuery.data) {
                  dispatch(intializeCart(cartQuery.data.data));
                }
              }, [cartQuery.data]);

              return (
                <View className="w-full items-center justify-center">
                  <TabBarIcon
                    focused={props.focused}
                    activeIcon={<Ionicons name="cart-sharp" size={30} color="#C3E600" />}
                    inActiveIcon={<Ionicons name="cart-outline" size={30} color="#B4B8BB" />}
                    label="Cart"
                  />

                  <View className="absolute rounded-full bg-[#000000] top-1 right-[20%] w-6 h-6 items-center justify-center border-2 border-[#ffffff]">
                    <Text className="text-[#ffffff] text-xs">{cart[0]?.products?.length}</Text>
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoriteScreen}
          options={{
            tabBarIcon: (props) => {
              return (
                <TabBarIcon
                  focused={props.focused}
                  activeIcon={<MaterialIcons name="favorite" size={30} color="#C3E600" />}
                  inActiveIcon={<MaterialIcons name="favorite-border" size={30} color="#B4B8BB" />}
                  label="Favorites"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: (props) => {
              return (
                <TabBarIcon
                  focused={props.focused}
                  activeIcon={<AntDesign name="profile" size={30} color="#C3E600" />}
                  inActiveIcon={<AntDesign name="profile" size={30} color="#B4B8BB" />}
                  label="Profile"
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000,
      },
    },
  });
  useReactQueryDevTools(queryClient);

  return (
    <Provider store={configureStore()}>
      <QueryClientProvider client={queryClient}>
        <TabsNavigator />
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
