import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { generateProgressBarPercentage } from "../utils/generate-progress-bar-percentage";
import clsx from 'clsx'
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  ammount?: number,
  completed?: number,
  date: Date
}

export function HabitDay({ ammount = 0, completed = 0, date, ...rest }: Props) {
  const percentageCompleted = generateProgressBarPercentage(completed, ammount)
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className={clsx("m-1 rounded-lg border-2", {
        'bg-zinc-900 border-zinc-800': percentageCompleted === 0,
        'bg-violet-900 border-violet-700': percentageCompleted > 0 && percentageCompleted <= 20,
        'bg-violet-800 border-violet-600': percentageCompleted > 20 && percentageCompleted <= 40,
        'bg-violet-700 border-violet-500': percentageCompleted > 40 && percentageCompleted <= 60,
        'bg-violet-600 border-violet-500': percentageCompleted > 60 && percentageCompleted <= 80,
        'bg-violet-500 border-violet-400': percentageCompleted > 80,
        'border-white border-4': isCurrentDay
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  );
}
