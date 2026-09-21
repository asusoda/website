import { Helmet } from "react-helmet-async";
import { Code2, Users } from "lucide-react";
import ProgramPhotoPlaceholder from "../components/Programs/ProgramPhotoPlaceholder";
import "./Programs.css";

export default function LoungeHours() {
  return (
    <main className="program-page lounge-page">
      <Helmet>
        <title>Lounge Hours - SoDA</title>
        <meta
          name="description"
          content="Drop by SoDA Lounge Hours to study, connect, and recharge with the community."
        />
      </Helmet>
      <section className="program-hero program-container" aria-labelledby="lounge-title">
        <div>
          <p className="program-eyebrow">
            <span /> SODA LOUNGE HOURS
          </p>
          <h1 id="lounge-title">
            A place to work.
            <br />
            <em>A reason to stay.</em>
          </h1>
          <p className="program-intro">
            Drop in to study, meet fellow members, get unstuck, or simply take a breather between
            classes.
          </p>
        </div>
        <ProgramPhotoPlaceholder label="Lounge Hours" />
      </section>
      <section className="lounge-details program-container" aria-labelledby="lounge-details-title">
        <div>
          <p className="program-eyebrow">YOUR CAMPUS CORNER</p>
          <h2 id="lounge-details-title">Come as you are.</h2>
          <p>
            Lounge Hours are an easy, low-key way to spend time with the SoDA community. Bring
            homework, a side project, or just yourself.
          </p>
        </div>
        <div className="lounge-facts">
          <div>
            <Users size={20} aria-hidden="true" />
            <strong>Community</strong>
            <span>Meet and collaborate with fellow members.</span>
          </div>
          <div>
            <Code2 size={20} aria-hidden="true" />
            <strong>Work time</strong>
            <span>Study, build, or ask for a second set of eyes.</span>
          </div>
        </div>
      </section>
      <section className="program-gallery program-container" aria-labelledby="lounge-gallery-title">
        <p className="program-eyebrow">LIFE AT THE LOUNGE</p>
        <h2 id="lounge-gallery-title">Photos coming soon.</h2>
        <div>
          <ProgramPhotoPlaceholder label="Lounge photo" />
          <ProgramPhotoPlaceholder label="Study session" />
          <ProgramPhotoPlaceholder label="Community moment" />
        </div>
      </section>
    </main>
  );
}
