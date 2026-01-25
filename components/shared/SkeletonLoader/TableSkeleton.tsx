import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
              {Array(columns)
                .fill(0)
                .map((_, index) => (
                  <th key={index} className="px-4 py-3">
                    <Skeleton width={80} />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {Array(rows)
              .fill(0)
              .map((_, rowIndex) => (
                <tr key={rowIndex} className="text-gray-700">
                  {Array(columns)
                    .fill(0)
                    .map((_, colIndex) => (
                      <td key={colIndex} className="px-4 py-3">
                        <Skeleton />
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
