interface InfoRow {
  label: string;
  value: string;
  required?: boolean;
}

interface InfoTableProps {
  rows: InfoRow[];
}

export function InfoTable({ rows }: InfoTableProps) {
  return (
    <div className="my-6 not-prose overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700 w-1/4">
              항목
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
              설명
            </th>
            <th className="border border-gray-200 px-4 py-2 text-center font-semibold text-gray-700 w-20">
              필수
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">
                {row.label}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-600">
                {row.value}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                {row.required ? (
                  <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                    필수
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs">선택</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
