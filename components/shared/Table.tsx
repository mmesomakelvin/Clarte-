
import React from 'react';

interface Column<T> {
  // FIX: Changed header type from string to React.ReactNode to allow JSX in headers.
  header: React.ReactNode;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (item: T) => React.ReactNode;
}

const Table = <T extends { id: string | number }>(
  { columns, data, renderRowActions }: TableProps<T>
): React.ReactElement => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-clarte-gray-200">
        <thead className="bg-clarte-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-bold text-clarte-gray-500 uppercase tracking-wider ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
            {renderRowActions && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-clarte-gray-200">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-clarte-gray-50">
                {columns.map((col, index) => (
                  <td key={index} className={`px-6 py-4 whitespace-nowrap text-sm text-clarte-gray-700 ${col.className || ''}`}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : String(item[col.accessor])}
                  </td>
                ))}
                {renderRowActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {renderRowActions(item)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (renderRowActions ? 1 : 0)} className="px-6 py-12 text-center text-clarte-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
