type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        style={{ width: `${progress}%` }}
        className="h-3 rounded-xl bg-violet-600 w-2/3 transition-all"
        role="progressbar"
        arial-label="Progresso de hábitos completos nesse dia"
        aria-valuenow={75}
        aria-valuemin={0}
        arial-valuemax={100}
      />
    </div>
  );
}
