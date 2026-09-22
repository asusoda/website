import { Helmet } from "react-helmet-async";
import { ArrowDown, ChevronDown } from "lucide-react";

interface CodeChallengeImage {
  src: string;
  alt: string;
}

export interface CodeChallengeProgramContent {
  name: string;
  eyebrow: string;
  headline: string;
  emphasis: string;
  intro: string;
  description: string;
  heroImage: CodeChallengeImage;
  winnerImages: readonly CodeChallengeImage[];
  galleryImages: readonly CodeChallengeImage[];
  faqs: readonly (readonly [string, string])[];
}

interface CodeChallengeProgramProps {
  content: CodeChallengeProgramContent;
}

export default function CodeChallengeProgram({ content }: CodeChallengeProgramProps) {
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
        <img
          className="program-photo program-hero-photo"
          src={content.heroImage.src}
          alt={content.heroImage.alt}
          fetchPriority="high"
        />
      </section>

      <section
        id="program-details"
        className="program-overview program-container"
        aria-labelledby="overview-title"
      >
        <div>
          <p className="program-eyebrow">WHAT TO EXPECT</p>
          <h2 id="overview-title">
            Find solutions.
            <br />
            Challenge yourself.
          </h2>
        </div>
        <p>{content.description}</p>
      </section>

      <section className="program-winners program-container" aria-labelledby="winners-title">
        <div className="program-section-heading">
          <div>
            <p className="program-eyebrow">PAST WINNERS</p>
            <h2 id="winners-title">The next one could be yours.</h2>
          </div>
        </div>
        <div className="program-winner-grid">
          {content.winnerImages.map((image, index) => (
            <article key={`${image.src}-${index}`} className="program-winner-card">
              <img
                className="program-photo"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </article>
          ))}
        </div>
      </section>

      <section
        className="program-gallery code-challenge-gallery program-container"
        aria-labelledby="gallery-title"
      >
        <p className="program-eyebrow">FROM THE FLOOR</p>
        <h2 id="gallery-title">Problem solving in action.</h2>
        <div>
          {content.galleryImages.map((image) => (
            <img
              key={image.src}
              className="program-photo"
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </section>

      <section className="program-faq program-container" aria-labelledby="faq-title">
        <div>
          <p className="program-eyebrow">A FEW MORE THINGS</p>
          <h2 id="faq-title">FAQs</h2>
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
