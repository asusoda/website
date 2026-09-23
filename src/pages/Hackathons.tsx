import HackathonProgram, {
  type HackathonProgramContent,
} from "../components/Programs/HackathonProgram";
import "./Programs.css";

const content: HackathonProgramContent = {
  name: "Hackathons",
  eyebrow: "SODA HACKATHONS",
  headline: "Team up.",
  emphasis: "Build anything.",
  intro: "Find a team, brainstorm an idea, build your project, and pitch it to the judges.",
  description:
    "SoDA hackathons bring the community together to create, experiment, and learn. You’ll have time to turn an idea into a working project, meet mentors and peers, and present your solution to real engineers.",
  perks: [
    "Build a portfolio project with a team and a real deadline.",
    "Get guidance from mentors, organizers, and fellow hackers throughout the event.",
    "Past winning teams have earned sponsor prizes, gift cards, SoDA merch, and other event rewards.",
  ],
  heroImage: {
    src: "/hackathons/innovationhacks26/people/crowd1.jpg",
    alt: "A packed audience watching the Innovation Hacks mentor presentation",
  },
  prizeImages: [
    {
      src: "/hackathons/innovationhacks26/prizes/prize1.jpg",
      alt: "Innovation Hacks prize display",
    },
    {
      src: "/hackathons/innovationhacks26/prizes/prize2.jpg",
      alt: "Innovation Hacks prize display",
    },
    {
      src: "/hackathons/innovationhacks26/prizes/prize3.jpg",
      alt: "Innovation Hacks prize display",
    },
  ],
  winnerImages: [
    {
      src: "/hackathons/innovationhacks26/winners/mochi.jpg",
      alt: "Mochi, the Amazon Sustainability track winners at Innovation Hacks",
    },
    {
      src: "/hackathons/innovationhacks26/winners/redreemer.jpg",
      alt: "Redreemer, the State Farm Financial Wellness track winners at Innovation Hacks",
    },
    {
      src: "/hackathons/innovationhacks26/winners/devlog.jpg",
      alt: "DevLog, the Google Agentic Frontier track winners at Innovation Hacks",
    },
  ],
  galleryImages: [
    {
      src: "/hackathons/innovationhacks26/people/judging1.jpg",
      alt: "Innovation Hacks team collaborating around a laptop",
    },
    {
      src: "/hackathons/innovationhacks26/people/judging2.jpg",
      alt: "Innovation Hacks participants posing together",
    },
    {
      src: "/hackathons/innovationhacks26/people/judging3.jpg",
      alt: "Innovation Hacks team presenting their project",
    },
    {
      src: "/hackathons/innovationhacks26/people/judging4.jpg",
      alt: "Innovation Hacks participants presenting to judges",
    },
    {
      src: "/hackathons/innovationhacks26/people/crowd2.jpg",
      alt: "Innovation Hacks audience listening to a presentation",
    },
    {
      src: "/hackathons/innovationhacks26/people/judging5.jpg",
      alt: "Innovation Hacks team sharing their project with judges",
    },
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
      "Each event has different tracks and themes. You can come into the hackathon with an idea or figure one out after seeing the tracks.",
    ],
  ],
};

export default function Hackathons() {
  return <HackathonProgram content={content} />;
}
