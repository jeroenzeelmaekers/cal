import { cn } from "@/lib/utils";

type DayCellProps = {
  day: number | null;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  isToday: boolean;
  isSelected?: boolean;
  onClick?: () => void;
};

export function DayCell({
  day,
  isCurrentMonth,
  isWeekend,
  isToday,
  isSelected = false,
  onClick,
}: DayCellProps) {
  const isEmpty = day === null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isEmpty}
      aria-pressed={isSelected}
      className={cn(
        "flex min-h-0 w-full items-center justify-center rounded-sm border border-transparent text-[clamp(0.55rem,0.95vw,0.8rem)] leading-none tabular-nums transition-colors",
        isCurrentMonth ? "bg-background" : "bg-muted/20 text-transparent",
        isCurrentMonth && !isWeekend && "text-foreground",
        isCurrentMonth && isWeekend && "text-muted-foreground/70",
        isEmpty && "pointer-events-none",
        isToday && "bg-primary text-primary-foreground font-semibold",
        isSelected && "border-ring bg-accent/60 font-semibold",
      )}
    >
      {day ?? ""}
    </button>
  );
}
