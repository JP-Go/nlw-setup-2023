import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDaysFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  ammount: number;
  completed: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);
  useEffect(() => {
    api
      .get("summary")
      .then((response) => setSummary(response.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });
            return (
              <HabitDay
                key={date.toString()}
                date={date}
                initialCompleted={dayInSummary?.completed}
                ammount={dayInSummary?.ammount}
              />
            );
          })}

        {ammountOfDaysToFill > 0 &&
          Array.from({ length: ammountOfDaysToFill }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 w-10 h-10 text-white rounded-lg border-zinc-800 border-2 opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
}
