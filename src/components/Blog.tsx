import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";
import { ArrowRight, Pause, Play } from "lucide-react"; // Import the icon
import React, { useEffect, useState } from "react";

interface IndividualBlogProps {
  imageURLs: string[];
  tag: string[];
  title: string;
  summary: string;
  link: string;
  alt: string;
  width: number;
  height: number;
}

const IndividualBlog: React.FC<IndividualBlogProps> = ({
  imageURLs,
  title,
  summary,
  link,
  alt,
  width,
  height,
}) => {
  const hasLink = link && link.trim() !== "";

  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [loadedUpTo, setLoadedUpTo] = useState(1);
  // Start paused for users who prefer reduced motion; they can still press play.
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Duplicate the first image at the end so the last -> first step still slides forward.
  const slides = imageURLs.length > 1 ? [...imageURLs, imageURLs[0]] : imageURLs;

  useEffect(() => {
    if (imageURLs.length <= 1 || paused) return;

    const timeout = setTimeout(() => {
      // transitionend can be skipped (e.g. background tabs), leaving us on the clone;
      // snap back without animating so the track doesn't slide backward across every slide.
      if (currentImage >= imageURLs.length) {
        setIsAnimating(false);
        setCurrentImage(0);
        return;
      }
      setIsAnimating(true);
      setCurrentImage(currentImage + 1);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [imageURLs, currentImage, paused]);

  useEffect(() => {
    setLoadedUpTo((loaded) => Math.max(loaded, currentImage + 1));
  }, [currentImage]);

  const handleTransitionEnd = () => {
    if (currentImage === imageURLs.length) {
      setIsAnimating(false);
      setCurrentImage(0);
    }
  };

  const cardBaseClasses =
    "bg-neutral-900 border-gray-600 rounded-lg p-6 max-w-md h-full overflow-hidden text-white relative flex flex-col";

  const cardLinkClasses = hasLink
    ? "transition transform group-hover:scale-105 group-hover:shadow-lg"
    : "";

  const cardContent = (
    <div className={`${cardBaseClasses} ${cardLinkClasses}`}>
      <div className="w-full h-48 overflow-hidden rounded-t-lg mb-4">
        <div
          className={`flex h-full ${
            isAnimating
              ? "transition-transform duration-700 ease-in-out motion-reduce:transition-none"
              : ""
          }`}
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((url, index) => (
            <img
              key={index}
              src={index <= loadedUpTo || index === slides.length - 1 ? url : undefined}
              alt={index === currentImage ? alt : ""}
              aria-hidden={index !== currentImage}
              width={width}
              height={height}
              loading={index === 0 ? "lazy" : "eager"}
              decoding="async"
              className="w-full h-full flex-shrink-0 object-cover"
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold my-3">{title}</h2>

      <Markdown className="text-gray-200 mt-2 text-sm flex-grow">{summary}</Markdown>

      {hasLink && (
        <div className="mt-auto pt-4 flex items-center text-blue-400 group-hover:text-blue-300 self-start">
          <span>Learn more</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      )}

      {hasLink && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/40 to-zinc-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center" />
      )}
    </div>
  );

  return (
    <div className="relative h-full">
      {hasLink ? (
        <Link to={link} className="group block h-full">
          {cardContent}
        </Link>
      ) : (
        <div className="block h-full">{cardContent}</div>
      )}
      {/* Kept outside the Link so the button isn't nested inside an interactive element. */}
      {imageURLs.length > 1 && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          className="absolute top-8 right-8 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
};

export default function Blog() {
  return (
    <section id="programs" className="flex flex-col items-center px-8">
      <h1 className="section-header-text">Programs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <IndividualBlog
          imageURLs={[
            "/slides/4qk14shQ.jpeg",
            "/slides/8lixNcro.jpeg",
            "/slides/GYwPlQXg.jpeg",
            "/slides/m8fysS-g.jpeg",
          ]}
          tag={["community", "learning", "networking"]}
          title="Weekly General Body Meetings"
          summary="Join SoDA every week for our General Body Meetings on Tuesdays! We host workshops, tech talks, networking events, and more. It's a great way to learn, connect with fellow students, and get involved in the largest engineering organization at ASU. Free pizza included ;)"
          link=""
          alt="Weekly General Body Meetings"
          width={5556}
          height={3407}
        />

        <IndividualBlog
          imageURLs={[
            "/winner-winner-chicken-dinner.webp",
            "/slides/A1ey2J-G.jpeg",
            "/slides/AsYR7jig.jpeg",
            "/slides/BqLT7O6g.jpeg",
            "/slides/DUDv2kqg.jpeg",
          ]}
          tag={["mentorship", "community development"]}
          title="Distinguished Members Program"
          summary="SoDA introduced points system designed to encourage active participation in our community. By attending meetings, events, and engaging in various activities, members can earn points that contribute to their standing within the organization. These points can be redeemed for exclusive rewards, recognition, and opportunities, fostering a vibrant and involved community."
          link="/distinguishedMembers"
          alt="Distinguished Members Program"
          width={5510}
          height={2904}
        />
        <IndividualBlog
          imageURLs={[
            "/events/microsoft.webp",
            "/slides/NbWmEzv8.jpeg",
            "/slides/rs2sumaA.jpeg",
            "/slides/Y_JfkuGQ.jpeg",
            "/slides/zmb3PWN0.png",
            "/slides/zzvVF0Jg.jpeg",
          ]}
          tag={["mentorship", "community development"]}
          title="Mentorship Program"
          summary="SoDA offers a comprehensive mentorship program designed to support those in need. Our program connects experienced mentors with mentees, providing guidance, and support to help them navigate their academic and professional journeys. "
          link="/mentorship"
          alt="Mentorship Program"
          width={5184}
          height={3456}
        />
        <IndividualBlog
          imageURLs={["/codechallenge/people/hero.webp"]}
          tag={["competition", "coding"]}
          title="Code Challenge"
          summary="Put your problem-solving skills to the test in a welcoming, fast-paced coding competition. Work through engaging challenges, learn from other builders, and compete for prizes."
          link="/code-challenge"
          alt="Code Challenge participants standing in front of the event presentation"
          width={5343}
          height={2852}
        />
        <IndividualBlog
          imageURLs={["/hackathons/innovationhacks26/people/crowd1.webp"]}
          tag={["competition", "building"]}
          title="Hackathons"
          summary="Turn a big idea into something real. SoDA hackathons bring students together to build, experiment, get mentorship, and share their projects with the community."
          link="/hackathons"
          alt="Audience attending an Innovation Hacks presentation"
          width={4898}
          height={3265}
        />
        <IndividualBlog
          imageURLs={["/loungehours/3.webp"]}
          tag={["community", "chill"]}
          title="Lounge Hours"
          summary="Drop by to hang out, grab a bite, and have fun with other members. Everyone is welcome."
          link="/lounge-hours"
          alt="SoDA members serving food together during Lounge Hours"
          width={6000}
          height={4000}
        />
      </div>
    </section>
  );
}
