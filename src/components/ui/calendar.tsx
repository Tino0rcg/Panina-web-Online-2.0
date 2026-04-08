
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-y-4 sm:gap-x-8 sm:gap-y-0",
        month: "space-y-6",
        caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-base font-bold text-slate-900 tracking-tight",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-10 bg-white p-0 opacity-50 hover:opacity-100 border-slate-200 rounded-xl transition-all hover:border-primary/50"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-2",
        head_cell:
          "text-slate-400 rounded-md w-11 font-bold text-[0.7rem] uppercase tracking-[0.2em]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/5 [&:has([aria-selected].day-outside)]:bg-primary/2.5 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-xl"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-11 w-11 p-0 font-medium aria-selected:opacity-100 rounded-xl transition-all hover:bg-primary/10 hover:text-primary"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-white hover:bg-primary/90 hover:text-white focus:bg-primary focus:text-white shadow-lg shadow-primary/20 scale-110 z-10",
        day_today: "bg-slate-100 text-primary font-bold",
        day_outside:
          "day-outside text-slate-300 opacity-50 aria-selected:bg-primary/5 aria-selected:text-slate-400 aria-selected:opacity-30",
        day_disabled: "text-slate-200 opacity-50 line-through",
        day_range_middle:
          "aria-selected:bg-primary/5 aria-selected:text-primary",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className={cn("h-4 w-4", props.className)} />
          }
          return <ChevronRight className={cn("h-4 w-4", props.className)} />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
