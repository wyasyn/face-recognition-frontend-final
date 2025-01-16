import RegisterStudent from "@/components/RegisterStudent";
import Stats from "@/components/Stats";
import StudentsTable from "@/components/students";

export default function page() {
  return (
    <div>
      <RegisterStudent />
      <Stats />
      <StudentsTable />
    </div>
  );
}
