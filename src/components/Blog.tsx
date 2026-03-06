import React from "react";
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Import the icon

interface IndividualBlogProps {
  imageURL: string;
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
      <img
        src={imageURL}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />{" "}
      {/* Added mb-4 for spacing */}
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
      </div>
    </section>
  );
}
