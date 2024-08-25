import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useQuery } from "@tanstack/react-query";
import { View, ActivityIndicator, TouchableOpacity, FlatList, Text } from "react-native";
import { getCategories } from "../../helpers/api/ApiFunctions";

export const CategoriesSection = () => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data, isLoading } = categoriesQuery;

  return (
    <View className="w-full">
      {isLoading || data === null ? (
        <View className="h-[100]">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <>
          {/* title and button */}
          <View className="w-full flex-row items-center justify-between">
            <Text className="font-bold text-[25px]">Categories</Text>

            <TouchableOpacity className="flex-row items-center justify-center gap-1">
              <Text>See all</Text>

              <View>
                <FontAwesome6 name="angle-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Categories list */}

          {data && (
            <FlatList
              data={data.data}
              horizontal
              className="mt-7"
              keyExtractor={(item) => item}
              ItemSeparatorComponent={() => {
                return <View className="w-[20]" />;
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity className="items-center gap-2 w-30 ">
                    <View className="w-16 h-16 rounded-full bg-light-gray items-center justify-center">
                      <Fontisto name="laptop" size={24} color="black" />
                    </View>

                    <Text numberOfLines={2} className="capitalize max-w-[75] text-center">
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
};
