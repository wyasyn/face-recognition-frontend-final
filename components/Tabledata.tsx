import React from "react";

export default function TableData({ text }: { text: string | number }) {
  return <td className="px-4 py-2">{text}</td>;
}
