import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDaysFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
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
        {summaryDates.map((date) => {
          return (
            <HabitDay
              key={date.toString()}
              completed={Math.round(Math.random() * 5)}
              ammount={5}
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
