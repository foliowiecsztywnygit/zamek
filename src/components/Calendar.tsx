import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  startOfDay
} from 'date-fns';
import { pl } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface CalendarProps {
  selectedDates: (Date | null)[];
  blockedDates?: Date[];
  onChange: (date: Date) => void;
}

export function Calendar({ selectedDates = [], blockedDates = [], onChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  
  const today = startOfDay(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6 px-2">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors text-foreground-heading"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="font-heading text-lg font-medium text-foreground-heading capitalize">
          {format(currentMonth, 'LLLL yyyy', { locale: pl })}
        </div>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors text-foreground-heading"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { locale: pl });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-ui text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gray-400 py-2">
          {format(addDays(startDate, i), 'EE', { locale: pl }).slice(0, 3)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-4">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: pl });
    const endDate = endOfWeek(monthEnd, { locale: pl });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const isPast = isBefore(day, today);
        const isBlocked = blockedDates.some(blocked => isSameDay(blocked, cloneDay));
        const isDisabled = isPast || isBlocked;
        
        const isSelectedStart = selectedDates[0] && isSameDay(cloneDay, selectedDates[0]);
        const isSelectedEnd = selectedDates[1] && isSameDay(cloneDay, selectedDates[1]);
        const isSelected = isSelectedStart || isSelectedEnd || 
          (selectedDates[0] && selectedDates[1] && day > selectedDates[0] && day < selectedDates[1]);

        days.push(
          <div
            key={day.toString()}
            className={cn(
              "p-1 flex justify-center items-center h-12 md:h-14",
            )}
          >
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => onChange(cloneDay)}
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-sm md:text-base transition-colors font-ui",
                isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 text-foreground-body",
                (isSelectedStart || isSelectedEnd) ? "bg-accent-gold text-white hover:bg-accent-gold shadow-md font-medium" : "",
                isSelected && !isSelectedStart && !isSelectedEnd ? "bg-accent-gold/10 text-foreground-heading" : "",
                !isSameMonth(day, monthStart) && !isDisabled ? "text-gray-300" : ""
              )}
            >
              {formattedDate}
            </button>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white p-6 md:p-8 w-[320px] md:w-[400px]">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
