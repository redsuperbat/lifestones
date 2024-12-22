import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

export function Root() {
  return (
    <div>
      <DatePicker></DatePicker>
      <Button variant="link">Hello</Button>
    </div>
  );
}
