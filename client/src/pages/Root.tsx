import { createSignal, For, Show } from "solid-js";
import { BirthDayPicker } from "./BirthdayPicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { add, format, type Duration } from "date-fns";
import { cn } from "@/libs/cn";

const INTERESTING_NUMBERS = [
  1_000, 10_000, 100_000, 1_000_000, 10_000_000,
] as const;

const INTERESTING_TIME_INTERVALS = [
  "seconds",
  "minutes",
  "hours",
  "days",
  "weeks",
  "months",
] as const;

function numberToString(num: (typeof INTERESTING_NUMBERS)[number]) {
  switch (num) {
    case 1000:
      return "One thousand";
    case 10_000:
      return "Ten thousand";
    case 100_000:
      return "Hundred thousand";
    case 1_000_000:
      return "One million";
    case 10_000_000:
      return "Ten million";
  }
}

function Birthdays({
  birthday,
  duration,
}: { birthday?: Date; duration: keyof Duration }) {
  const addToBirthday = (num: number) =>
    add(birthday ?? new Date(), { [duration]: num });
  const formatBirthday = (num: number) => {
    try {
      return format(addToBirthday(num), "yyyy-MM-dd");
    } catch {
      return "Unfathomable date";
    }
  };
  return (
    <Table>
      <TableCaption>Happy birthday 🎂 Perhaps?</TableCaption>
      <TableBody>
        <For each={INTERESTING_NUMBERS}>
          {(num) => (
            <TableRow>
              <TableCell class="font-medium">
                {numberToString(num)} {duration}
              </TableCell>
              <TableCell
                class={cn(
                  addToBirthday(num).getTime() < Date.now() && "text-red-400",
                )}
              >
                {formatBirthday(num)}
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
}

export function Root() {
  const [date, setDate] = createSignal<Date | undefined>();

  return (
    <div
      class="grid h-screen justify-items-center "
      id="background"
      style={{
        "grid-template-rows": "auto 1fr",
      }}
    >
      <div class="flex flex-col h-40 items-center gap-3 mt-10 text-white">
        <h1 class="font-bold text-2xl">Lifestones</h1>
        <small>(Lifecycle Milestones)</small>

        <p class="w-80 text-center">
          This app allows you to calculate when your birthday is in other
          metrics other than years.
        </p>
      </div>

      <div class="flex flex-col gap-2 ">
        <div>
          <h4 class="text-white">When is your birthday?</h4>
          <BirthDayPicker onChange={setDate} />
        </div>

        <Show when={date() != null}>
          <Tabs
            defaultValue="account"
            class="text-white"
            orientation="vertical"
          >
            <TabsList class="w-24">
              <For each={INTERESTING_TIME_INTERVALS}>
                {(interval) => (
                  <TabsTrigger value={interval}>{interval}</TabsTrigger>
                )}
              </For>
            </TabsList>
            <For each={INTERESTING_TIME_INTERVALS}>
              {(interval) => (
                <TabsContent value={interval}>
                  <Birthdays birthday={date()} duration={interval} />
                </TabsContent>
              )}
            </For>
          </Tabs>
        </Show>
      </div>
    </div>
  );
}
