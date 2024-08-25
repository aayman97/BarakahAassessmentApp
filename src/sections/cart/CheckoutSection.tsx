import { useCallback, useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import CheckBox from "../../components/general/CheckBox";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { removeElementByIndex } from "../../helpers/removeElementByIndex";
import { debounce } from "lodash";
import ProductCardForTheCart from "../../components/checkout/ProductCardForTheCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../../helpers/api/ApiFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/intialStateType";
import { intializeCart } from "../../store/actions/cartActions";
import { useIsFocused } from "@react-navigation/native";

const CheckoutSection = () => {
  const [selectedProducts, setSelectedProducts] = useState<ProductInCart[]>([]);

  const cartSelector = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationKey: ["product", "checkout"],
    mutationFn: () =>
      addProductToCart({
        products: cartSelector[0].products,
        date: cartSelector[0].date,
        id: cartSelector[0].id,
        userId: cartSelector[0].userId,
      }),
    onSuccess: () => {
      // update cart api
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const debouncedForCallingAPI = useCallback(
    debounce(() => {
      addProductMutation.mutate();
    }, 1000),
    [cartSelector]
  );

  const increaseByOne = useCallback(
    (index: number) => {
      let cartTemp = [...cartSelector];
      cartTemp[0].products[index].quantity++;
      dispatch(intializeCart(cartTemp));
    },

    [cartSelector]
  );

  const decreaseByOne = useCallback(
    (index: number) => {
      let cartTemp = [...cartSelector];

      if (cartTemp[0].products[index].quantity - 1 > 0) {
        cartTemp[0].products[index].quantity--;
        dispatch(intializeCart(cartTemp));
      } else {
        let tempProducts = removeElementByIndex(cartTemp[0].products, index);
        cartTemp[0].products = tempProducts;
        dispatch(intializeCart(cartTemp));
      }
    },
    [cartSelector]
  );

  const selectCurrentProduct = useCallback(
    (item: ProductInCart) => {
      const checkIfAny = selectedProducts.some((product) => {
        return product.productId === item.productId;
      });
      let selectedProductsTemp = [...selectedProducts];

      if (checkIfAny) {
        const index = selectedProducts.findIndex((product) => {
          return product.productId === item.productId;
        });
        setSelectedProducts(removeElementByIndex(selectedProductsTemp, index));
      } else {
        selectedProductsTemp.push(item);
        setSelectedProducts(selectedProductsTemp);
      }
    },
    [selectedProducts]
  );

  useEffect(() => {
    debouncedForCallingAPI();
  }, [cartSelector, debouncedForCallingAPI, isFocused]);

  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-row items-center ">
          <CheckBox
            checked={cartSelector[0].products.length === selectedProducts.length && cartSelector[0].products.length !== 0}
            onPress={() => {
              setSelectedProducts(cartSelector[0].products);
            }}
          />
          <Text className="font-bold text-lg ml-2 ">Select all</Text>
        </View>

        <View className="flex-row ">
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Octicons name="download" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* cards */}

      {cartSelector[0].products && (
        <FlatList
          data={cartSelector[0].products}
          contentContainerStyle={{ paddingBottom: 90 }}
          // keyExtractor={(item, index) => item.id.toString()}
          extraData={cartSelector[0].products}
          renderItem={({ item, index }) => {
            return (
              <ProductCardForTheCart
                index={index}
                item={item}
                selectedProducts={selectedProducts}
                selectCurrentProduct={() => selectCurrentProduct(item)}
                decreaseByOne={() => decreaseByOne(index)}
                increaseByOne={() => increaseByOne(index)}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default CheckoutSection;
