import { useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";

export function BigCalendar() {
  const { locale } = useLocale();
  const state = useCalendarState({ locale, createCalendar });
  const ref = React.useRef(null);

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(state, ref);
  const { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);

  return (
    <div {...calendarProps} ref={ref} className="p-4 w-full h-full">
      {/* Header bulan dan navigasi */}
      <div className="flex items-center justify-between mb-4">
        <button {...prevButtonProps}>&lt;</button>
        <h2 className="text-lg font-semibold">{title}</h2>
        <button {...nextButtonProps}>&gt;</button>
      </div>

      {/* Nama hari lengkap */}
      <div
        {...headerProps}
        className="grid grid-cols-7 text-center font-medium border-b pb-2"
      >
        {weekDays.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Grid tanggal */}
      <div {...gridProps} className="grid grid-cols-7 gap-2 mt-2 text-center">
        {state.weeks.map((week, i) =>
          week.map((date, j) => {
            const { cellProps, formattedDate } = useCalendarCell(
              { date },
              state,
            );
            return (
              <div
                key={j}
                {...cellProps}
                className="border rounded-md py-6 hover:bg-muted cursor-pointer"
              >
                {formattedDate}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
