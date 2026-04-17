import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  getRandomQuestions,
  officerResults,
  type OfficerType,
  type Question,
} from "../data/officerQuiz";

const QUESTIONS_PER_ROUND = 10;

type QuizState = "intro" | "quiz" | "result";

function calculateResults(scores: Record<OfficerType, number>): OfficerType[] {
  const maxScore = Math.max(...Object.values(scores));
  return (Object.keys(scores) as OfficerType[]).filter((type) => scores[type] === maxScore);
}

const emptyScores = (): Record<OfficerType, number> => ({
  Finance: 0,
  Operations: 0,
  "Industry Relations": 0,
  Technology: 0,
  Community: 0,
  Marketing: 0,
});

// Fun reaction GIF-style text shown briefly after each answer
const reactions = [
  "Nice pick! 👀",
  "That tracks. 🧐",
  "Interesting... 🤔",
  "Oh, we see you. 😏",
  "Bold choice. 💪",
  "Noted! 📝",
  "Classic you. 😎",
  "Very telling... 🔮",
  "We respect it. 🫡",
  "Love that for you. ✨",
];

function getRandomReaction() {
  return reactions[Math.floor(Math.random() * reactions.length)];
}

// ─── Intro illustrations per officer type (ASCII/emoji art panels) ───────────
const officerPreviews: { type: OfficerType; emoji: string; tagline: string }[] = [
  { type: "Finance", emoji: "💰", tagline: "spreadsheet supremacy" },
  { type: "Operations", emoji: "⚙️", tagline: "the plan IS the vibe" },
  { type: "Industry Relations", emoji: "🤝", tagline: "knows a guy who knows a guy" },
  { type: "Technology", emoji: "💻", tagline: "dark mode only" },
  { type: "Community", emoji: "❤️", tagline: "everyone's fav officer" },
  { type: "Marketing", emoji: "🎨", tagline: "font crimes are personal" },
];

export default function OfficerQuiz() {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<OfficerType, number>>(emptyScores());
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [reaction, setReaction] = useState<string>("");
  const [result, setResult] = useState<OfficerType[] | null>(null);
  const isBreakdownOpen = true;

  const progress = (currentQuestion / QUESTIONS_PER_ROUND) * 100;

  function startQuiz() {
    setActiveQuestions(getRandomQuestions(QUESTIONS_PER_ROUND));
    setCurrentQuestion(0);
    setScores(emptyScores());
    setSelectedAnswer(null);
    setResult(null);
    setReaction("");
    setQuizState("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAnswerClick(answerIndex: number) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setReaction(getRandomReaction());

    const answer = activeQuestions[currentQuestion].answers[answerIndex];
    const newScores = { ...scores };
    for (const [type, pts] of Object.entries(answer.scores)) {
      newScores[type as OfficerType] += pts as number;
    }

    setTimeout(() => {
      if (currentQuestion + 1 < QUESTIONS_PER_ROUND) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        setReaction("");
        setScores(newScores);
      } else {
        setScores(newScores);
        setResult(calculateResults(newScores));
        setQuizState("result");
      }
    }, 520);
  }

  // ─── Intro Screen ───────────────────────────────────────────────────────────
  const IntroScreen = (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      {/* Hero */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="text-7xl mb-4 select-none"
      >
        🎯
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-3 leading-tight"
      >
        Which SoDA Officer
        <br />
        <span className="text-soda-red">Are You?</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg max-w-lg mb-10"
      >
        Ready to find your role?
      </motion.p>

      {/* Officer preview cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 w-full max-w-xl"
      >
        {officerPreviews.map((preview, i) => (
          <motion.div
            key={preview.type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 + i * 0.05 }}
            className={`bg-gradient-to-br ${officerResults[preview.type].color} p-px rounded-xl`}
          >
            <div className="bg-gray-950 rounded-xl px-3 py-3 text-center">
              <div className="text-3xl mb-1">{preview.emoji}</div>
              <div className="text-white text-xs font-semibold">{preview.type}</div>
              <div className="text-gray-500 text-[10px] italic mt-0.5">"{preview.tagline}"</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={startQuiz}
        className="bg-soda-red hover:bg-red-700 transition-colors text-white font-bold px-10 py-4 rounded-full text-xl shadow-lg shadow-red-900/30 cursor-pointer"
      >
        Let's find out →
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-600 text-xs mt-4"
      >
        Takes about 2 minutes · No login required · 100% unofficial personality science™
      </motion.p>
    </motion.div>
  );

  // ─── Quiz Screen ────────────────────────────────────────────────────────────
  const QuizScreen = activeQuestions.length > 0 && (
    <motion.div
      key="quiz"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center px-4 py-10"
    >
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            Question {currentQuestion + 1} of {QUESTIONS_PER_ROUND}
          </span>
          <span>{Math.round(progress)}% done</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-soda-red rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.28 }}
          className="w-full max-w-2xl"
        >
          {/* Question emoji + text */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 select-none">
              {activeQuestions[currentQuestion].emoji}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug">
              {activeQuestions[currentQuestion].question}
            </h2>
          </div>

          {/* Answer grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeQuestions[currentQuestion].answers.map((answer, idx) => {
              const isSelected = selectedAnswer === idx;
              const isDimmed = selectedAnswer !== null && !isSelected;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswerClick(idx)}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.02, y: -2 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  className={`
                    relative text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium
                    ${
                      isSelected
                        ? "border-soda-red bg-soda-red/20 text-white"
                        : isDimmed
                          ? "border-gray-800 bg-gray-900/30 text-gray-600 cursor-default"
                          : "border-gray-700 bg-gray-900/60 hover:border-soda-red hover:bg-soda-red/10 text-gray-300 cursor-pointer"
                    }
                  `}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 text-soda-red text-base"
                    >
                      ✓
                    </motion.span>
                  )}
                  {answer.text}
                </motion.button>
              );
            })}
          </div>

          {/* Reaction toast */}
          <AnimatePresence>
            {reaction && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mt-5 text-gray-400 text-sm font-medium"
              >
                {reaction}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  // ─── Result Screen ──────────────────────────────────────────────────────────
  const ResultScreen = result && (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      {/* Confetti burst */}
      <div
        className="pointer-events-none select-none fixed inset-0 overflow-hidden z-0"
        aria-hidden
      >
        {["🎉", "✨", "🎊", "⭐", "🎈"].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            initial={{ y: -40, x: `${10 + i * 18}vw`, opacity: 1 }}
            animate={{ y: "110vh", opacity: 0 }}
            transition={{ duration: 2.5 + i * 0.3, ease: "easeIn", delay: i * 0.15 }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Tie or Single Result Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 uppercase tracking-widest text-sm mb-3"
        >
          {result.length > 1 ? "🤝 It's a tie!" : "The algorithm has spoken 🔮"}
        </motion.p>

        {/* Result cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 w-full md:max-w-4xl max-w-lg flex-wrap justify-center">
          {result.map((officerType, idx) => (
            <motion.div
              key={officerType}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, delay: 0.1 + idx * 0.15 }}
              className={`bg-gradient-to-br ${officerResults[officerType].color} p-px rounded-2xl w-full md:flex-1`}
            >
              <div className="bg-gray-950 rounded-2xl px-8 py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, delay: 0.2 + idx * 0.15 }}
                  className="text-7xl mb-4 select-none"
                >
                  {officerResults[officerType].emoji}
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold mb-1">{officerType}</h2>
                <p
                  className={`bg-gradient-to-r ${officerResults[officerType].color} bg-clip-text text-transparent font-semibold text-xl mb-5`}
                >
                  {officerResults[officerType].title}
                </p>

                {/* Meme / fun caption */}
                <div className="bg-gray-900 rounded-xl px-4 py-3 mb-5 border border-gray-800">
                  <p className="text-gray-300 text-sm italic">{officerResults[officerType].meme}</p>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {officerResults[officerType].description}
                </p>

                {/* Fun fact */}
                <div className="flex items-start gap-2 bg-gray-900/60 rounded-xl px-4 py-3 mb-6 text-left border border-gray-800">
                  <span className="text-lg mt-0.5">💡</span>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    <span className="font-semibold text-gray-300">Did you know? </span>
                    {officerResults[officerType].funFact}
                  </p>
                </div>

                {/* Traits */}
                <div className="flex flex-wrap justify-center gap-2">
                  {officerResults[officerType].traits.map((trait) => (
                    <span
                      key={trait}
                      className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${officerResults[officerType].color} text-white`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Score breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-lg mb-8 text-left"
        >
          <AnimatePresence>
            {isBreakdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 mt-4 overflow-hidden"
              >
                {(Object.keys(scores) as OfficerType[])
                  .sort((a, b) => scores[b] - scores[a])
                  .map((type, i) => {
                    const max = QUESTIONS_PER_ROUND * 3;
                    const pct = Math.round((scores[type] / max) * 100);
                    const isWinner = result.includes(type);
                    return (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="w-6 text-center">{officerResults[type].emoji}</span>
                        <span
                          className={`w-36 shrink-0 ${isWinner ? "text-white font-semibold" : "text-gray-400"}`}
                        >
                          {type} {isWinner && "✓"}
                        </span>
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${officerResults[type].color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.7, delay: 0.6 + i * 0.07 }}
                          />
                        </div>
                        <span className="w-8 text-right text-gray-500 text-xs">{pct}%</span>
                      </motion.div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 mb-4"
        >
          <Link
            to="/apply"
            className="bg-soda-red hover:bg-red-700 transition-colors text-white font-bold px-6 py-3 rounded-full text-base shadow-lg shadow-red-900/20"
          >
            Apply
          </Link>
          <button
            onClick={startQuiz}
            className="border border-gray-700 hover:border-gray-400 transition-colors text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-full text-base cursor-pointer"
          >
            Retake
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen text-white flex flex-col">
      <Helmet>
        <title>Find Your Officer Role — SoDA</title>
        <meta
          name="description"
          content="Take the SoDA Officer Quiz and discover which officer role fits your personality — Finance, Technology, Marketing, Community, Operations, or Industry Relations."
        />
      </Helmet>

      <AnimatePresence mode="wait">
        {quizState === "intro" && IntroScreen}
        {quizState === "quiz" && QuizScreen}
        {quizState === "result" && ResultScreen}
      </AnimatePresence>
    </div>
  );
}
