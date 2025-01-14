import Logout from "./logout";
import MarkAttendance from "./MarkAttendance";
import { ModeToggle } from "./modeToggle";
import RegisterStudent from "./RegisterStudent";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center gap-5 text-muted-foreground py-6">
      <RegisterStudent />
      <MarkAttendance />
      <Logout />
      <ModeToggle />
    </header>
  );
}
