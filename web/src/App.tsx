import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import "./main.css";
import "./lib/dayjs";

// import { Habit } from "./components/Habit";

export function App() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </main>
  );
}
