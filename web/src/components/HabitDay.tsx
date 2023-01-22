import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

export type HabitDayProps = {
  initialCompleted?: number;
  ammount?: number;
  date: Date;
};

export function HabitDay({
  ammount = 0,
  initialCompleted = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const completedPercentage =
    ammount > 0 ? Math.round((completed / ammount) * 100) : 0;

  function handleCompletedChange(completed: number) {
    setCompleted(completed);
  }

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");
  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 text-white rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-900 border-zinc-800 ": completedPercentage === 0,
            "bg-violet-900 border-violet-700":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-violet-800 border-violet-600":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[300px] p-6 rounded-2xl flex flex-col bg-zinc-900">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="font-extrabold mt-1 leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <HabitsList date={date} onCompletedChanged={handleCompletedChange} />

          <ProgressBar progress={completedPercentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
