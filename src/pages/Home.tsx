import { Helmet } from "react-helmet-async";
import MemberCards from "../components/Team/TeamCards";
import Hero from "../components/Hero";
import SponsorsMarquee from "../components/Sponsors/Sponsors";
import Mission from "../components/Mission";
import Blog from "../components/Blog";
import HistoryTimeline from "../components/HistoryTimeline"; // Import the new component
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Clock, MapPin, X } from "lucide-react";

interface CalendarEvent {
  id: string;
  name: string;
  location: string;
  description: string | null;
  start: string;
  end: string;
  url?: string;
}

function Home() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedEvent) {
        setSelectedEvent(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedEvent]);

  return (
    <>
      {/* SEO Metadata & Preloading */}
      <Helmet>
        <title>SoDA</title>
        <meta
          name="description"
          content="SoDA is one of the largest communities of students at Arizona State University."
        />
        <meta
          name="keywords"
          content="software developers association, soda, asu, arizona state university, computer science, recruiting, student organization"
        />
      </Helmet>
      {selectedEvent !== null && (
        <div
          className="fixed fade-in inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedEvent(null)} // Close when clicking overlay
        >
          <div
            className="relative w-full max-w-md p-6 rounded-lg bg-[#252525] border border-gray-700 shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200 pr-4">{selectedEvent?.name}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 focus:outline-none"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span>
                  {format(parseISO(selectedEvent.start), "MMM d, h:mm a")} -
                  {format(parseISO(selectedEvent.end), "h:mm a")}
                </span>
              </div>

              {selectedEvent.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}

              <p className="mt-3 text-sm text-gray-300">{selectedEvent.description}</p>
            </div>
          </div>
        </div>
      )}
      {/* Add effect to handle escape key */}

      <Hero setSelectedEvent={setSelectedEvent} />
      <section id="about" className="section">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-6 md:px-12 lg:px-24">
          {/* Image on the left */}
          <img
            src="/soda-can.webp"
            alt="SoDA Can"
            className="hidden md:block w-32 h-auto md:w-48 lg:w-64 object-contain flex-shrink-0" /* Hide on mobile, show on md+ */
          />
          {/* Text content on the right */}
          <div className="max-w-3xl">
            {" "}
            {/* Removed text alignment from parent */}
            <h1 className="section-header-text mb-4 text-center md:text-left! w-full!">
              About SoDA
            </h1>{" "}
            {/* Added w-full */}
            <p className="hero-small-text">
              The Software Developers Association (SoDA) at Arizona State University is a
              student-run, free organization dedicated to serving ASU’s computer science students
              since 2008. SoDA is one of the oldest and largest communities of students on campus,
              and is the largest engineering organization.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <Mission />
      </section>
      <section className="section">
        <Blog />
      </section>
      <section className="section">
        <SponsorsMarquee />
      </section>
      <section className="section">
        <MemberCards />
      </section>
      <section id="history" className="section">
        <HistoryTimeline />
      </section>
    </>
  );
}

export default Home;
