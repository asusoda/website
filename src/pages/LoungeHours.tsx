import { Helmet } from "react-helmet-async";
import "./Programs.css";

export default function LoungeHours() {
  return (
    <main className="program-page lounge-page">
      <Helmet>
        <title>Lounge Hours - SoDA</title>
        <meta
          name="description"
          content="Drop by to hang out with members, eat dinner, and play games."
        />
      </Helmet>
      <section className="program-hero program-container" aria-labelledby="lounge-title">
        <div>
          <p className="program-eyebrow">
            <span /> SODA LOUNGE HOURS
          </p>
          <h1 id="lounge-title">
            Chill with friends.
            <br />
            <em>Grab a bite.</em>
          </h1>
          <p className="program-intro">
            Pull up to lounge hours to meet new members, relax, and have some dinner.
          </p>
        </div>
        <img
          className="program-photo program-hero-photo"
          src="/loungehours/3.webp"
          alt="SoDA members serving food together during Lounge Hours"
          fetchPriority="high"
        />
      </section>
      <section
        className="program-gallery lounge-gallery program-container"
        aria-labelledby="lounge-gallery-title"
      >
        <p className="program-eyebrow">FALL 2025 BBQ</p>
        <h2 id="lounge-gallery-title">Enjoy the evening.</h2>
        <div>
          <img
            className="program-photo"
            src="/loungehours/1.webp"
            alt="SoDA members hanging out over food during Lounge Hours"
            loading="lazy"
            decoding="async"
          />
          <img
            className="program-photo"
            src="/loungehours/7.webp"
            alt="Two SoDA members hanging out at Lounge Hours"
            loading="lazy"
            decoding="async"
          />
          <img
            className="program-photo"
            src="/loungehours/6.webp"
            alt="Friends posing together at Lounge Hours"
            loading="lazy"
            decoding="async"
          />
          <img
            className="program-photo"
            src="/loungehours/8.webp"
            alt="SoDA members enjoying Lounge Hours together"
            loading="lazy"
            decoding="async"
          />
          <img
            className="program-photo"
            src="/loungehours/4.webp"
            alt="SoDA members spending the evening at Lounge Hours"
            loading="lazy"
            decoding="async"
          />
          <img
            className="program-photo"
            src="/loungehours/9.webp"
            alt="Friends posing together during Lounge Hours"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </main>
  );
}
