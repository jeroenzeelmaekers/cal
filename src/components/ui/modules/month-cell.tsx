import { DayCell } from "@/components/ui/atoms/day-cell";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type MonthCellItem = {
  day: number | null;
  date: Date | null;
  isCurrentMonth: boolean;
  isWeekend: boolean;
};

type MonthCellProps = {
  label: string;
  cells: MonthCellItem[];
  onSelectDate: (date: Date) => void;
  isToday: (date: Date) => boolean;
  isSelectedDate: (date: Date) => boolean;
};

export default function MonthCell({
  label,
  cells,
  onSelectDate,
  isToday,
  isSelectedDate,
}: MonthCellProps) {
  return (
    <article className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card p-1.5">
      <h2 className="mb-1 truncate text-center text-[clamp(0.7rem,1.3vw,1rem)] font-semibold text-card-foreground">
        {label}
      </h2>

      <div className="mb-1 grid grid-cols-7 gap-px">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="truncate text-center text-[clamp(0.55rem,0.95vw,0.78rem)] font-medium text-muted-foreground"
          >
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6 gap-px">
        {cells.map((cell, index) => {
          const date = cell.date;

          return (
            <DayCell
              key={`${label}-${index}`}
              day={cell.day}
              isCurrentMonth={cell.isCurrentMonth}
              isWeekend={cell.isWeekend}
              isToday={date ? isToday(date) : false}
              isSelected={date ? isSelectedDate(date) : false}
              onClick={date ? () => onSelectDate(date) : undefined}
            />
          );
        })}
      </div>
    </article>
  );
}
