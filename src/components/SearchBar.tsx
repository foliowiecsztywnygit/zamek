import { useState, useRef, useEffect } from 'react';
import { format, addDays, isBefore } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { Calendar } from './Calendar';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

export function SearchBar() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | null>(null);
  
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowCalendar(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (date: Date) => {
    if (showCalendar === 'start') {
      setStartDate(date);
      if (isBefore(endDate, date) || endDate.getTime() === date.getTime()) {
        setEndDate(addDays(date, 1));
      }
      setShowCalendar('end');
    } else if (showCalendar === 'end') {
      if (isBefore(date, startDate) || date.getTime() === startDate.getTime()) {
        setStartDate(date);
        setEndDate(addDays(date, 1));
      } else {
        setEndDate(date);
      }
      setShowCalendar(null);
    }
  };

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const startStr = format(startDate, 'yyyy-MM-dd');
    const endStr = format(endDate, 'yyyy-MM-dd');
    navigate(`/rezerwacja?start=${startStr}&end=${endStr}&guests=2`);
  };

  const DateDisplay = ({ date, onClick, isActive }: { date: Date, onClick: () => void, isActive: boolean }) => (
    <button 
      type="button" 
      onClick={onClick}
      className={cn(
        "flex items-center justify-center py-6 px-4 md:px-10 transition-colors bg-white hover:bg-gray-50 flex-1 w-full",
        isActive && "bg-gray-50"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl md:text-5xl font-hane text-foreground-heading">{format(date, 'd')}</span>
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm font-heading font-medium text-foreground-heading capitalize">
            {format(date, 'MMM', { locale: pl })}
          </span>
          <span className="text-[10px] md:text-xs font-ui uppercase tracking-widest text-foreground-body/50">
            {format(date, 'EEEE', { locale: pl })}
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="relative flex justify-center w-full my-12" ref={ref}>
      <div className="flex flex-col md:flex-row shadow-lg w-full max-w-4xl bg-white">
        
        <div className="flex flex-col md:flex-row flex-1 relative">
          <DateDisplay 
            date={startDate} 
            onClick={() => setShowCalendar(showCalendar === 'start' ? null : 'start')}
            isActive={showCalendar === 'start'}
          />
          
          <div className="hidden md:flex items-center justify-center bg-white px-2 z-10 text-gray-300">
             <ArrowRight className="w-5 h-5 font-light" strokeWidth={1} />
          </div>
          
          <DateDisplay 
            date={endDate} 
            onClick={() => setShowCalendar(showCalendar === 'end' ? null : 'end')}
            isActive={showCalendar === 'end'}
          />
        </div>

        <button 
          onClick={handleSearch} 
          className="flex items-center justify-center bg-accent-gold hover:bg-accent-gold/90 text-white font-ui uppercase tracking-[0.2em] text-sm md:text-base font-semibold px-12 py-6 transition-colors w-full md:w-auto"
        >
          Szukaj
        </button>
      </div>

      {showCalendar && (
        <div className="absolute top-[100%] z-50 mt-4 left-1/2 -translate-x-1/2 shadow-2xl rounded-xl overflow-hidden">
          <Calendar 
            selectedDates={[startDate, endDate]} 
            onChange={handleDateChange} 
          />
        </div>
      )}
    </div>
  );
}

