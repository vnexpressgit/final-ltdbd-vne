import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { formatDayBarLabel } from '../utils/footballUtils';

interface DateBarProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  todayDate: string;
  yesterdayDate: string;
  tomorrowDate: string;
  mode: 'schedule' | 'results';
}

export const DateBar: React.FC<DateBarProps> = ({
  dates,
  selectedDate,
  onSelectDate,
  todayDate,
  yesterdayDate,
  tomorrowDate,
  mode
}) => {
  return (
    <div className="bg-white border-b border-gray-200 py-2.5 px-3 md:px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Navigation arrows & carousel */}
        <button
          onClick={() => {
            const curIdx = dates.indexOf(selectedDate);
            if (curIdx > 0) onSelectDate(dates[curIdx - 1]);
          }}
          disabled={dates.indexOf(selectedDate) <= 0}
          className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent text-gray-700"
          title="Ngày trước đó"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-x-auto scrollbar-none flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 px-1">
          {dates.map((dateStr) => {
            const { title, subtitle, isToday, isSpecial } = formatDayBarLabel(
              dateStr,
              todayDate,
              yesterdayDate,
              tomorrowDate
            );

            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={dateStr}
                onClick={() => onSelectDate(dateStr)}
                className={`flex-shrink-0 flex flex-col items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-center min-w-[76px] sm:min-w-[88px] relative ${
                  isSelected
                    ? 'bg-[#9f224e] text-white shadow-sm font-bold scale-[1.02]'
                    : isToday
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 font-semibold border border-red-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/80 font-medium'
                }`}
              >
                {/* Active Indicator or Today badge */}
                {isToday && !isSelected && (
                  <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white"></span>
                )}
                <span className={`text-[11px] sm:text-xs uppercase tracking-tight leading-tight ${isSelected ? 'text-white' : ''}`}>
                  {title}
                </span>
                <span className={`text-xs sm:text-sm font-semibold mt-0.5 ${isSelected ? 'text-amber-200' : 'text-gray-900'}`}>
                  {subtitle}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            const curIdx = dates.indexOf(selectedDate);
            if (curIdx < dates.length - 1) onSelectDate(dates[curIdx + 1]);
          }}
          disabled={dates.indexOf(selectedDate) >= dates.length - 1}
          className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent text-gray-700"
          title="Ngày kế tiếp"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Calendar Picker button */}
        <div className="hidden sm:flex items-center pl-2 border-l border-gray-200">
          <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition">
            <CalendarIcon className="w-3.5 h-3.5 text-gray-600" />
            <span>Chọn ngày</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                if (e.target.value) onSelectDate(e.target.value);
              }}
              className="sr-only"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
