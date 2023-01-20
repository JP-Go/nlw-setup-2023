import { Check } from "phosphor-react";
import * as CheckBox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const daysOfTheWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState<string>("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(e: FormEvent) {
    e.preventDefault();
    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Hábito criado com sucesso");
  }
  function toggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(weekDays.filter((day) => day !== weekDay));
    } else {
      setWeekDays((prev) => [...prev, weekDay]);
    }
    console.log(weekDays);
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        id="title"
        type="text"
        placeholder="Comer no horário, dormir 8h,etc..."
        autoFocus
      />
      <label htmlFor="" className="font-semibold leading-tight mt-6 mb-3">
        Qual a recorrência
      </label>

      <div className="flex flex-col gap-2">
        {daysOfTheWeek.map((day, index) => (
          <CheckBox.Root
            key={index}
            onCheckedChange={() => toggleWeekDay(index)}
            checked={weekDays.includes(index)}
            className="flex items-center gap-3 group"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <CheckBox.Indicator>
                <Check size={20} className="text-white" />
              </CheckBox.Indicator>
            </div>
            <span className="text-white leading-tight">{day}</span>
          </CheckBox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 justify-center hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
