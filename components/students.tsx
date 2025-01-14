import React from "react";
import TableData from "./Tabledata";
import axios from "axios";
import { env } from "@/lib/config";
import DeleteStudent from "./DeleteStudent";
import UpdateStudent from "./UpdateStudent";

const apiUrl = env.API_URL!;

const tableHeads = ["Student ID", "Name", "Email", "Action"];

export default async function StudentsTable() {
  const studentsData = await axios(`${apiUrl}`);
  const { students }: Students = studentsData.data;

  if (!students) return <p>No students found.</p>;
  if (students.length === 0) return <p>No students found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto rounded-md border-collapse border ">
        <thead className="">
          <tr className="border-b">
            {tableHeads.map((head, index) => (
              <th key={index} className="px-4 py-2 text-left font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="">
              <TableData text={student.student_id} />
              <TableData text={student.name} />
              <TableData text={student.email} />
              <td>
                <UpdateStudent {...student} />
                <DeleteStudent id={student.student_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
