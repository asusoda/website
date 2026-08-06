import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { pillars } from "../data/pillars";

export default function PillarDetail() {
  const { slug } = useParams<{ slug: string }>();
  const pillar = pillars.find((p) => p.slug === slug);

  if (!pillar) {
    return (
      <div className="max-w-3xl mx-auto p-6 my-28 text-center text-white">
        <h1 className="section-header-text">Pillar not found</h1>
        <Link to="/#mission" className="text-soda-blue underline">
          Back to Mission
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 my-28">
      <Helmet>
        <title>SoDA - {pillar.header}</title>
        <meta name="description" content={pillar.description} />
      </Helmet>

      <Link to="/#mission" className="text-soda-blue underline text-sm">
        ← Back to Mission
      </Link>

      <img
        src={pillar.imgURL}
        alt={pillar.alt}
        className="rounded-2xl object-cover w-full h-64 md:h-80 mt-4 mb-8"
      />

      <h1 className="section-header-text text-left! w-full!">{pillar.header}</h1>
      <p className="hero-small-text">{pillar.description}</p>
    </div>
  );
}
