import CompetitionProgram, {
  type CompetitionProgramContent,
} from "../components/Programs/CompetitionProgram";
import "./Programs.css";

const content: CompetitionProgramContent = {
  name: "Hackathons",
  eyebrow: "SODA HACKATHONS",
  headline: "One weekend.",
  emphasis: "Anything is possible.",
  intro:
    "Find a team, chase an idea, and turn it into a project you’re proud to share — no matter where you’re starting from.",
  description:
    "SoDA hackathons bring the community together to create, experiment, and learn by doing. You’ll have time to turn an idea into a working project, meet mentors and peers, and present what your team made.",
  perks: [
    "Build a portfolio project with a team and a real deadline.",
    "Get guidance from mentors, organizers, and fellow hackers throughout the event.",
    "Past winning teams have earned sponsor prizes, gift cards, SoDA merch, and other event rewards.",
  ],
  faqs: [
    [
      "Can beginners join a hackathon?",
      "Absolutely. Hackathons are for learning as much as competing; there’s room for every skill level and role.",
    ],
    [
      "Do I need a team before I register?",
      "No. Team formation is part of the experience, and you’ll have opportunities to meet potential collaborators.",
    ],
    [
      "What can I build?",
      "Each event has its own theme and rules, but the best projects usually start with a useful, playful, or meaningful idea.",
    ],
  ],
};

export default function Hackathons() {
  return <CompetitionProgram content={content} />;
}
