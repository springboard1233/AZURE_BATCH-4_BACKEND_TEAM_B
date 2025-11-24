import React from "react";

export function DataTable({ data, maxRows = 20 }: { data: Record<string, any>[]; maxRows?: number }) {
  if (!data || data.length === 0) {
    return <div className="center small-muted">No rows</div>;
  }
  const keys = Object.keys(data[0]);
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {keys.map((k) => <th key={k}>{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, maxRows).map((row, i) => (
            <tr key={i}>
              {keys.map((k) => <td key={k + i}>{String(row[k])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
