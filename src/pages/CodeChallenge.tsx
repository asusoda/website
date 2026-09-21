import CompetitionProgram, {
  type CompetitionProgramContent,
} from "../components/Programs/CompetitionProgram";
import "./Programs.css";

const content: CompetitionProgramContent = {
  name: "Code Challenge",
  eyebrow: "SODA CODE CHALLENGE",
  headline: "Think fast.",
  emphasis: "Build confidence.",
  intro:
    "A friendly challenge for students who want to practice problem-solving, meet other coders, and see what they can do.",
  description:
    "Code Challenge is SoDA’s space to sharpen your skills through approachable programming problems. Come solo or bring a friend, work at your pace, and learn from the solutions afterward.",
  perks: [
    "Practice with competition-style problems in a low-pressure environment.",
    "Meet students who enjoy building and problem-solving.",
    "Past winner prizes have included gift cards, SoDA merch, and sponsor-provided rewards.",
  ],
  faqs: [
    [
      "Do I need competitive programming experience?",
      "No. Challenges are designed to welcome a range of experience levels, and learning is part of the event.",
    ],
    [
      "Can I participate without a team?",
      "Yes. You can work independently, and we’ll also help attendees connect with others when collaboration makes sense.",
    ],
    [
      "What should I bring?",
      "Bring a charged laptop and your preferred coding setup. Event-specific details will be shared before each challenge.",
    ],
  ],
};

export default function CodeChallenge() {
  return <CompetitionProgram content={content} />;
}
