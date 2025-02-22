import React from "react";
import TableData from "./Tabledata";
import axios from "axios";
import { env } from "@/lib/config";
import DeleteStudent from "./DeleteStudent";
import UpdateStudent from "./UpdateStudent";
import { AlertDestructive } from "./AlertDestructive";

import { PaginationMenu } from "./PaginationMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const apiUrl = env.API_URL!;

const tableHeads = ["Student ID", "Name", "Email", "Action"];

export default async function StudentsTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const studentsData = await axios(`${apiUrl}/?page=${currentPage}`);
  const students: Student[] = studentsData.data.students;
  const totalPages = studentsData.data.total_pages;

  if (!studentsData)
    return (
      <AlertDestructive title="Server Error" error="Could not load students" />
    );
  if (students.length === 0)
    return (
      <AlertDestructive
        title="No students found"
        error="Add students to the database"
      />
    );

  return (
    <div>
      <table className=" md:hidden min-w-full table-auto rounded-lg border-collapse border overflow-hidden bg-background ">
        <thead className="border">
          <tr className="border-b bg-primary/5">
            <th className="px-4 py-2 text-left font-medium">Student</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-4 py-3 flex flex-col gap-3 border-b border-l border-r">
                <div>ID: {student.student_id}</div>
                <Avatar>
                  <AvatarImage src={student.image_url} />
                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                </Avatar>
                <div>Name: {student.name}</div>
                <div>Email: {student.email}</div>
                <div className="flex items-center">
                  <UpdateStudent {...student} />
                  <DeleteStudent id={student.student_id} name={student.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className=" max-md:hidden min-w-full table-auto rounded-lg border-collapse border overflow-hidden bg-background ">
        <thead className="">
          <tr className="border-b bg-primary/5">
            {tableHeads.map((head, index) => (
              <th key={index} className="px-4 py-2 text-left font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={index}
              className="hover:bg-primary/5 duration-300 transition-all"
            >
              <TableData text={student.student_id} />
              <td className="flex items-center gap-3 py-3">
                <Avatar>
                  <AvatarImage src={student.image_url} />
                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                </Avatar>

                <span>{student.name}</span>
              </td>
              <TableData text={student.email} />
              <td className="flex items-center py-2">
                <UpdateStudent {...student} />
                <DeleteStudent id={student.student_id} name={student.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" my-[3rem] ">
        {totalPages > 1 && (
          <PaginationMenu currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
