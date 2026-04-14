import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Slider from "react-infinite-logo-slider";
import { FaMeta, FaApple, FaAmazon, FaDropbox, FaSalesforce, FaMicrosoft } from "react-icons/fa6";
import { AiOutlineOpenAI } from "react-icons/ai";
import {
  SiIntuit,
  SiGarmin,
  SiGodaddy,
  SiIntel,
  SiGoldmansachs,
  SiAmericanexpress,
  SiWellsfargo,
  SiFigma,
  SiNotion,
  SiGoogle,
  SiDatabricks,
  SiAirbnb,
} from "react-icons/si";
import { IconContext } from "react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const APPLICATION_FORM_URL = "https://asusoda.notion.site/ebd//49947e64246882f9a8a80137e433be60";

export default function Positions() {
  const [sliderWidth, setSliderWidth] = useState("150px");
  const [sliderDuration, setSliderDuration] = useState(15);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Corresponds to md breakpoint

    const handleResize = () => {
      if (mediaQuery.matches) {
        // Mobile
        setSliderWidth("125px");
        setSliderDuration(10);
      } else {
        // Desktop
        setSliderWidth("150px");
        setSliderDuration(15);
      }
    };

    // Initial check
    handleResize();

    // Add listener for screen size changes
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div className="max-w-5xl mx-auto p-6 md:mt-14 shadow-md rounded-lg prose lg:prose-xl prose-invert">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Officer Applications</title>
        <meta
          name="description"
          content="Explore open officer positions at ASU Soda and apply for roles in administration, marketing, technology, and more."
        />
        <meta
          name="keywords"
          content="Officer Positions, ASU Soda, Officer Roles, Administrative Roles, Marketing Roles, Technology Roles, Officer Applications, Computer science, CS Club"
        />
      </Helmet>

      <h1>Officer Applications</h1>

      <p>Thank you for your interest in joining the Software Developers Association!</p>
      <p>Our Officers get jobs at companies like</p>
      <p>
        <IconContext.Provider value={{ size: "4rem", style: { verticalAlign: "middle" } }}>
          <Slider
            width={sliderWidth}
            duration={sliderDuration}
            blurBorders={true}
            blurBorderColor="#080909"
          >
            <Slider.Slide>
              <FaMeta />
            </Slider.Slide>
            <Slider.Slide>
              <FaApple />
            </Slider.Slide>
            <Slider.Slide>
              <FaAmazon />
            </Slider.Slide>
            <Slider.Slide>
              <SiGoogle />
            </Slider.Slide>
            <Slider.Slide>
              <FaMicrosoft />
            </Slider.Slide>
            <Slider.Slide>
              <FaDropbox />
            </Slider.Slide>
            <Slider.Slide>
              <SiNotion />
            </Slider.Slide>
            <Slider.Slide>
              <FaSalesforce />
            </Slider.Slide>
            <Slider.Slide>
              <AiOutlineOpenAI />
            </Slider.Slide>
            <Slider.Slide>
              <SiGoldmansachs />
            </Slider.Slide>
            <Slider.Slide>
              <SiAmericanexpress />
            </Slider.Slide>
            <Slider.Slide>
              <SiWellsfargo />
            </Slider.Slide>
            <Slider.Slide>
              <SiFigma />
            </Slider.Slide>
            <Slider.Slide>
              <SiIntuit size="5rem" />
            </Slider.Slide>
            <Slider.Slide>
              <SiIntel />
            </Slider.Slide>
            <Slider.Slide>
              <SiGarmin size="5rem" />
            </Slider.Slide>
            <Slider.Slide>
              <SiGodaddy />
            </Slider.Slide>
            <Slider.Slide>
              <SiDatabricks />
            </Slider.Slide>
            <Slider.Slide>
              <SiAirbnb />
            </Slider.Slide>
          </Slider>
        </IconContext.Provider>
      </p>

      <h2>️️Application Instructions</h2>

      <p>
        Complete your officer application via the SoDA Notion form embedded{" "}
        <a href="#apply">at the bottom of this page</a> or open it in a new tab for a dedicated
        experience.
      </p>

      <p>
        Prefer a new tab?{" "}
        <a href={APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">
          Open the application form directly.
        </a>
      </p>

      <p>
        Direct any technical issues or concerns to{" "}
        <a href="mailto:asu@thesoda.io">asu@thesoda.io</a>.
      </p>

      <h2>Application Timeline</h2>
      <p>
        We review applications on a rolling basis, so please apply as soon as you can. If your
        application moves forward, we'll contact you to schedule a 30-minute interview. You will be
        asked questions about your interest, experience, and how you work within a team. Finally,
        you will be contacted regarding a final decision.
      </p>

      <hr className="my-10 border-gray-600" />

      <h2>Open Positions by Team</h2>

      <Accordion type="single" collapsible defaultValue="admin" className="w-full">
        <AccordionItem value="admin">
          <AccordionTrigger
            className="text-3xl font-semibold no-underline hover:no-underline py-4"
            showStar
          >
            Admin
          </AccordionTrigger>
          <AccordionContent className="prose lg:prose-xl prose-invert">
            <h3>Event Coordinator</h3>
            <p>
              The Event Coordinator is an officer role responsible for maintaining communication
              between teams and ensuring events run smoothly and on schedule. This position plays a
              key role in planning and executing both community-focused and technical events.
            </p>
            <p className="italic mb-2">Responsibilities:</p>
            <ul className="mb-0">
              <li>Coordinating staffing for events</li>
              <li>Speaking with other organizations</li>
              <li>Creating schedules for large events</li>
              <li>Booking rooms and organizing materials</li>
              <li>Distributing prizes</li>
              <li>
                Working closely with the Vice President of Operations and other directors to meet
                deadlines and support event logistics
              </li>
              <li>Serving as a reliable point of contact for both officers and general members</li>
              <li>Leading and collaborating with multiple teams within SoDA</li>
            </ul>
            <p className="italic mb-2">Qualifications:</p>
            <ul className="mb-0">
              <li>Strong organizational and communication skills</li>
              <li>
                Proactive attitude with a willingness to dedicate extra time during major events
              </li>
              <li>
                Ability to lead and collaborate with multiple teams, including working alongside a
                team of event coordinators to keep work manageable
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="finance">
          <AccordionTrigger
            className="text-3xl font-semibold no-underline hover:no-underline py-4"
            showStar
          >
            Finance
          </AccordionTrigger>
          <AccordionContent className="prose lg:prose-xl prose-invert mt-[-2rem]">
            <ul className="mb-0">
              <li>Conduct fiscal operations based on planning established by VP of Finance</li>
              <li>Oversee admin officers in carrying out budget/purchase requests</li>
              <li>Manage funding sources and financial accounts</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="marketing">
          <AccordionTrigger
            className="text-3xl font-semibold no-underline hover:no-underline py-4"
            showStar
          >
            Marketing
          </AccordionTrigger>
          <AccordionContent className="prose lg:prose-xl prose-invert">
            <h3>Graphic Designer</h3>
            <p className="italic mb-2">Responsibilities:</p>
            <ul className="mb-0">
              <li>
                Serve as a graphic designer for key SoDA events, workshops, and social gatherings
              </li>
              <li>
                Design and create high-quality digital and print assets optimized for social media
                (Instagram, LinkedIn), emails, and announcements
              </li>
              <li>
                Collaborate closely with the Content Team Lead and Marketing Team to plan visual
                campaigns and brainstorm creative concepts
              </li>
              <li>
                Create compelling and engaging promotional materials that align with SoDA's brand
                and overall marketing strategy
              </li>
              <li>
                Incorporate strong visual elements such as typography, composition, color schemes,
                and illustrations
              </li>
              <li>
                Research and apply trending design formats and visual styles relevant to our target
                audience (ASU students)
              </li>
              <li>Manage and organize all design assets, brand kits, and project files</li>
            </ul>
            <p className="italic mb-2">Qualifications:</p>
            <ul className="mb-0">
              <li>A current ASU student</li>
              <li>
                Demonstrable experience in marketing or graphic design (a portfolio or sample of
                work is highly encouraged)
              </li>
              <li>
                Proficiency with graphic design software (e.g., Canva, Adobe Express, Figma, or
                Adobe Creative Cloud)
              </li>
              <li>
                A strong understanding of social media platforms, particularly Instagram, including
                their visual formats and post trends
              </li>
              <li>
                A "good eye" for social media presence design and aesthetics, understanding
                composition, and visual storytelling
              </li>
              <li>Ability to work collaboratively in a team environment and meet deadlines</li>
            </ul>
            <h3>Communication Officer</h3>
            <p className="italic mb-2">Responsibilities:</p>
            <ul className="mb-0">
              <li>
                Manage and execute daily digital communications, including drafting emails, posting
                on social media, and making Discord announcements
              </li>
              <li>
                Collaborate closely with the Content Team Lead to brainstorm creative and engaging
                promotional concepts
              </li>
              <li>
                Represent the SoDA brand in a professional, enthusiastic, and approachable manner at
                all times
              </li>
              <li>
                Attend key SoDA meetings, workshops, and social events to establish yourself as a
                recognizable and welcoming figure for both new and existing members
              </li>
              <li>
                Ensure all written communication is clear, engaging, and consistently aligned with
                SoDA's brand voice
              </li>
            </ul>
            <p className="italic mb-2">Qualifications:</p>
            <ul className="mb-0">
              <li>
                A current ASU student and active member of the Software Developers Association
              </li>
              <li>
                Excellent written and verbal communication skills; able to craft clear announcements
                and make others feel comfortable and engaged in person
              </li>
              <li>Exceptional charisma, energy, and confidence</li>
              <li>
                Strong organizational skills to manage communication schedules and meet deadlines
              </li>
              <li>A great attitude and a willingness to learn are the most important qualities</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="industry-relations">
          <AccordionTrigger
            className="text-3xl font-semibold no-underline hover:no-underline py-4"
            showStar
          >
            Industry Relations
          </AccordionTrigger>
          <AccordionContent className="prose lg:prose-xl prose-invert mt-[-2rem]">
            <ul className="mb-0">
              <li>Establish new corporate sponsorships and strategic partnerships</li>
              <li>Maintain relations with existing sponsors and partners</li>
              <li>Arrange for sponsored and partner events, workshops, and other activities</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="community">
          <AccordionTrigger
            className="text-3xl font-semibold no-underline hover:no-underline py-4"
            showStar
          >
            Community
          </AccordionTrigger>
          <AccordionContent className="prose lg:prose-xl prose-invert">
            <p>
              We are looking for officers who truly care about community interaction within SoDA.
              Many of your responsibilities will include planning events, coordinating with others,
              and working with your fellow officers to make sure those events are executed. Members
              of the Community team must be responsible and consistently check Discord for tasks
              they can complete.
            </p>
            <p>
              As a Community officer you will help with the execution of SoDA's lounge hour events,
              which will be changing this coming semester.
            </p>
            <p className="italic mb-2">Lounge hour responsibilities:</p>
            <ul className="mb-0">
              <li>Picking up items for events</li>
              <li>Helping with setup and cleanup</li>
              <li>Planning rooms for events to take place</li>
              <li>Coordinating with other divisions within SoDA to make sure events happen</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="technology">
          <AccordionTrigger
            className="text-3xl font-semibold no-underline hover:no-underline py-4"
            showStar
          >
            Technology
          </AccordionTrigger>
          <AccordionContent className="prose lg:prose-xl prose-invert mt-[-2rem]">
            <ul className="mb-0">
              <li>
                Create and present interactive workshops, continuously improving materials based on
                community feedback and industry advancements
              </li>
              <li>
                Develop content for Flagship Events---hackathons, competitive programming
                competitions, and bootcamps
              </li>
              <li>
                Build and maintain systems that empower SoDA events and officer operations,
                including webdev, internal tooling, and automation
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <div />
      </Accordion>

      <hr className="my-10 border-gray-600" />

      <div id="apply-form" className="my-10 space-y-4">
        <h2 id="apply">Apply</h2>
        <p>
          You can submit your officer application without leaving this page using the embedded form
          below.
        </p>
        <iframe
          src={APPLICATION_FORM_URL}
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          title="SoDA Officer Application Form"
          className="w-full rounded-lg border border-gray-700"
        />
      </div>
    </div>
  );
}
