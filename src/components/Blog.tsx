import React from "react";
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Import the icon

interface IndividualBlogProps {
  imageURL?: string;
  tag: string[];
  title: string;
  summary: string;
  link: string;
  alt: string;
  width: number;
  height: number;
}

const IndividualBlog: React.FC<IndividualBlogProps> = ({
  imageURL,
  title,
  summary,
  link,
  alt,
  width,
  height,
}) => {
  const hasLink = link && link.trim() !== "";

  // Base classes for the card content
  const cardBaseClasses =
    "bg-neutral-900 border-gray-600 rounded-lg p-6 max-w-md h-full overflow-hidden text-white relative flex flex-col";
  // Classes added only when there is a link for hover effects triggered by the parent Link's group class
  const cardLinkClasses = hasLink
    ? "transition transform group-hover:scale-105 group-hover:shadow-lg"
    : "";

  const cardContent = (
    <div className={`${cardBaseClasses} ${cardLinkClasses}`}>
      {imageURL ? (
        <img
          src={imageURL}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      ) : (
        <div
          className="w-full h-48 rounded-lg mb-4 bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-950 border border-slate-700 flex items-end p-4"
          aria-label={alt}
          role="img"
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
            {alt}
          </span>
        </div>
      )}
      {/* Tag rendering commented out */}
      <h2 className="text-2xl font-bold my-3">{title}</h2>
      <Markdown className="text-gray-200 mt-2 text-sm flex-grow">{summary}</Markdown>
      {hasLink && (
        <div className="mt-auto pt-4 flex items-center text-blue-400 group-hover:text-blue-300 self-start">
          {" "}
          {/* Pushed to bottom, aligned left */}
          <span>Learn more</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      )}
      {/* Add the gradient overlay back, conditionally shown on hover when there's a link */}
      {hasLink && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/40 to-zinc-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center" /> // Added rounded-lg to match parent and kept flex centering just in case content is ever added here
      )}
    </div>
  );

  // Use React.Fragment shorthand <> </> which doesn't render an extra DOM node
  // Wrap with Link only if hasLink is true, applying the 'group' class there
  // Ensure the wrapper (Link or div) takes full height for consistent grid layout
  return (
    <>
      {hasLink ? (
        <Link to={link} className="group block h-full">
          {" "}
          {/* Add group class here */}
          {cardContent}
        </Link>
      ) : (
        <div className="block h-full">
          {" "}
          {/* No group class needed here */}
          {cardContent}
        </div>
      )}
    </>
  );
};

export default function Blog() {
  return (
    <section id="programs" className="flex flex-col items-center px-8">
      <h1 className="section-header-text">Programs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <IndividualBlog
          imageURL="/pizza.webp"
          tag={["community", "learning", "networking"]}
          title="Weekly General Body Meetings"
          summary="Join SoDA every week for our General Body Meetings on Tuesdays! We host workshops, tech talks, networking events, and more. It's a great way to learn, connect with fellow students, and get involved in the largest engineering organization at ASU. Free pizza included ;)"
          link=""
          alt="Weekly General Body Meetings"
          width={5556}
          height={3407}
        />
        <IndividualBlog
          imageURL="/winner-winner-chicken-dinner.webp"
          tag={["mentorship", "community development"]}
          title="Distinguished Members Program"
          summary="SoDA introduced points system designed to encourage active participation in our community. By attending meetings, events, and engaging in various activities, members can earn points that contribute to their standing within the organization. These points can be redeemed for exclusive rewards, recognition, and opportunities, fostering a vibrant and involved community."
          link="/distinguishedMembers"
          alt="Distinguished Members Program"
          width={5510}
          height={2904}
        />
        <IndividualBlog
          imageURL="/events/microsoft.webp"
          tag={["mentorship", "community development"]}
          title="Mentorship Program"
          summary="SoDA offers a comprehensive mentorship program designed to support those in need. Our program connects experienced mentors with mentees, providing guidance, and support to help them navigate their academic and professional journeys. "
          link="/mentorship"
          alt="Mentorship Program"
          width={5184}
          height={3456}
        />
        <IndividualBlog
          imageURL="/codechallenge/people/hero.jpg"
          tag={["competition", "coding"]}
          title="Code Challenge"
          summary="Put your problem-solving skills to the test in a welcoming, fast-paced coding competition. Work through engaging challenges, learn from other builders, and compete for prizes."
          link="/code-challenge"
          alt="Code Challenge participants standing in front of the event presentation"
          width={5343}
          height={2852}
        />
        <IndividualBlog
          tag={["competition", "building"]}
          title="Hackathons"
          summary="Turn a big idea into something real. SoDA hackathons bring students together to build, experiment, get mentorship, and share their projects with the community."
          link="/hackathons"
          alt="Hackathon photo coming soon"
          width={1600}
          height={900}
        />
        <IndividualBlog
          imageURL="/loungehours/3.jpg"
          tag={["community", "chill"]}
          title="Lounge Hours"
          summary="Drop by to hang out, grab a bite, and have fun with other members. Everyone is welcome."
          link="/lounge-hours"
          alt="SoDA members serving food together during Lounge Hours"
          width={6000}
          height={4000}
        />
      </div>

      <Link
        to="/resources/travel-reimbursment"
        className="group mt-6 w-full max-w-[1116px] block bg-neutral-900 border-gray-600 rounded-lg p-4 md:p-6 text-white overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center">
          <img
            src="/events/travel-reimbursement.png"
            alt="Travel reimbursement form"
            width={5184}
            height={3456}
            className="w-full md:w-80 h-44 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <h2 className="text-2xl font-bold mb-2">Travel Reimbursement</h2>
            <p className="text-gray-200 text-sm md:text-base max-w-3xl">
              Traveling for SoDA events or activities? Submit your reimbursement request through our
              official travel reimbursement form in Resources.
            </p>
            <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300 self-start">
              <span>Learn more</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
