import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowUpRight, BookOpen, ChevronDown, Code2, Users } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  filterMentorshipProjects,
  mentorshipProjects,
  projectCategories,
  type ProjectCategory,
} from "../data/mentorshipProjects";
import ProjectPresentation from "../components/Mentorship/ProjectPresentation";
import "./Mentorship.css";

const signup = {
  mentee: "https://forms.gle/Feu2GAfWQmashLZm9",
  mentor: "https://forms.gle/xtks7VpbyLHcy2XY9",
};
const roles = {
  mentee: {
    title: "Your idea. A mentor in your corner.",
    description:
      "Connect with an experienced upperclassman, learn through building, and finish with a project you can call your own.",
    commitment: "2–3 hours / week (variable)",
    responsibilities: [
      "Stay active and communicative.",
      "Work on a project throughout the program.",
    ],
    perks: [
      "Personalized guidance and a structured support system, especially in your first two years.",
      "Exclusive workshops and practical experience to expand your skills.",
      "A project to strengthen your coding skills and résumé.",
      "The opportunity to network and present to industry professionals at the Alumni Banquet.",
    ],
  },
  mentor: {
    title: "Share what you know. Help someone grow.",
    description:
      "Guide 2–3 mentees as they turn an idea into a project over two months. Your experience can make their next step clearer.",
    commitment: "1–2 hours / week",
    responsibilities: [
      "Share professional insights and support.",
      "Help 2–3 mentees create a project from scratch over two months.",
      "Stay active and communicative.",
    ],
    perks: [
      "Volunteer to support other students’ professional growth.",
      "Industry speakers, exclusive events, and priority consideration for SoDA Officer recruitment and perks.",
      "A Certificate of Mentorship to recognize your contribution.",
      "Networking with industry professionals at the Alumni Banquet.",
    ],
  },
};
const faqs = [
  [
    "I applied before and didn’t get in. Should I apply again?",
    "Absolutely! With a high volume of mentees and limited mentors, we aren’t able to accept everyone. We encourage you to apply again.",
  ],
  [
    "Can I return if I’ve already been a mentee?",
    "If you successfully completed the program, you can reapply. Acceptance isn’t guaranteed, since we also want to give other students an opportunity to participate.",
  ],
  [
    "What if I can’t complete the program?",
    "Review the time commitments before applying, but we understand that life happens. Contact your mentor and the program directors as soon as possible if you can’t continue.",
  ],
  [
    "How do mentors and mentees stay connected?",
    "A dedicated Discord channel provides updates and reminders. We also strongly encourage you to attend lounge hours.",
  ],
];

export default function Mentorship() {
  const [category, setCategory] = useState<ProjectCategory>("All projects");
  const [role, setRole] = useState<"mentee" | "mentor">("mentee");
  const projects = filterMentorshipProjects(mentorshipProjects, category);
  const details = roles[role];
  return (
    <main className="mentorship-page">
      <Helmet>
        <title>Mentorship Program - SoDA</title>
        <meta
          name="description"
          content="Build a project with a mentor at ASU SoDA. Explore student presentations, discover the program, and apply as a mentor or mentee."
        />
      </Helmet>
      <section className="mentorship-hero mentorship-container" aria-labelledby="mentorship-title">
        <div>
          <p className="mentorship-eyebrow">
            <span /> SODA MENTORSHIP PROGRAM
          </p>
          <h1 id="mentorship-title">
            A little guidance.
            <br />
            <em>A lot of possibility.</em>
          </h1>
          <p className="mentorship-intro">
            Big ideas start with a conversation. Build your next project with an experienced student
            by your side.
          </p>
          <div className="mentorship-actions">
            <a
              className="mentorship-button primary"
              href={signup.mentee}
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a mentee <ArrowUpRight size={18} />
            </a>
            <a
              className="mentorship-button secondary"
              href={signup.mentor}
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a mentor <ArrowUpRight size={18} />
            </a>
          </div>
          <a className="mentorship-explore" href="#mentorship-projects">
            See what students built <ArrowDown size={16} />
          </a>
        </div>
        <div className="mentorship-collage" aria-hidden="true">
          <div className="mentorship-collage-label">
            <Code2 size={17} /> IDEAS, MADE REAL.
          </div>
          <img
            className="collage-back"
            src="/mentorship/culture-bites/cover.webp"
            alt=""
            width="800"
            height="450"
          />
          <img
            className="collage-front"
            src="/mentorship/centsible/cover.webp"
            alt=""
            width="800"
            height="450"
          />
          <div className="mentorship-collage-note">
            <span>Made by students.</span>
            <strong>
              Built with support. <ArrowUpRight size={20} />
            </strong>
          </div>
        </div>
      </section>
      <div className="mentorship-facts mentorship-container">
        <div>
          <strong>2 months</strong>
          <span>to build something of your own</span>
        </div>
        <div>
          <strong>Shared experience</strong>
          <span>guidance from an upperclassman</span>
        </div>
        <div>
          <strong>Real projects</strong>
          <span>skills that go beyond the classroom</span>
        </div>
      </div>
      <section
        id="mentorship-projects"
        className="mentorship-gallery mentorship-container"
        aria-labelledby="projects-heading"
      >
        <div className="mentorship-section-heading">
          <div>
            <p className="mentorship-eyebrow">THE STUDENT SHOWCASE</p>
            <h2 id="projects-heading">Small starts. Real outcomes.</h2>
          </div>
          <p>
            Explore the projects our mentees brought to life. <br />
            Open a presentation and take a closer look.
          </p>
        </div>
        <div className="mentorship-filter-row">
          <div className="mentorship-filters" role="group" aria-label="Filter projects by category">
            {projectCategories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="mentorship-count" role="status">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <div className="mentorship-project-grid">
          {projects.map((project) => (
            <article className="mentorship-project-card" key={project.id}>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className="mentorship-project-preview"
                    aria-label={`View ${project.title}`}
                  >
                    {project.format !== "external" ? (
                      <img
                        src={`/mentorship/${project.id}/cover.webp`}
                        alt={`${project.title} presentation cover`}
                        width="800"
                        height="450"
                        loading="lazy"
                      />
                    ) : (
                      <div className="mentorship-career-cover">
                        <BookOpen size={36} />
                        <span>
                          Where could
                          <br />
                          your skills take you?
                        </span>
                        <small>CAREER PATHWAY RECOMMENDER</small>
                      </div>
                    )}
                    <span className="mentorship-preview-action">
                      {project.format === "pptx"
                        ? "Watch demo"
                        : project.format === "external"
                          ? "Explore project"
                          : "View presentation"}{" "}
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                </Dialog.Trigger>
                <ProjectPresentation project={project} />
              </Dialog.Root>
              <div className="mentorship-card-body">
                <div className="mentorship-card-meta">
                  <span>{project.category}</span>
                  <span>{String(mentorshipProjects.indexOf(project) + 1).padStart(2, "0")}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.credit && <p className="mentorship-credit">{project.credit}</p>}
                {project.technologies.length > 0 && (
                  <ul className="mentorship-technologies" aria-label="Technologies">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                )}
                <a
                  className="mentorship-original"
                  href={project.original}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Original presentation <ArrowUpRight size={14} />
                  <span className="sr-only"> for {project.title}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="mentorship-program mentorship-container"
        aria-labelledby="program-heading"
      >
        <div className="mentorship-section-heading">
          <div>
            <p className="mentorship-eyebrow">FIND YOUR PLACE</p>
            <h2 id="program-heading">Better, together.</h2>
          </div>
          <p>
            Whether you’re finding your footing or sharing <br />
            what you’ve learned, there’s a role for you.
          </p>
        </div>
        <div className="mentorship-role-tabs" role="tablist" aria-label="Program roles">
          {(["mentee", "mentor"] as const).map((item) => (
            <button
              type="button"
              key={item}
              role="tab"
              id={`tab-${item}`}
              aria-selected={role === item}
              aria-controls={`panel-${item}`}
              tabIndex={role === item ? 0 : -1}
              onClick={() => setRole(item)}
              onKeyDown={(event) => {
                if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? "mentee"
                      : event.key === "End"
                        ? "mentor"
                        : role === "mentee"
                          ? "mentor"
                          : "mentee";
                  setRole(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }
              }}
            >
              <Users size={17} />
              I’m a {item}
            </button>
          ))}
        </div>
        <div
          className="mentorship-role-panel"
          role="tabpanel"
          id={`panel-${role}`}
          aria-labelledby={`tab-${role}`}
          tabIndex={0}
        >
          <div className="mentorship-role-intro">
            <span className="mentorship-time">{details.commitment}</span>
            <h3>{details.title}</h3>
            <p>{details.description}</p>
            <a
              className="mentorship-button primary"
              href={signup[role]}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply as a {role} <ArrowUpRight size={18} />
            </a>
          </div>
          <div>
            <h4>What you’ll do</h4>
            <ul>
              {details.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h4>What you’ll gain</h4>
            <ul>
              {details.perks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="mentorship-faq mentorship-container" aria-labelledby="faq-heading">
        <div>
          <p className="mentorship-eyebrow">A FEW MORE THINGS</p>
          <h2 id="faq-heading">Good questions.</h2>
          <p>
            Here’s what to know <br />
            before you jump in.
          </p>
        </div>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown size={18} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mentorship-closing mentorship-container">
        <p className="mentorship-eyebrow">YOUR NEXT CHAPTER</p>
        <h2>
          You don’t have to figure
          <br />
          it all out alone.
        </h2>
        <a
          className="mentorship-button primary"
          href={signup.mentee}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find your mentor <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}
