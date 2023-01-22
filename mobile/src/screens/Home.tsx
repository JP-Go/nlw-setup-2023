import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";
import { useCallback, useState } from "react";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning";
import { api } from '../lib/axios'
import { Loading } from '../components/Loading'
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const daysFromYearStart = generateDaysFromYearBeginning();
const minimunSummaryDatesSize = 18 * 5;
const ammountOfDaysToFill = minimunSummaryDatesSize - daysFromYearStart.length;

type Summary = {
  id: string,
  date: string,
  ammount: number,
  completed: number
}[]

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<Summary | null>(null)

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/summary');
      setSummary(response.data)
    } catch (err) {
      console.error(err);
      Alert.alert('Não foi possivel carregar o sumário de hábitos')
    } finally {
      setLoading(false)
    }

  }
  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))


  if (loading) {
    return <Loading />
  }

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
        {summary &&
          <View className="flex-row flex-wrap">
            {daysFromYearStart.map((date) => {
              const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'))
              return <HabitDay
                key={date.toISOString()}
                date={date}
                ammount={dayInSummary?.ammount}
                completed={dayInSummary?.completed}
                onPress={() => navigate("habit", { date: date.toISOString() })}
              />
            })}
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
        }
      </ScrollView>
    </View>
  );
}
