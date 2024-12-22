import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerPositioner,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "@/components/ui/date-picker";
import { Index, Portal } from "solid-js/web";

export function BirthDayPicker({
  onChange,
}: {
  onChange: (date: Date) => void;
}) {
  return (
    <DatePicker
      onValueChange={(d) => {
        const dateValue = d.value[0]?.toDate(
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        );
        if (!dateValue) return;
        onChange(dateValue);
      }}
    >
      <DatePickerControl class="w-full">
        <DatePickerInput />
        <DatePickerTrigger />
      </DatePickerControl>
      <Portal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="year">
              <DatePickerContext>
                {(context) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index
                          each={context().getYearsGrid({
                            columns: 4,
                          })}
                        >
                          {(years) => (
                            <DatePickerTableRow>
                              <Index each={years()}>
                                {(year) => (
                                  <DatePickerTableCell value={year().value}>
                                    <DatePickerTableCellTrigger>
                                      {year().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="day">
              <DatePickerContext>
                {(context) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableHead>
                        <DatePickerTableRow>
                          <Index each={context().weekDays}>
                            {(weekDay) => (
                              <DatePickerTableHeader>
                                {weekDay().short}
                              </DatePickerTableHeader>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      </DatePickerTableHead>
                      <DatePickerTableBody>
                        <Index each={context().weeks}>
                          {(week) => (
                            <DatePickerTableRow>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePickerTableCell value={day()}>
                                    <DatePickerTableCellTrigger>
                                      {day().day}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerContext>
                {(context) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index
                          each={context().getMonthsGrid({
                            columns: 4,
                            format: "short",
                          })}
                        >
                          {(months) => (
                            <DatePickerTableRow>
                              <Index each={months()}>
                                {(month) => (
                                  <DatePickerTableCell value={month().value}>
                                    <DatePickerTableCellTrigger>
                                      {month().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </Portal>
    </DatePicker>
  );
}
