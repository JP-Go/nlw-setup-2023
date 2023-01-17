export type HabitProps = {
  completed: number;
};

export function Habit({ completed }: HabitProps) {
  return (
    <div className="bg-zinc-900 w-10 h-10 text-white rounded m-2 border-zinc-800 flex items-center justify-center">
      {completed}
    </div>
  );
}
