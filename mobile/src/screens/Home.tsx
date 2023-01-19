import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const daysFromYearStart = generateDaysFromYearBeginning();
const minimunSummaryDatesSize = 18 * 5;
const ammountOfDaysToFill = minimunSummaryDatesSize - daysFromYearStart.length;

export function Home() {
  const { navigate } = useNavigation();
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 mx-1 font-bold text-xl text-center"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {daysFromYearStart.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}
          {ammountOfDaysToFill > 0 &&
            Array.from({ length: ammountOfDaysToFill }).map((_, i) => {
              return (
                <View
                  key={i}
                  className="bg-zinc-900 m-1 rounded-lg border-2 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
