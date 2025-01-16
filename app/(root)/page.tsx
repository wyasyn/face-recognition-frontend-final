import RegisterStudent from "@/components/RegisterStudent";
import Stats from "@/components/Stats";
import StudentsTable from "@/components/students";

export default function page({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  const currentPage = parseInt(page);
  return (
    <div>
      <RegisterStudent />
      <Stats />
      <StudentsTable currentPage={currentPage} />
    </div>
  );
}
