import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../helpers/api/ApiFunctions";
import { ActivityIndicator, TouchableOpacity, View, Text, Image } from "react-native";
import { ProductCard } from "../../components/home/ProductCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../helpers/formatTime";

export const ProductsSection = () => {
  const [timeLeft, setTimeLeft] = useState<number>(3 * 60 * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    // Start the countdown
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Stop the timer when time is up
          clearInterval(intervalRef.current as NodeJS.Timeout);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (productsQuery.isLoading || productsQuery.data === null)
    return (
      <View className="h-[800px]">
        <ActivityIndicator size={"large"} />
      </View>
    );

  const { data } = productsQuery;

  return (
    <>
      {/* title and button */}
      <View className="w-full flex-row items-center justify-between mt-5">
        <View className="flex-row gap-1 items-center">
          <Text className="font-bold text-[25px]">Flash Sale</Text>
          <View className="h-[30px] w-[100] bg-light-green rounded-md items-center justify-center">
            <Text className="font-semibold">{formatTime(timeLeft)}</Text>
          </View>
        </View>

        <TouchableOpacity className="flex-row items-center justify-center gap-1">
          <Text>See all</Text>

          <View>
            <FontAwesome6 name="angle-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {data && (
        <View className="w-full flex-row flex-wrap pb-16">
          {data.data.map((item, index) => {
            return <ProductCard product={item} index={index} key={item.id} />;
          })}
        </View>
      )}
    </>
  );
};
