"use client";

import { useEffect, useState } from "react";

import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { LuCalendar } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { months } from "@/utils/months";

type DatePickerProps = {
  field: any;
  isEdit?: boolean;
  startYear: number;
  endYear: number;
  endMonth?: number;
};

const DatePicker = ({
  field,
  isEdit = false,
  startYear,
  endYear,
  endMonth,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date>(new Date(endYear, 0));

  useEffect(() => {
    if (isEdit && field?.value) {
      const parsedDate = new Date(field.value);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      }
    }
  }, [isEdit, field?.value]);

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
  };

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      setDate(selectedData);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <LuCalendar className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={(value) => {
              handleMonthChange(value);
              field.onChange(value);
            }}
            value={months[getMonth(date)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              handleYearChange(value);
              field.onChange(value);
            }}
            value={getYear(date).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            field.onChange(date);
            handleSelect(date);
          }}
          initialFocus
          fromDate={new Date(startYear, 1)}
          toDate={new Date(endYear, endMonth ?? 1)}
          defaultMonth={new Date(endYear, 1)}
          month={date}
          onMonthChange={setDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
