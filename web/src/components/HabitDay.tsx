import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";

export type HabitDayProps = {
  completed: number;
  ammount: number;
};

export function HabitDay({ ammount, completed }: HabitDayProps) {
  const completedPercentage = Math.round((completed / ammount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 h-10 text-white rounded-lg border-2", {
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
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[300px] p-6 rounded-2xl flex flex-col bg-zinc-900">
          <span className="font-semibold text-zinc-400">Segunda-Feira</span>
          <span className="font-extrabold mt-1 leading-tight text-3xl">
            17/01
          </span>
          <ProgressBar progress={completedPercentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
