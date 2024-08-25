import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { MainHeader } from "../components/home/MainHeader";
import { SearchInput } from "../components/home/SearchInput";
import { CategoriesSection } from "../sections/home/CategoriesSection";
import { ProductsSection } from "../sections/home/ProductsSection";

const HomeScreen = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView bounces={false}>
        <View className="flex-1 bg-light-gray">
          {/* Top section */}
          <View className="w-full px-4 bg-[#FFFFFF] items-center pb-7 rounded-b-[30px]">
            {/* Header */}
            <MainHeader />

            {/* Search Input */}
            <SearchInput />

            <View className="w-full h-[60px] mt-[20px] bg-[#000000] rounded-[10px]"></View>
          </View>

          {/* Bottom Section */}
          <View className="w-full px-4 bg-[#FFFFFF] items-center pt-7 rounded-t-[30px] mt-2">
            <CategoriesSection />
            <ProductsSection />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
