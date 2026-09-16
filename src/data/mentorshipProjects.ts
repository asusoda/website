export const projectCategories = [
  "All projects",
  "AI & learning",
  "Sustainability",
  "Everyday life",
  "Hardware",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export interface MentorshipProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, "All projects">;
  description: string;
  credit?: string;
  technologies: string[];
  original: string;
  format: "pdf" | "pptx" | "external";
  repository?: string;
}

// IDs match the source-to-preview mapping in scripts/prepare-mentorship-assets.py.
// The six Slides titles were verified against the supplied PDFs. LED Drive needs
// access; Canva blocks automated requests. Preserve their existing destinations.
export const mentorshipProjects: MentorshipProject[] = [
  {
    id: "centsible",
    title: "Centsible",
    category: "Everyday life",
    description:
      "Make sense of everyday spending. Track expenses, split a bill, and build better saving habits.",
    credit: "Sowmya · Mentor: Adithya",
    technologies: ["React", "Python", "Firebase"],
    original:
      "https://docs.google.com/presentation/d/1vI31THxieC1meoEArUugXvOTLyi6d9cRBjznbMDrcC4/edit?usp=sharing",
    format: "pdf",
  },
  {
    id: "waste-classifier",
    title: "Waste Classifier App",
    category: "Sustainability",
    description:
      "Snap a photo of waste to learn how to dispose of it and find the right drop-off locations at ASU.",
    credit: "Sargun Bhatia · Mentor: Aaditya Jindal",
    technologies: ["Python", "TensorFlow", "Streamlit"],
    original:
      "https://docs.google.com/presentation/d/1LFWdR7HNzJbx5KHx3-zSLrZsTm78KtmLeneGlnGrUw4/edit?usp=sharing",
    format: "pdf",
  },
  {
    id: "led-controller",
    title: "LED Strip Controller",
    category: "Hardware",
    description:
      "Bring code into the physical world. Control an LED strip over Wi-Fi through a custom web interface.",
    credit: "Millie Kim · Mentor: Journey Hancock",
    technologies: ["C", "ESP32", "ESP-IDF"],
    original: "https://drive.google.com/open?id=1Ao-3WdJbkPmUnTC1Pz0CJzkIUbpv1E0l",
    format: "pptx",
    repository: "https://github.com/mk8506/SoDa_LEDcontroller.git",
  },
  {
    id: "ecopulse",
    title: "EcoPulse",
    category: "Sustainability",
    description:
      "Help small cafés track waste, understand its cost, and make smarter ordering decisions.",
    credit: "Nelson Supriyasilp · Mentor: Utkarsh Byahut",
    technologies: ["Python", "Pandas", "Plotly"],
    original:
      "https://docs.google.com/presentation/d/1JX5SuBtRrCotTTZYShOoAPpleHJkNHYmgDd0h0g_Dck/edit?usp=sharing",
    format: "pdf",
    repository: "https://github.com/Nelly444/Mentorship-Project",
  },
  {
    id: "culture-bites",
    title: "Culture Bites",
    category: "Everyday life",
    description:
      "Connect guests, hosts, and cooks through shared meals and local cultural experiences.",
    credit: "Vishal Lakshmi Narayanan · Mentor: Sachin Venugopal Nair",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    original:
      "https://docs.google.com/presentation/d/1TxgRJDfrUUf2I8zSrY04ovv0vOxr6t1QTHuXQpgwR4o/edit?usp=sharing",
    format: "pdf",
  },
  {
    id: "clarityread",
    title: "ClarityRead",
    category: "AI & learning",
    description:
      "Explore academic papers with AI summaries, terminology explanations, and answers to your questions.",
    credit: "Xander Morris · Mentor: Mr. Patel",
    technologies: ["React", "Django", "Gemini"],
    original:
      "https://docs.google.com/presentation/d/1C-wiW3cu88dU725C3dWOcjnjr_rF5xb9ow5HEreYpc0/edit?usp=sharing",
    format: "pdf",
  },
  {
    id: "aegischeck",
    title: "AegisCheck",
    category: "AI & learning",
    description:
      "A device security advisor that brings OS checks, password audits, and AI risk insights into one dashboard.",
    credit: "Mentor: Utkarsh Byahut",
    technologies: ["Neural networks", "Grok API"],
    original:
      "https://docs.google.com/presentation/d/10zfAyyPBSTMyYRJ8c3B1oJjxGdeSrIPUiN6ap1XQq3o/edit?usp=sharing",
    format: "pdf",
  },
  {
    id: "career-pathway",
    title: "AI-Powered Career Pathway Recommender for Students",
    category: "AI & learning",
    description: "Explore this student career guidance project in its original Canva presentation.",
    technologies: [],
    original:
      "https://www.canva.com/design/DAG6gm_BJmk/XnDec7So2zNR9GiLKwTPIw/view?utm_content=DAG6gm_BJmk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=had2c1a6c37",
    format: "external",
  },
];

// Filtering retains the input order; no separate ranking or personalization path.
export function filterMentorshipProjects(projects: MentorshipProject[], category: ProjectCategory) {
  return category === "All projects"
    ? projects
    : projects.filter((project) => project.category === category);
}
