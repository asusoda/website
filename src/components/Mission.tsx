import { Link } from "react-router-dom";
import HoverPlayMedia from "./ui/HoverPlayMedia";
import { pillars } from "../data/pillars";

export default function Mission() {
  return (
    <>
      <main className="flex flex-col justify-center items-center" id="mission">
        <h1 className="section-header-text">Mission</h1>
        <p className="hero-small-text max-w-3xl text-center mb-8 px-6">
          SoDA exists to make Arizona State University a place where every computer science student
          can build real skills, find their community, and launch their career. We do that by
          putting professional development, mentorship, and hands-on learning within reach of every
          member, free of charge.
        </p>
        <section className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Link
              key={pillar.slug}
              to={`/pillars/${pillar.slug}`}
              className="bg-neutral-900 p-4 border-gray-600 rounded-2xl justify-center flex flex-col min-h-[300px] max-w-[300px] w-full transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soda-blue"
            >
              <HoverPlayMedia
                src={pillar.imgURL}
                videoSrc={pillar.videoURL}
                alt={pillar.alt}
                className="rounded-t-xl object-cover w-full h-48"
              />
              <div className="text-white px-4 py-3 space-y-3 text-left flex-1">
                <h4 className="font-semibold text-xl max-md:text-lg">{pillar.header}</h4>
                <p className="text-[14px] max-md:text-sm ">{pillar.description}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
