import React from "react";

interface PointRow {
  activity: string;
  points: string;
  note?: string;
}

interface PointCategory {
  label: string;
  rows: PointRow[];
}

const categories: PointCategory[] = [
  {
    label: "Meetings",
    rows: [
      { activity: "Attend in-person GBM", points: "10 pts" },
      { activity: "Attend online GBM", points: "~5 pts" },
      { activity: "Attend lounge hours", points: "5 pts" },
    ],
  },
  {
    label: "Participation",
    rows: [
      { activity: "Ask questions / interact", points: "1 pt", note: "per time" },
      { activity: "Bonus participation", points: "5 pts" },
      { activity: "Submit workshop challenge", points: "20 pts" },
    ],
  },
  {
    label: "Discord",
    rows: [
      { activity: "General engagement", points: "2 pts", note: "per mo · max 10/sem" },
      { activity: "Helpful post / solve query", points: "5 pts", note: "max 15/sem" },
    ],
  },
];

const PointsBreakdownTable: React.FC = () => {
  return (
    <div className="bg-black/40 backdrop-blur-xl shadow-2xl text-gray-300 w-full rounded-xl overflow-hidden border border-white/10">
      {/* 2-D Table */}
      <table className="w-full text-sm border-collapse">
        <caption className="sr-only">
          Points breakdown by category, activity, and points
        </caption>
        <thead>
          <tr className="bg-white/[0.06]">
            <th
              scope="col"
              className="text-left px-3 py-2.5 text-gray-400 font-semibold uppercase tracking-widest text-[10px] border-b border-r border-white/10 w-[24%]"
            >
              Category
            </th>
            <th
              scope="col"
              className="text-left px-3 py-2.5 text-gray-400 font-semibold uppercase tracking-widest text-[10px] border-b border-r border-white/10"
            >
              Activity
            </th>
            <th
              scope="col"
              className="text-center px-3 py-2.5 text-gray-400 font-semibold uppercase tracking-widest text-[10px] border-b border-white/10 w-[20%]"
            >
              Pts
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, ci) =>
            cat.rows.map((row, ri) => (
              <tr
                key={`${ci}-${ri}`}
                className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.04] transition-colors"
              >
                {/* Category cell – only on first row of each category */}
                {ri === 0 ? (
                  <td
                    rowSpan={cat.rows.length}
                    className="px-3 py-3 align-middle border-r border-white/10 text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-snug"
                  >
                    {cat.label}
                  </td>
                ) : null}

                {/* Activity */}
                <td className="px-3 py-3 border-r border-white/10 text-gray-200 leading-snug">
                  {row.activity}
                  {row.note && (
                    <span className="block text-gray-500 text-[11px] mt-0.5">{row.note}</span>
                  )}
                </td>

                {/* Points badge */}
                <td className="px-3 py-3 text-center">
                  <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-xs px-2 py-1 rounded-md tabular-nums whitespace-nowrap">
                    {row.points}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PointsBreakdownTable;
