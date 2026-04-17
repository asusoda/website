export type OfficerType =
  | "Finance"
  | "Operations"
  | "Industry Relations"
  | "Technology"
  | "Community"
  | "Marketing";

export interface Answer {
  text: string;
  scores: Partial<Record<OfficerType, number>>;
}

export interface Question {
  id: number;
  question: string;
  emoji: string; // decorative emoji shown with each question
  answers: Answer[];
}

export interface OfficerResult {
  type: OfficerType;
  title: string;
  description: string;
  traits: string[];
  emoji: string;
  color: string;
  meme: string; // fun one-liner "meme" caption shown on result
  funFact: string; // a fun fact about the role
}

// ─── Utility: shuffle an array (Fisher-Yates) ────────────────────────────────
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Utility: pick N random questions and shuffle each question's answers ─────
export function getRandomQuestions(n: number): Question[] {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, n).map((q) => ({
    ...q,
    answers: shuffleArray(q.answers),
  }));
}

// ─── All 60 questions ─────────────────────────────────────────────────────────
export const questions: Question[] = [
  // ── Round 1: Classic personality ─────────────────────────────────
  {
    id: 1,
    question: "What's your go-to role in a group project?",
    emoji: "👥",
    answers: [
      { text: "Making sure the budget stays on track", scores: { Finance: 3 } },
      { text: "Creating the slides and making it look amazing", scores: { Marketing: 3 } },
      { text: "Building the actual project or website", scores: { Technology: 3 } },
      { text: "Coordinating everyone's tasks and deadlines", scores: { Operations: 3 } },
      { text: "Making sure the team vibes and feels supported", scores: { Community: 3 } },
      { text: "Pitching the idea and hyping up the audience", scores: { "Industry Relations": 3 } },
    ],
  },
  {
    id: 2,
    question: "Pick a weekend activity:",
    emoji: "🗓️",
    answers: [
      { text: "Tracking my personal budget or investments", scores: { Finance: 3 } },
      { text: "Shooting photos or designing something creative", scores: { Marketing: 3 } },
      { text: "Coding a side project or exploring new tech", scores: { Technology: 3 } },
      {
        text: "Planning a trip or organizing a group event",
        scores: { Operations: 2, Community: 1 },
      },
      { text: "Hosting a game night or social gathering", scores: { Community: 3 } },
      { text: "Attending a networking or industry event", scores: { "Industry Relations": 3 } },
    ],
  },
  {
    id: 3,
    question: "Your friends would describe you as:",
    emoji: "🪞",
    answers: [
      { text: "The responsible one who always knows the numbers", scores: { Finance: 3 } },
      { text: "The creative one with an eye for aesthetics", scores: { Marketing: 3 } },
      { text: "The techy one everyone calls when WiFi breaks", scores: { Technology: 3 } },
      { text: "The organized one with a plan for everything", scores: { Operations: 3 } },
      {
        text: "The social butterfly who knows everyone",
        scores: { Community: 2, "Industry Relations": 1 },
      },
      {
        text: "The connector who makes introductions happen",
        scores: { "Industry Relations": 2, Community: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "What kind of event would you most enjoy running?",
    emoji: "🎪",
    answers: [
      { text: "A budgeting or financial literacy workshop", scores: { Finance: 3 } },
      { text: "A social mixer or game night for members", scores: { Community: 3 } },
      { text: "A hackathon or coding competition", scores: { Technology: 3 } },
      { text: "A corporate info session or networking night", scores: { "Industry Relations": 3 } },
      { text: "A photoshoot or marketing campaign launch", scores: { Marketing: 3 } },
      { text: "The semester kickoff logistics and coordination", scores: { Operations: 3 } },
    ],
  },
  {
    id: 5,
    question: "Which skill are you most proud of?",
    emoji: "🏆",
    answers: [
      { text: "Spreadsheets and financial modeling", scores: { Finance: 3 } },
      { text: "Graphic design and content creation", scores: { Marketing: 3 } },
      { text: "Coding and building things from scratch", scores: { Technology: 3 } },
      { text: "Project management and keeping plans on track", scores: { Operations: 3 } },
      { text: "Making people feel included and welcome", scores: { Community: 3 } },
      {
        text: "Networking and building professional relationships",
        scores: { "Industry Relations": 3 },
      },
    ],
  },
  {
    id: 6,
    question: "It's 2 AM before a big club event. What are you doing?",
    emoji: "🌙",
    answers: [
      { text: "Double-checking the budget and reimbursements", scores: { Finance: 3 } },
      { text: "Finishing promo graphics and scheduling posts", scores: { Marketing: 3 } },
      { text: "Fixing a last-minute bug on the club's website", scores: { Technology: 3 } },
      { text: "Confirming logistics so nothing falls through", scores: { Operations: 3 } },
      { text: "Texting members to hype them up for tomorrow", scores: { Community: 3 } },
      { text: "Following up with the sponsor rep on details", scores: { "Industry Relations": 3 } },
    ],
  },
  {
    id: 7,
    question: "What career path excites you most?",
    emoji: "🚀",
    answers: [
      { text: "Investment banking, fintech, or startup finance", scores: { Finance: 3 } },
      { text: "UX/UI design or product marketing", scores: { Marketing: 3 } },
      { text: "Software engineering or data science", scores: { Technology: 3 } },
      { text: "Product management or consulting", scores: { Operations: 2, Technology: 1 } },
      { text: "Community management or non-profit work", scores: { Community: 3 } },
      { text: "Business development or account management", scores: { "Industry Relations": 3 } },
    ],
  },
  {
    id: 8,
    question: "Where do you spend most of your time online?",
    emoji: "📱",
    answers: [
      {
        text: "LinkedIn — following market and industry news",
        scores: { "Industry Relations": 2, Finance: 1 },
      },
      { text: "Instagram or TikTok — for visuals and trends", scores: { Marketing: 3 } },
      { text: "GitHub, Hacker News, or tech blogs", scores: { Technology: 3 } },
      {
        text: "I have a spreadsheet for tracking everything",
        scores: { Finance: 2, Operations: 1 },
      },
      { text: "Discord or group chats with my communities", scores: { Community: 3 } },
      { text: "All of them — I manage our announcements", scores: { Operations: 2, Marketing: 1 } },
    ],
  },
  {
    id: 9,
    question: "What would make you proudest at the end of your officer term?",
    emoji: "🌟",
    answers: [
      { text: "Growing SoDA's budget and securing new funding", scores: { Finance: 3 } },
      {
        text: "A stunning rebrand or social media presence",
        scores: { Marketing: 2, Technology: 1 },
      },
      { text: "Shipping a tool that members use every single day", scores: { Technology: 3 } },
      { text: "A flawless semester with zero logistical issues", scores: { Operations: 3 } },
      { text: "Seeing new members become lifelong friends", scores: { Community: 3 } },
      {
        text: "Closing a major new corporate sponsorship deal",
        scores: { "Industry Relations": 3 },
      },
    ],
  },
  {
    id: 10,
    question: "Pick a superpower that fits you best:",
    emoji: "⚡",
    answers: [
      { text: "Always knowing exactly where every dollar went", scores: { Finance: 3 } },
      { text: "Making anything look incredible instantly", scores: { Marketing: 3 } },
      { text: "Debugging any code in seconds", scores: { Technology: 3 } },
      { text: "Never missing a deadline or dropping a ball", scores: { Operations: 3 } },
      { text: "Making anyone feel like they belong", scores: { Community: 3 } },
      { text: "Convincing anyone of anything in 60 seconds", scores: { "Industry Relations": 3 } },
    ],
  },

  // ── Round 2: Scenarios ─────────────────────────────────────────────
  {
    id: 11,
    question: "A company approaches SoDA for a partnership. What's your first instinct?",
    emoji: "🏢",
    answers: [
      {
        text: "Research their reputation and financial terms",
        scores: { Finance: 2, "Industry Relations": 1 },
      },
      {
        text: "Ask what they can offer and what SoDA gets back",
        scores: { "Industry Relations": 3 },
      },
      {
        text: "See if they'd sponsor a tech workshop",
        scores: { Technology: 2, "Industry Relations": 1 },
      },
      { text: "Think about how it benefits our members", scores: { Community: 2, Operations: 1 } },
      { text: "Imagine the co-branded marketing opportunities", scores: { Marketing: 3 } },
      { text: "Draft a structured partnership agreement", scores: { Operations: 2, Finance: 1 } },
    ],
  },
  {
    id: 12,
    question: "How do you feel about public speaking?",
    emoji: "🎤",
    answers: [
      {
        text: "I rehearse every line and have backup notes",
        scores: { Operations: 2, Finance: 1 },
      },
      {
        text: "I love it — I'm energized by the crowd",
        scores: { Community: 2, "Industry Relations": 1 },
      },
      { text: "I prefer presenting data and results", scores: { Finance: 2, Technology: 1 } },
      { text: "I thrive when pitching to professionals", scores: { "Industry Relations": 3 } },
      { text: "I love presenting creative work and campaigns", scores: { Marketing: 3 } },
      { text: "I prefer live demos over static slides", scores: { Technology: 3 } },
    ],
  },
  {
    id: 13,
    question: "You're designing SoDA's next big event. What's your first step?",
    emoji: "🎉",
    answers: [
      { text: "Draft a budget and cost estimate", scores: { Finance: 3 } },
      { text: "Create a timeline and task list", scores: { Operations: 3 } },
      { text: "Reach out to companies for sponsorship", scores: { "Industry Relations": 3 } },
      { text: "Think about the theme and visual design", scores: { Marketing: 3 } },
      { text: "Survey members about what they want", scores: { Community: 3 } },
      { text: "Plan the tech setup and interactive elements", scores: { Technology: 3 } },
    ],
  },
  {
    id: 14,
    question: "Your favorite class in school is:",
    emoji: "📚",
    answers: [
      { text: "Accounting or corporate finance", scores: { Finance: 3 } },
      { text: "Statistics or data structures", scores: { Technology: 2, Finance: 1 } },
      { text: "Project management or systems thinking", scores: { Operations: 3 } },
      { text: "Business communications or negotiations", scores: { "Industry Relations": 3 } },
      { text: "Social psychology or sociology", scores: { Community: 3 } },
      { text: "Digital media or graphic design", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 15,
    question: "A new member joins SoDA looking nervous. What do you do?",
    emoji: "👋",
    answers: [
      { text: "Introduce them to other members personally", scores: { Community: 3 } },
      {
        text: "Walk them through how the club is organized",
        scores: { Operations: 2, Community: 1 },
      },
      { text: "Ask what tech stack they're learning", scores: { Technology: 2, Community: 1 } },
      {
        text: "Tell them about career and networking opportunities",
        scores: { "Industry Relations": 2, Community: 1 },
      },
      { text: "Add them to all the group chats right away", scores: { Community: 3 } },
      {
        text: "Make sure they get our socials and newsletter",
        scores: { Marketing: 2, Community: 1 },
      },
    ],
  },
  {
    id: 16,
    question: "Pick the app you couldn't live without:",
    emoji: "📲",
    answers: [
      { text: "Mint or YNAB — budgeting tools", scores: { Finance: 3 } },
      { text: "Notion or Asana — planning tools", scores: { Operations: 3 } },
      { text: "LinkedIn — networking", scores: { "Industry Relations": 3 } },
      { text: "VS Code or GitHub — coding", scores: { Technology: 3 } },
      { text: "Canva or Adobe — design", scores: { Marketing: 3 } },
      { text: "Discord or Slack — community", scores: { Community: 3 } },
    ],
  },
  {
    id: 17,
    question: "You're asked to lead a 5-person sub-team. What do you do first?",
    emoji: "🧭",
    answers: [
      { text: "Create a shared budget sheet for team expenses", scores: { Finance: 3 } },
      { text: "Set clear goals and deadlines for everyone", scores: { Operations: 3 } },
      { text: "Build rapport and get to know each person", scores: { Community: 3 } },
      { text: "Map out everyone's technical strengths", scores: { Technology: 2, Operations: 1 } },
      {
        text: "Draft a pitch for what we're building together",
        scores: { Marketing: 2, "Industry Relations": 1 },
      },
      {
        text: "Establish a network of external contacts to help",
        scores: { "Industry Relations": 3 },
      },
    ],
  },
  {
    id: 18,
    question: "What does 'success' look like for SoDA?",
    emoji: "🎯",
    answers: [
      { text: "Financial sustainability and a growing budget", scores: { Finance: 3 } },
      { text: "Perfectly executed events every semester", scores: { Operations: 3 } },
      { text: "Members landing internships at top companies", scores: { "Industry Relations": 3 } },
      { text: "Cutting-edge projects and workshops", scores: { Technology: 3 } },
      { text: "Members who feel like they truly belong", scores: { Community: 3 } },
      { text: "SoDA trending on social media", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 19,
    question: "A major sponsor drops out a week before an event. What do you do?",
    emoji: "😱",
    answers: [
      { text: "Immediately assess the financial gap", scores: { Finance: 3 } },
      {
        text: "Renegotiate with backup vendors to cover it",
        scores: { Operations: 2, Finance: 1 },
      },
      {
        text: "Cold-call three other companies that same day",
        scores: { "Industry Relations": 3 },
      },
      {
        text: "Scale down the event production elegantly",
        scores: { Operations: 2, Marketing: 1 },
      },
      { text: "Rally members so team morale stays high", scores: { Community: 3 } },
      { text: "Build a quick emergency landing page", scores: { Technology: 2, Marketing: 1 } },
    ],
  },
  {
    id: 20,
    question: "What's your biggest pet peeve at a club meeting?",
    emoji: "😤",
    answers: [
      { text: "No agenda and total wasted time", scores: { Operations: 3 } },
      { text: "Nobody following up on action items", scores: { Operations: 2, Finance: 1 } },
      { text: "No energy or excitement from the team", scores: { Community: 3 } },
      { text: "Presentations with terrible design", scores: { Marketing: 3 } },
      {
        text: "Talking about partnerships without a real plan",
        scores: { "Industry Relations": 2, Finance: 1 },
      },
      { text: "Outdated spreadsheets and broken tools", scores: { Technology: 2, Finance: 1 } },
    ],
  },

  // ── Round 3: Values & style ────────────────────────────────────────
  {
    id: 21,
    question: "Which quote resonates most with you?",
    emoji: "💬",
    answers: [
      { text: '"In God we trust; all others bring data."', scores: { Finance: 2, Technology: 1 } },
      { text: '"Failing to plan is planning to fail."', scores: { Operations: 3 } },
      { text: '"Your network is your net worth."', scores: { "Industry Relations": 3 } },
      { text: '"Think different."', scores: { Technology: 2, Marketing: 1 } },
      { text: '"Be the change you wish to see."', scores: { Community: 3 } },
      {
        text: '"Design is how it works, not just how it looks."',
        scores: { Marketing: 2, Technology: 1 },
      },
    ],
  },
  {
    id: 22,
    question: "Which best describes your note-taking style?",
    emoji: "📝",
    answers: [
      { text: "Color-coded budgets and financial summaries", scores: { Finance: 3 } },
      { text: "Detailed to-do lists with due dates", scores: { Operations: 3 } },
      { text: "Names, companies, and follow-up reminders", scores: { "Industry Relations": 3 } },
      { text: "Diagrams, pseudocode, and system maps", scores: { Technology: 3 } },
      { text: "Reflections, feelings, and people's stories", scores: { Community: 3 } },
      { text: "Mood boards and design inspo screenshots", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 23,
    question: "You're at a professional conference. What are you doing?",
    emoji: "🎟️",
    answers: [
      { text: "Calculating the ROI of attending", scores: { Finance: 2, "Industry Relations": 1 } },
      { text: "Scheduling every talk and session in advance", scores: { Operations: 3 } },
      { text: "Collecting every recruiter's card", scores: { "Industry Relations": 3 } },
      { text: "Attending every deep-dive technical session", scores: { Technology: 3 } },
      { text: "Making new friends at every coffee break", scores: { Community: 3 } },
      { text: "Posting live updates to our socials", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 24,
    question: "If you had to describe your work style in one word:",
    emoji: "🧬",
    answers: [
      { text: "Precise", scores: { Finance: 3 } },
      { text: "Systematic", scores: { Operations: 3 } },
      { text: "Persuasive", scores: { "Industry Relations": 3 } },
      { text: "Analytical", scores: { Technology: 2, Finance: 1 } },
      { text: "Empathetic", scores: { Community: 3 } },
      { text: "Expressive", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 25,
    question: "You have $5,000 budget for the semester. How do you use it?",
    emoji: "💵",
    answers: [
      { text: "Track every penny with a detailed plan", scores: { Finance: 3 } },
      { text: "Allocate it across events by priority", scores: { Operations: 3 } },
      {
        text: "Invest in one big sponsored showcase event",
        scores: { "Industry Relations": 2, Community: 1 },
      },
      { text: "Buy tools, licenses, and cloud credits", scores: { Technology: 3 } },
      { text: "Throw the most inclusive social events possible", scores: { Community: 3 } },
      { text: "Fund a full photo and video production", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 26,
    question: "How do you measure if an event was a success?",
    emoji: "📊",
    answers: [
      { text: "Whether it came in at or under budget", scores: { Finance: 3 } },
      { text: "Whether it ran on time and exactly as planned", scores: { Operations: 3 } },
      { text: "Whether sponsors said they were happy", scores: { "Industry Relations": 3 } },
      {
        text: "Whether the tech ran without a single issue",
        scores: { Technology: 2, Operations: 1 },
      },
      { text: "Whether attendees said they felt welcome", scores: { Community: 3 } },
      { text: "Whether social media engagement spiked", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 27,
    question: "Which best describes you in a meeting?",
    emoji: "🪑",
    answers: [
      { text: "The one who brings data to every discussion", scores: { Finance: 3 } },
      { text: "The one who keeps everything on track", scores: { Operations: 3 } },
      { text: "The one who knows everyone in the room", scores: { "Industry Relations": 3 } },
      { text: "The one with all the technical answers", scores: { Technology: 3 } },
      { text: "The one making sure no one feels left out", scores: { Community: 3 } },
      { text: "The one with the best-looking slides", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 28,
    question: "Which role would you want at a startup?",
    emoji: "🏗️",
    answers: [
      { text: "CFO or Financial Analyst", scores: { Finance: 3 } },
      { text: "COO or Operations Lead", scores: { Operations: 3 } },
      { text: "Head of Partnerships or Biz Dev", scores: { "Industry Relations": 3 } },
      { text: "CTO or Senior Engineer", scores: { Technology: 3 } },
      { text: "Head of Culture or Community Lead", scores: { Community: 3 } },
      { text: "CMO or Brand Director", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 29,
    question: "Pick a book you'd actually read:",
    emoji: "📖",
    answers: [
      { text: '"The Intelligent Investor" — Benjamin Graham', scores: { Finance: 3 } },
      { text: '"Getting Things Done" — David Allen', scores: { Operations: 3 } },
      { text: '"Never Split the Difference" — Chris Voss', scores: { "Industry Relations": 3 } },
      { text: '"Clean Code" — Robert Martin', scores: { Technology: 3 } },
      { text: '"Braving the Wilderness" — Brené Brown', scores: { Community: 3 } },
      { text: '"Steal Like an Artist" — Austin Kleon', scores: { Marketing: 3 } },
    ],
  },
  {
    id: 30,
    question: "What frustrates you most about poorly run clubs?",
    emoji: "😩",
    answers: [
      { text: "They waste money with zero accountability", scores: { Finance: 3 } },
      { text: "Nothing is ever organized or consistent", scores: { Operations: 3 } },
      { text: "They don't engage with industry at all", scores: { "Industry Relations": 3 } },
      { text: "The tech is broken and nothing ever gets built", scores: { Technology: 3 } },
      { text: "People feel excluded or uninvolved", scores: { Community: 3 } },
      { text: "The branding looks like it was made in 2009", scores: { Marketing: 3 } },
    ],
  },

  // ── Round 4: More scenarios ────────────────────────────────────────
  {
    id: 31,
    question: "SoDA's monthly newsletter is going out. What's your contribution?",
    emoji: "📨",
    answers: [
      { text: "A summary of financials and funding updates", scores: { Finance: 3 } },
      { text: "An overview of all this month's events", scores: { Operations: 2, Community: 1 } },
      { text: "A spotlight on a sponsor or industry partner", scores: { "Industry Relations": 3 } },
      { text: "A tutorial or helpful tech resource", scores: { Technology: 3 } },
      { text: "A member story or community spotlight", scores: { Community: 3 } },
      { text: "The design, layout, and editorial direction", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 32,
    question: "You're onboarding a new officer. How do you do it?",
    emoji: "🎓",
    answers: [
      {
        text: "Walk them through the budget and financials",
        scores: { Finance: 2, Operations: 1 },
      },
      { text: "Set up a 30/60/90 day plan for them", scores: { Operations: 3 } },
      { text: "Introduce them to all our industry contacts", scores: { "Industry Relations": 3 } },
      { text: "Give them access to all tools and repos", scores: { Technology: 2, Operations: 1 } },
      { text: "Take them to a team hangout first", scores: { Community: 3 } },
      {
        text: "Share all the brand guidelines and assets",
        scores: { Marketing: 2, Operations: 1 },
      },
    ],
  },
  {
    id: 33,
    question: "It's the first week of a new semester. What's your priority?",
    emoji: "📅",
    answers: [
      { text: "Update the budget with new projections", scores: { Finance: 3 } },
      { text: "Rebuild the semester calendar and plan", scores: { Operations: 3 } },
      { text: "Set up new meetings with companies", scores: { "Industry Relations": 3 } },
      { text: "Spin up the new tech stack for the year", scores: { Technology: 3 } },
      { text: "Host a welcome event for returning members", scores: { Community: 3 } },
      { text: "Refresh the visual identity for the new year", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 34,
    question: "What's your approach when a project is running over schedule?",
    emoji: "⏰",
    answers: [
      {
        text: "Check if we can reallocate budget to fix it",
        scores: { Finance: 2, Operations: 1 },
      },
      { text: "Build a revised timeline immediately", scores: { Operations: 3 } },
      {
        text: "Loop in stakeholders so expectations are managed",
        scores: { "Industry Relations": 2, Operations: 1 },
      },
      { text: "Stay late to crunch through the technical debt", scores: { Technology: 3 } },
      { text: "Boost team morale so they don't burn out", scores: { Community: 3 } },
      {
        text: "Draft comms so the audience stays informed",
        scores: { Marketing: 2, Operations: 1 },
      },
    ],
  },
  {
    id: 35,
    question: "How do you feel about ambiguity?",
    emoji: "🌫️",
    answers: [
      { text: "I quantify the uncertainty to make it manageable", scores: { Finance: 3 } },
      { text: "I create structure to reduce it immediately", scores: { Operations: 3 } },
      { text: "I use relationships to navigate it", scores: { "Industry Relations": 3 } },
      { text: "I prototype and test until things are clearer", scores: { Technology: 3 } },
      { text: "I lean on the team's collective wisdom", scores: { Community: 3 } },
      { text: "I embrace it — that's where creativity lives", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 36,
    question: "SoDA just hit 500 members. How do you celebrate?",
    emoji: "🎊",
    answers: [
      { text: "Share a financial milestone report publicly", scores: { Finance: 2, Marketing: 1 } },
      { text: "Organize a 500-member celebration event", scores: { Operations: 2, Community: 1 } },
      {
        text: "Pitch it to companies as a sponsorship moment",
        scores: { "Industry Relations": 3 },
      },
      { text: "Build a live member count dashboard on the site", scores: { Technology: 3 } },
      { text: "Throw the biggest social event of the year", scores: { Community: 3 } },
      { text: "Drop a hype reel on all our socials", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 37,
    question: "How do you handle conflict in a team?",
    emoji: "🤜🤛",
    answers: [
      { text: "Trace back to what went wrong structurally", scores: { Finance: 2, Operations: 1 } },
      { text: "Create a structured resolution process", scores: { Operations: 3 } },
      { text: "Negotiate a solution both sides can accept", scores: { "Industry Relations": 3 } },
      { text: "Debug the root cause systematically", scores: { Technology: 2, Operations: 1 } },
      { text: "Check in with each person privately first", scores: { Community: 3 } },
      { text: "Reframe the narrative for the whole team", scores: { Marketing: 2, Community: 1 } },
    ],
  },
  {
    id: 38,
    question: "Which emoji is most 'you'?",
    emoji: "😎",
    answers: [
      { text: "📊 Charts and financial data", scores: { Finance: 3 } },
      { text: "✅ Checkboxes and task lists", scores: { Operations: 3 } },
      { text: "🤝 Handshakes and deals", scores: { "Industry Relations": 3 } },
      { text: "⌨️ Keyboards and code", scores: { Technology: 3 } },
      { text: "💬 Conversations and community", scores: { Community: 3 } },
      { text: "✨ Creative sparkle vibes", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 39,
    question: "What's your go-to after a long week of club work?",
    emoji: "😌",
    answers: [
      { text: "Reviewing next week's budget and numbers", scores: { Finance: 3 } },
      { text: "Updating my task board and clearing inboxes", scores: { Operations: 3 } },
      { text: "Coffee chat with an industry contact", scores: { "Industry Relations": 3 } },
      { text: "Working on a personal side project", scores: { Technology: 3 } },
      { text: "Hanging out with the friend group from club", scores: { Community: 3 } },
      { text: "Exploring new design trends for inspiration", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 40,
    question: "What legacy do you want to leave after your officer term?",
    emoji: "🏛️",
    answers: [
      { text: "A transparent, well-funded, financially stable club", scores: { Finance: 3 } },
      { text: "Processes and docs that outlast my tenure", scores: { Operations: 3 } },
      {
        text: "Partnerships that open doors for years to come",
        scores: { "Industry Relations": 3 },
      },
      { text: "Tools and code that members still use daily", scores: { Technology: 3 } },
      { text: "A culture where every member belongs", scores: { Community: 3 } },
      { text: "A brand people instantly recognize and love", scores: { Marketing: 3 } },
    ],
  },

  // ── Round 5: Deep cuts ────────────────────────────────────────────
  {
    id: 41,
    question: "If SoDA made a documentary, which part would feature you?",
    emoji: "🎬",
    answers: [
      { text: "Reviewing the budget with the VP Finance", scores: { Finance: 3 } },
      { text: "The behind-the-scenes logistics montage", scores: { Operations: 3 } },
      { text: "The handshake scene with a Fortune 500 rep", scores: { "Industry Relations": 3 } },
      { text: "Late-night coding before a big launch", scores: { Technology: 3 } },
      { text: "The part where everyone's laughing together", scores: { Community: 3 } },
      { text: "The iconic visual montages and promo reel", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 42,
    question: "A club member says the events feel repetitive. You:",
    emoji: "🔄",
    answers: [
      {
        text: "Check if the budget allows for something new",
        scores: { Finance: 2, Operations: 1 },
      },
      { text: "Restructure the event calendar strategically", scores: { Operations: 3 } },
      { text: "Invite a company to co-host something fresh", scores: { "Industry Relations": 3 } },
      { text: "Propose a hackathon or build night", scores: { Technology: 3 } },
      { text: "Poll members on what they actually want", scores: { Community: 3 } },
      { text: "Brainstorm a totally new event concept", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 43,
    question: "What's the most important thing SoDA can do for its members?",
    emoji: "💎",
    answers: [
      { text: "Provide financial literacy and scholarship support", scores: { Finance: 3 } },
      { text: "Run events smoothly so members show up reliably", scores: { Operations: 3 } },
      { text: "Connect them directly to companies that hire", scores: { "Industry Relations": 3 } },
      { text: "Teach them technical skills that matter", scores: { Technology: 3 } },
      { text: "Make them feel like part of something real", scores: { Community: 3 } },
      { text: "Help them build a personal brand and portfolio", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 44,
    question: "Pick the leadership style you relate to most:",
    emoji: "👑",
    answers: [
      { text: "Steward — protecting the org's resources", scores: { Finance: 3 } },
      { text: "Commander — leading execution flawlessly", scores: { Operations: 3 } },
      { text: "Ambassador — representing us to the world", scores: { "Industry Relations": 3 } },
      { text: "Architect — building systems that scale", scores: { Technology: 3 } },
      { text: "Coach — growing people and culture", scores: { Community: 3 } },
      { text: "Visionary — inspiring with bold ideas", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 45,
    question: "What's your favorite part of a new semester?",
    emoji: "🌱",
    answers: [
      { text: "Planning the new budget from scratch", scores: { Finance: 3 } },
      { text: "Setting the semester calendar and milestones", scores: { Operations: 3 } },
      { text: "Reconnecting with our industry contacts", scores: { "Industry Relations": 3 } },
      { text: "Deciding what we're going to build this year", scores: { Technology: 3 } },
      { text: "Meeting all the new members who just joined", scores: { Community: 3 } },
      { text: "Refreshing the brand and content strategy", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 46,
    question: "Which would you rather build for SoDA?",
    emoji: "🔨",
    answers: [
      { text: "A financial tracking and reporting dashboard", scores: { Finance: 3 } },
      { text: "A project and task management system", scores: { Operations: 3 } },
      {
        text: "A corporate partnerships and contacts database",
        scores: { "Industry Relations": 2, Technology: 1 },
      },
      { text: "An internal tool the whole team uses daily", scores: { Technology: 3 } },
      {
        text: "A community platform where members connect",
        scores: { Community: 2, Technology: 1 },
      },
      {
        text: "A stunning website redesign with a fresh brand",
        scores: { Marketing: 2, Technology: 1 },
      },
    ],
  },
  {
    id: 47,
    question: "You have 2 free hours. What are you working on for SoDA?",
    emoji: "⌛",
    answers: [
      { text: "Updating the financial projections", scores: { Finance: 3 } },
      { text: "Cleaning up internal docs and SOPs", scores: { Operations: 3 } },
      { text: "Drafting a cold outreach to a new company", scores: { "Industry Relations": 3 } },
      { text: "Building a feature or fixing a bug", scores: { Technology: 3 } },
      { text: "Planning a low-key hangout for officers", scores: { Community: 3 } },
      { text: "Designing the next Instagram carousel", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 48,
    question: "Pick the best way to recruit new SoDA members:",
    emoji: "📣",
    answers: [
      {
        text: "Analyze which channels brought members last year",
        scores: { Finance: 1, Operations: 2 },
      },
      {
        text: "Reach out to CS professors for class announcements",
        scores: { Operations: 2, Community: 1 },
      },
      {
        text: "Partner with companies to host a recruiting event",
        scores: { "Industry Relations": 3 },
      },
      { text: "Build a cool interactive demo to show what we make", scores: { Technology: 3 } },
      { text: "Set up a booth with engaging social activities", scores: { Community: 3 } },
      { text: "Create a polished promotional video", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 49,
    question: "How do you prepare for a presentation to executives?",
    emoji: "📋",
    answers: [
      { text: "Run the numbers until they're completely airtight", scores: { Finance: 3 } },
      {
        text: "Rehearse with timed run-throughs and backup plans",
        scores: { Operations: 2, Marketing: 1 },
      },
      { text: "Research the audience and tailor every slide", scores: { "Industry Relations": 3 } },
      { text: "Build a live interactive demo to show — not tell", scores: { Technology: 3 } },
      { text: "Craft a story that connects emotionally", scores: { Community: 2, Marketing: 1 } },
      { text: "Polish the deck until every slide is perfect", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 50,
    question: "What's your relationship with deadlines?",
    emoji: "🗓️",
    answers: [
      {
        text: "I set financial checkpoints before the deadline",
        scores: { Finance: 2, Operations: 1 },
      },
      { text: "I work backward from the deadline to plan", scores: { Operations: 3 } },
      {
        text: "I set the deadline around what works for all parties",
        scores: { "Industry Relations": 2, Operations: 1 },
      },
      {
        text: "I automate reminders so I never miss them",
        scores: { Technology: 2, Operations: 1 },
      },
      {
        text: "I check in with teammates so we stay aligned",
        scores: { Community: 2, Operations: 1 },
      },
      {
        text: "I do my most inspired work right before it's due",
        scores: { Marketing: 2, Community: 1 },
      },
    ],
  },

  // ── Round 6: Fun & personality ────────────────────────────────────
  {
    id: 51,
    question: "You find $20 in an old jacket. What do you do?",
    emoji: "💸",
    answers: [
      { text: "Add it to my budget spreadsheet immediately", scores: { Finance: 3 } },
      {
        text: "Use it for something I had already planned to buy",
        scores: { Operations: 2, Finance: 1 },
      },
      { text: "Take someone out for coffee and network", scores: { "Industry Relations": 3 } },
      { text: "Buy a domain name for a new project idea", scores: { Technology: 3 } },
      { text: "Treat the squad to boba", scores: { Community: 3 } },
      { text: "Buy art supplies or a new design tool subscription", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 52,
    question: "Your group chat just blew up with 47 unread messages. What is it about?",
    emoji: "💬",
    answers: [
      { text: "Panic about the club's latest purchase request", scores: { Finance: 3 } },
      { text: "Someone forgot a deadline and chaos ensued", scores: { Operations: 3 } },
      {
        text: "A company just cold DM'd us wanting to partner",
        scores: { "Industry Relations": 3 },
      },
      { text: "The website is down and no one knows why", scores: { Technology: 3 } },
      { text: "Planning an impromptu hangout for tonight", scores: { Community: 3 } },
      { text: "Debating the new poster design for the event", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 53,
    question: "Pick the vibe of your ideal workspace:",
    emoji: "🖥️",
    answers: [
      {
        text: "Clean desk, dual monitors, nothing out of place",
        scores: { Finance: 2, Operations: 1 },
      },
      { text: "Whiteboards everywhere, sticky notes, master plan", scores: { Operations: 3 } },
      { text: "Conference room with glass walls and a view", scores: { "Industry Relations": 3 } },
      { text: "Dark mode everything, mechanical keyboard, dev setup", scores: { Technology: 3 } },
      { text: "Cozy couch, communal table, everyone working together", scores: { Community: 3 } },
      { text: "Aesthetic studio vibes, plants, warm lighting, Spotify", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 54,
    question: "Which animal best represents you at work?",
    emoji: "🐾",
    answers: [
      { text: "🦅 Eagle — sharp-eyed and precise", scores: { Finance: 3 } },
      { text: "🐜 Ant — systematic and built for execution", scores: { Operations: 3 } },
      { text: "🦊 Fox — clever and always networking", scores: { "Industry Relations": 3 } },
      { text: "🐙 Octopus — multi-tasking technical wizard", scores: { Technology: 3 } },
      { text: "🐬 Dolphin — social, collaborative, emotionally smart", scores: { Community: 3 } },
      { text: "🦚 Peacock — stunning, expressive, and unforgettable", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 55,
    question: "It's club elections. What do you run on?",
    emoji: "🗳️",
    answers: [
      { text: '"I will make every dollar count."', scores: { Finance: 3 } },
      { text: '"I will make sure everything actually runs."', scores: { Operations: 3 } },
      {
        text: '"I will open doors you didn\'t know existed."',
        scores: { "Industry Relations": 3 },
      },
      { text: '"I will build things that outlast me."', scores: { Technology: 3 } },
      { text: '"I will make SoDA feel like home for everyone."', scores: { Community: 3 } },
      { text: '"I will make SoDA impossible to ignore."', scores: { Marketing: 3 } },
    ],
  },
  {
    id: 56,
    question: "What's the first thing you do after joining a new club?",
    emoji: "🆕",
    answers: [
      { text: "Ask about the club's budget and funding model", scores: { Finance: 3 } },
      { text: "Ask for the onboarding docs and timeline", scores: { Operations: 3 } },
      { text: "Connect with every officer on LinkedIn", scores: { "Industry Relations": 3 } },
      { text: "Check out the codebase or internal tools", scores: { Technology: 3 } },
      { text: "Introduce myself to as many people as possible", scores: { Community: 3 } },
      { text: "Check the social media and give honest feedback", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 57,
    question: "Pick a pizza topping that represents your vibe:",
    emoji: "🍕",
    answers: [
      {
        text: "Plain cheese — reliable, no-nonsense, always works",
        scores: { Finance: 2, Operations: 1 },
      },
      { text: "Pepperoni — classic, well-organized, always on point", scores: { Operations: 3 } },
      {
        text: "Prosciutto — upscale, professional, makes a statement",
        scores: { "Industry Relations": 3 },
      },
      { text: "Extra garlic — intense, bold, built different", scores: { Technology: 3 } },
      { text: "Hawaiian — controversial but beloved by the whole squad", scores: { Community: 3 } },
      { text: "Truffle oil and arugula — aesthetic, trendy, iconic", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 58,
    question: 'A reporter asks: "What makes SoDA special?" You say:',
    emoji: "📰",
    answers: [
      {
        text: '"We\'re one of the most financially sustainable student orgs at ASU."',
        scores: { Finance: 3 },
      },
      { text: '"Our events run like clockwork and never disappoint."', scores: { Operations: 3 } },
      {
        text: '"Our alumni are at Google, Amazon, Goldman — and they come back to help."',
        scores: { "Industry Relations": 3 },
      },
      { text: '"We build real things. Actual software. Real tools."', scores: { Technology: 3 } },
      { text: "\"Once you're in SoDA, you're never alone.\"", scores: { Community: 3 } },
      {
        text: "\"Walk past our booth — you'll know it's us instantly.\"",
        scores: { Marketing: 3 },
      },
    ],
  },
  {
    id: 59,
    question: "Which vibe fits how you work under pressure?",
    emoji: "🔥",
    answers: [
      { text: "Cool and calm — I just look at the numbers", scores: { Finance: 3 } },
      { text: "Focused — I go straight to the checklist", scores: { Operations: 3 } },
      {
        text: "Diplomatic — I get on a call and make it work",
        scores: { "Industry Relations": 3 },
      },
      { text: "In the zone — I start debugging everything", scores: { Technology: 3 } },
      { text: "Rallying — I check on the team first", scores: { Community: 3 } },
      { text: "Creative — pressure unlocks my best ideas", scores: { Marketing: 3 } },
    ],
  },
  {
    id: 60,
    question: "What would your officer Spotify playlist be called?",
    emoji: "🎵",
    answers: [
      { text: '"Spreadsheets & Chill"', scores: { Finance: 3 } },
      { text: '"Task Completed. Next."', scores: { Operations: 3 } },
      { text: '"Networking Szn"', scores: { "Industry Relations": 3 } },
      { text: '"lo-fi to debug to"', scores: { Technology: 3 } },
      { text: '"Squad Goals Only"', scores: { Community: 3 } },
      { text: '"Main Character Energy"', scores: { Marketing: 3 } },
    ],
  },
];

// ─── Result profiles ──────────────────────────────────────────────────────────
export const officerResults: Record<OfficerType, OfficerResult> = {
  Finance: {
    type: "Finance",
    title: "The Money Maven",
    description:
      "You're the backbone of every operation — without you, there's no budget, no events, no club. You're detail-oriented, analytical, and deeply trustworthy. As a Finance Officer, you'd manage SoDA's funding, track spending, and make sure every dollar goes where it matters most. Numbers don't lie, and neither do you.",
    traits: ["Analytical", "Responsible", "Detail-oriented"],
    emoji: "💰",
    color: "from-yellow-500 to-amber-600",
    meme: "You: *opens Excel at 1am for fun* Also you: 'it's called discipline'",
    funFact:
      "SoDA Finance Officers manage real budgets, purchase requests, and sponsorship funds — it's basically a CFO role in college form.",
  },
  Operations: {
    type: "Operations",
    title: "The Master Planner",
    description:
      "Behind every great event is someone who made sure every tiny detail was handled — that's you. You love structure, thrive on checklists, and nothing slips through the cracks on your watch. As an Operations Officer, you'd keep the whole club running like clockwork and be the reason everything just works.",
    traits: ["Organized", "Reliable", "Strategic"],
    emoji: "⚙️",
    color: "from-slate-400 to-gray-600",
    meme: "You when someone says 'we'll just figure it out day-of' 😐",
    funFact:
      "Operations Officers are literally the reason club events don't fall apart. They're the unsung heroes — until something breaks and suddenly everyone remembers their name.",
  },
  "Industry Relations": {
    type: "Industry Relations",
    title: "The Connector",
    description:
      "You light up in a room full of professionals. You're comfortable making the first move, articulating what SoDA stands for, and building relationships that open doors for our members. As an Industry Relations Officer, you'd be the bridge between SoDA and the companies that want to hire from our community.",
    traits: ["Charismatic", "Confident", "Relationship-driven"],
    emoji: "🤝",
    color: "from-blue-500 to-indigo-600",
    meme: "You at a career fair: *casually collects 12 business cards* 'Yeah I know the recruiter's dog's name'",
    funFact:
      "SoDA's Industry Relations Officers have helped connect members with internships at companies like Google, Amazon, and Goldman Sachs.",
  },
  Technology: {
    type: "Technology",
    title: "The Builder",
    description:
      "If something can be built, you'll build it — and probably make it better than expected. You think in systems, love solving problems through code, and are always two steps ahead technically. As a Technology Officer, you'd power SoDA's software, run workshops, and make hackathons happen.",
    traits: ["Innovative", "Technical", "Problem-solver"],
    emoji: "💻",
    color: "from-green-500 to-emerald-600",
    meme: "You: 'Let me just quickly automate that.' *4 hours later* You: 'okay so I may have rebuilt the whole thing'",
    funFact: "The website you're on right now? Built by SoDA Technology Officers. Meta.",
  },
  Community: {
    type: "Community",
    title: "The Heart of SoDA",
    description:
      "You're the glue that holds the club together. You have a gift for making people feel seen, welcome, and genuinely excited to show up. As a Community Officer, you'd plan the events that turn strangers into friends and make SoDA feel like home for every single member.",
    traits: ["Empathetic", "Inclusive", "Energetic"],
    emoji: "❤️",
    color: "from-rose-500 to-pink-600",
    meme: "You: *remembers everyone's name, birthday, major, and their dog's name after one meeting*",
    funFact:
      "Community Officers are the reason people actually want to keep coming back to SoDA. They turn club members into lifelong friends.",
  },
  Marketing: {
    type: "Marketing",
    title: "The Creative Director",
    description:
      "You see the world in aesthetics and stories. You know how to make something look amazing and communicate it in a way that resonates with people. As a Marketing Officer, you'd be the face of SoDA — designing graphics, managing social media, and making sure the whole world knows about the incredible things we do.",
    traits: ["Creative", "Visionary", "Trend-savvy"],
    emoji: "🎨",
    color: "from-purple-500 to-violet-600",
    meme: "You when you see a bad font pairing: 👁️👄👁️ *physically in pain*",
    funFact:
      "SoDA Marketing Officers run full social campaigns, design event assets, and shoot promotional content — basically a real agency experience.",
  },
};
