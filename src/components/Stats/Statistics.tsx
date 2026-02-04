import AnimatedNumber from "../logic/AnimatedNumber";
import teamsData from "../../components/Team/TeamList.json";

const dollarFormatter = new Intl.NumberFormat("US", {
  style: "currency",
  currency: "USD",
});
const teams = Object.fromEntries(Object.entries(teamsData).slice(0, -1)); // Assuming advisors is last entry

const statistics = [
  {
    key: "pizza",
    label: "worth of pizza served",
    // value: 22500,  // last updated 2020-01-16 (https://github.com/asusoda/asu-soda-oldsite/commit/0813ac24a21dcc190ecfc44b0829825c27d85718)
    // last known value + semesters since * estimated = 22500 + 10 * 3500 = 57500  // last updated 2025-03-29
    //Added the number for Spring 2025 updated 2025-08-25: 61276
    value: 61276,
    steps: 3000,
    formatter: (x: number) => <>{dollarFormatter.format(x)}</>,
  },
  {
    key: "sponsors",
    label: "Sponsors",
    value: 12,
    steps: 1,
    formatter: (x: number) => <>{x}</>,
  },
  {
    key: "teams",
    label: "Teams",
    value: Object.keys(teams).length,
    steps: 1,
    formatter: (x: number) => <>{x}</>,
  },
  {
    key: "officers",
    label: "Officers",
    value: Object.values(teams).reduce((total, team) => {
      return total + team.length;
    }, 0),
    steps: 2,
    formatter: (x: number) => <>{x}</>,
  },
];

export default function Statistics() {
  return (
    <div className="statistics">
      {statistics.map(({ key, label, value, steps, formatter }) => (
        <div key={key} className="stat-container">
          <div className="stat-value">
            <AnimatedNumber number={value} steps={steps} formatter={formatter} />
          </div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
