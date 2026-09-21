import { Helmet } from "react-helmet-async";
import { ArrowDown, ChevronDown, Gift, Trophy } from "lucide-react";
import ProgramPhotoPlaceholder from "./ProgramPhotoPlaceholder";

export interface CompetitionProgramContent {
  name: string;
  eyebrow: string;
  headline: string;
  emphasis: string;
  intro: string;
  description: string;
  perks: readonly string[];
  faqs: readonly (readonly [string, string])[];
}

interface CompetitionProgramProps {
  content: CompetitionProgramContent;
}

export default function CompetitionProgram({ content }: CompetitionProgramProps) {
  return (
    <main className="program-page">
      <Helmet>
        <title>{content.name} - SoDA</title>
        <meta name="description" content={content.intro} />
      </Helmet>
      <section className="program-hero program-container" aria-labelledby="program-title">
        <div>
          <p className="program-eyebrow">
            <span /> {content.eyebrow}
          </p>
          <h1 id="program-title">
            {content.headline}
            <br />
            <em>{content.emphasis}</em>
          </h1>
          <p className="program-intro">{content.intro}</p>
          <a className="program-button" href="#program-details">
            Explore the program <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <ProgramPhotoPlaceholder label={content.name} />
      </section>

      <section
        id="program-details"
        className="program-overview program-container"
        aria-labelledby="overview-title"
      >
        <div>
          <p className="program-eyebrow">WHAT TO EXPECT</p>
          <h2 id="overview-title">
            Show up curious.
            <br />
            Leave with more.
          </h2>
        </div>
        <p>{content.description}</p>
      </section>

      <section className="program-perks program-container" aria-labelledby="perks-title">
        <div className="program-section-heading">
          <div>
            <p className="program-eyebrow">PERKS & REWARDS</p>
            <h2 id="perks-title">More than a leaderboard.</h2>
          </div>
          <p>Prizes and event details vary, but there’s always something worth showing up for.</p>
        </div>
        <div className="program-perk-grid">
          {content.perks.map((perk, index) => (
            <article key={perk}>
              <Gift size={21} aria-hidden="true" />
              <span>0{index + 1}</span>
              <p>{perk}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="program-winners program-container" aria-labelledby="winners-title">
        <div className="program-section-heading">
          <div>
            <p className="program-eyebrow">PAST WINNERS</p>
            <h2 id="winners-title">The next one could be yours.</h2>
          </div>
          <p>We’ll add past team names, projects, and winning photos here as they’re collected.</p>
        </div>
        <div className="program-winner-grid">
          {["Winner spotlight", "Winner spotlight", "Winner spotlight"].map((label, index) => (
            <article key={`${label}-${index}`} className="program-winner-card">
              <ProgramPhotoPlaceholder label={label} />
              <div>
                <Trophy size={17} aria-hidden="true" />
                <span>PAST CHALLENGE · COMING SOON</span>
                <h3>Team name & project name</h3>
                <p>Winner details and a project photo will appear here.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="program-gallery program-container" aria-labelledby="gallery-title">
        <p className="program-eyebrow">FROM THE FLOOR</p>
        <h2 id="gallery-title">The work, the people, the moments.</h2>
        <div>
          <ProgramPhotoPlaceholder label="Event photo" />
          <ProgramPhotoPlaceholder label="Team photo" />
          <ProgramPhotoPlaceholder label="Project showcase" />
        </div>
      </section>

      <section className="program-faq program-container" aria-labelledby="faq-title">
        <div>
          <p className="program-eyebrow">A FEW MORE THINGS</p>
          <h2 id="faq-title">Good questions.</h2>
          <p>We’ll share event-specific information when registration opens.</p>
        </div>
        <div>
          {content.faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
