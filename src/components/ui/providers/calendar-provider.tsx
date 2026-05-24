"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type CalendarDayCell = {
  day: number | null;
  date: Date | null;
  isCurrentMonth: boolean;
  isWeekend: boolean;
};

export type CalendarMonth = {
  month: number;
  label: string;
  cells: CalendarDayCell[];
};

type CalendarContextValue = {
  year: number;
  selectedDate: Date | null;
  months: CalendarMonth[];
  setYear: (year: number) => void;
  selectDate: (date: Date) => void;
  isToday: (date: Date) => boolean;
  isSelectedDate: (date: Date) => boolean;
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function toMondayFirst(day: number) {
  return (day + 6) % 7;
}

function buildMonthCells(year: number, month: number): CalendarDayCell[] {
  const firstDay = toMondayFirst(new Date(year, month, 1).getDay());
  const daysInCurrentMonth = getDaysInMonth(year, month);

  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < firstDay; i++) {
    const dayIndex = cells.length % 7;

    cells.push({
      day: null,
      date: null,
      isCurrentMonth: false,
      isWeekend: dayIndex >= 5,
    });
  }

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dayIndex = cells.length % 7;
    const date = new Date(year, month, day);

    cells.push({
      day,
      isCurrentMonth: true,
      date,
      isWeekend: dayIndex >= 5,
    });
  }

  const remaining = 42 - cells.length;
  for (let i = 0; i < remaining; i++) {
    const dayIndex = cells.length % 7;

    cells.push({
      day: null,
      date: null,
      isCurrentMonth: false,
      isWeekend: dayIndex >= 5,
    });
  }

  return cells;
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function CalendarProvider({
  children,
  initialYear,
}: PropsWithChildren<{ initialYear?: number }>) {
  const [year, setYear] = useState(initialYear ?? new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long" }),
    [],
  );

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, month) => ({
      month,
      label: monthFormatter.format(new Date(year, month, 1)),
      cells: buildMonthCells(year, month),
    }));
  }, [monthFormatter, year]);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const isToday = useCallback((date: Date) => {
    return isSameDate(date, new Date());
  }, []);

  const isSelectedDate = useCallback(
    (date: Date) => {
      if (!selectedDate) {
        return false;
      }

      return isSameDate(date, selectedDate);
    },
    [selectedDate],
  );

  const value = useMemo<CalendarContextValue>(
    () => ({
      year,
      selectedDate,
      months,
      setYear,
      selectDate,
      isToday,
      isSelectedDate,
    }),
    [year, selectedDate, months, selectDate, isToday, isSelectedDate],
  );

  return (
    <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider.");
  }

  return context;
}
