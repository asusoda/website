import { Link } from "react-router-dom";

type ResourceLink =
  | { name: string; source: string; external: true }
  | { name: string; source: string; external?: false };

const resources: ResourceLink[] = [
  { name: "Mentorship Program", source: "/mentorship" },
  { name: "Distinguished Members Program", source: "/distinguishedMembers" },
  { name: "Officer Applications", source: "/apply" },
  { name: "Leaderboard", source: "/leaderboard" },
  { name: "Donate & Sponsor", source: "/donate" },
  {
    name: "Constitution",
    source: "https://docs.google.com/document/d/1VZmeN7BdD3D1mjQtc5td02BwbOCKrsivLQeMkF-y_1g/edit",
    external: true,
  },
];

export default function RightFooterGrid() {
  return (
    <div className="flex flex-row space-x-12 -mt-6 justify-between md:justify-center">
      <section className="flex flex-col py-2 space-y-3">
        <h5 className="text-soda-white text-md">Resources</h5>
        {resources.map((el, i) =>
          el.external ? (
            <a href={el.source} key={i} target="_blank" rel="noopener noreferrer">
              <p className="text-soda-gray text-[16px] hover:text-soda-white">{el.name}</p>
            </a>
          ) : (
            <Link to={el.source} key={i}>
              <p className="text-soda-gray text-[16px] hover:text-soda-white">{el.name}</p>
            </Link>
          )
        )}
      </section>
    </div>
  );
}
