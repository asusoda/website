import {
  Users,
  Moon,
  Milestone,
  Newspaper,
  Code,
  Trophy,
  PartyPopper,
  Swords,
  GitMerge,
  Cake,
} from "lucide-react";
import { TimelineLayout } from "./timeline/timeline-layout";
import type { TimelineElement } from "../lib/types";

// SoDA History Timeline Data
const timelineItems: TimelineElement[] = [
  {
    id: 1,
    date: "??? to 2005",
    title: "Windows Interest Group (WIG) Era",
    description:
      "Earliest known activity in 2003. Provided presentations and hands-on activities. Supported by Microsoft.",
    url: "https://scai.engineering.asu.edu/wp-content/uploads/sites/31/2020/05/ASU_CSE_AnnualReport2004.pdf",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: 2,
    date: "2006 to 2008",
    title: "Dark Ages",
    description: "No mention of WIG or SoDA anywhere.",
    url: "https://scai.engineering.asu.edu/wp-content/uploads/sites/31/2020/05/SCI_AR07.pdf",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    id: 3,
    date: "2008",
    title: "SoDA Era",
    description:
      "Remnants of WIG becomes SoDA. This is the earliest known mention of the Software Developers Association.",
    url: "https://web.archive.org/web/20241226105012/https://asusoda.savedfor.us/",
    icon: <Milestone className="h-4 w-4" />,
  },
  {
    id: 4,
    date: "2012",
    title: "First Full Circle Article",
    description: "SoDA featured in ASU's Full Circle publication.",
    url: "https://fullcircle.asu.edu/students/student-clubs-2/",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    id: 5,
    date: "2014",
    title: "First Bootcamp",
    description: "SoDA hosts its first coding bootcamp.",
    url: "https://www.reddit.com/r/ASU/comments/9m8lcr/the_software_developers_association_is_hosting_a/",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: 6,
    date: "2014",
    title: "First Code Challenge",
    description: "(Inferred from numbering of subsequent challenges)",
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    id: 7,
    date: "2016",
    title: "First Annual Kickoff",
    description:
      'SoDA holds its first official annual kickoff event (precursor to "What is SoDA and Can I Drink It?" events).',
    url: "https://x.com/asu_soda/status/770121323838316544",
    icon: <PartyPopper className="h-4 w-4" />,
  },
  {
    id: 8,
    date: "2017",
    title: "First MLH Hackathon (SWHacks)",
    description: "SoDA hosts ASU’s first Major League Hackathon, SouthWest Hacks (SWHacks).",
    url: "https://web.archive.org/web/20170301060055/https://www.statepress.com/article/2017/02/spscience-mlh-hackathon-soda",
    icon: <Swords className="h-4 w-4" />,
  },
  {
    id: 9,
    date: "2018",
    title: "Formation of sunhacks",
    description: "The product of the merger between SWHacks & Desert Hacks.",
    url: "https://www.facebook.com/swhacksofficial/posts/pfbid0iF1LDbDuiksCjzueRGhHxgCcx284MNrE2Ythy1NWZH7edwrVnBf1r4aiJQAddt1Rl",
    icon: <GitMerge className="h-4 w-4" />,
  },
  {
    id: 10,
    date: "2024",
    title: "10th Code Challenge Anniversary",
    description: "Celebrated the 10th anniversary of the SoDA Code Challenge.",
    url: "https://www.hackerrank.com/code-challenge-x",
    icon: <Cake className="h-4 w-4" />,
  },
];

function HistoryTimeline() {
  return (
    <>
      <h2 className="section-header-text">History</h2>
      <TimelineLayout items={timelineItems} iconColor="soda-blue" />
    </>
  );
}

export default HistoryTimeline;
