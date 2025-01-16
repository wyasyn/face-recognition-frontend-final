const statsData = {
  number_of_students: {
    title: "Students number",
    sub_title: "Number of students registered",
    rate: 10,
  },
  total_attendance: {
    title: "Total attendance",
    sub_title: "Number of attendances",
    rate: "13 days",
  },
  average_attendance_rate: {
    title: "Average attendance rate",
    sub_title: "Average number of attendances",
    rate: "32%",
  },
  number_of_class_days: {
    title: "Class Days",
    sub_title: "Class days for monthly",
    rate: "23 days",
  },
};
export default function Stats() {
  return (
    <div className="grid gap-1 md:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8 md:mb-12">
      <StatsCard {...statsData.average_attendance_rate} />
      <StatsCard {...statsData.number_of_class_days} />
      <StatsCard {...statsData.number_of_students} />
      <StatsCard {...statsData.total_attendance} />
    </div>
  );
}

function StatsCard({
  title,
  sub_title,
  rate,
}: {
  title: string;
  sub_title: string;
  rate: string | number;
}) {
  return (
    <div className="border rounded-xl p-4 bg-background flex gap-4 items-center">
      <div className="flex-1">
        <h2 className="text-foreground capitalize text-xl mb-2 text-balance">
          {title}
        </h2>
        <p className="text-sm">{sub_title}</p>
      </div>
      <div className="text-2xl text-foreground">{rate}</div>
    </div>
  );
}
