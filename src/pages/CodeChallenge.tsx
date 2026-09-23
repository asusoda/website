import CodeChallengeProgram, {
  type CodeChallengeProgramContent,
} from "../components/Programs/CodeChallengeProgram";
import "./Programs.css";

const content: CodeChallengeProgramContent = {
  name: "Code Challenge",
  eyebrow: "SODA CODE CHALLENGE",
  headline: "Solve problems",
  emphasis: "Sharpen your skills.",
  intro:
    "A friendly challenge for students who want to practice problem-solving, meet other coders, and compete for prizes.",
  description:
    "Code Challenge is SoDA’s space to develop your coding and problem solving skills through various programming problems. Come solo or bring a friend, work at your pace, and learn from the solutions afterward.",
  heroImage: {
    src: "/codechallenge/people/hero.webp",
    alt: "Code Challenge participants standing in front of the event presentation",
  },
  winnerImages: [
    {
      src: "/codechallenge/winners/winners1.webp",
      alt: "Past Code Challenge winners standing together after the event",
    },
    {
      src: "/codechallenge/winners/winners2.webp",
      alt: "Past Code Challenge winner group standing in front of the presentation screen",
    },
    {
      src: "/codechallenge/winners/winners3.webp",
      alt: "Past Code Challenge winners posing after the challenge",
    },
  ],
  galleryImages: [
    {
      src: "/codechallenge/people/people5.webp",
      alt: "Student working on a Code Challenge problem on a laptop",
    },
    {
      src: "/codechallenge/people/people3.webp",
      alt: "Students collaborating during a Code Challenge",
    },
    {
      src: "/codechallenge/people/people4.webp",
      alt: "Student working on a Code Challenge problem on a laptop",
    },
  ],
  faqs: [
    [
      "Do I need competitive programming experience?",
      "No, you can come in as a beginner or as an experienced competitive programmer. You'll learn along the way.",
    ],
    [
      "Can I participate without a team?",
      "Yes, you can work independently, but you'll be able to meet potential teammates at the event.",
    ],
    [
      "What should I bring?",
      "Bring a charged laptop and your preferred coding setup. Event-specific details will be shared before each challenge.",
    ],
  ],
};

export default function CodeChallenge() {
  return <CodeChallengeProgram content={content} />;
}
