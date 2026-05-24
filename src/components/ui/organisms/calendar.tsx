"use client";

import MonthCell from "@/components/ui/modules/month-cell";
import { useCalendar } from "@/components/ui/providers/calendar-provider";

function CalendarGrid() {
  const { months, selectDate, isToday, isSelectedDate } = useCalendar();

  return (
    <section className="h-full min-h-svh w-full overflow-y-auto bg-background p-2 md:h-svh md:overflow-hidden">
      <div className="grid h-full w-full auto-rows-[minmax(14rem,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-3 xl:auto-rows-fr">
        {months.map((month) => (
          <MonthCell
            key={month.month}
            label={month.label}
            cells={month.cells}
            onSelectDate={selectDate}
            isToday={isToday}
            isSelectedDate={isSelectedDate}
          />
        ))}
      </div>
    </section>
  );
}

export default function Calendar() {
  return <CalendarGrid />;
}
