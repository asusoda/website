import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Code2,
  Coffee,
  GraduationCap,
  HeartHandshake,
  History,
  Menu,
  Sparkles,
  Trophy,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import "./Navbar.css";

type NavItem = { name: string; href: string; description: string; icon: LucideIcon };
const groups = [
  {
    name: "About",
    eyebrow: "MEET YOUR COMMUNITY",
    title: "Built by students, for students.",
    description: "Get to know the students building, learning, and growing together at ASU.",
    items: [
      {
        name: "About SoDA",
        href: "/#about",
        description: "Our community, mission, and story.",
        icon: Sparkles,
      },
      {
        name: "History",
        href: "/history",
        description: "Growing together since 2008.",
        icon: History,
      },
      { name: "Team", href: "/#team", description: "Meet the people behind SoDA.", icon: Users },
      {
        name: "Sponsors",
        href: "/#sponsors",
        description: "The partners making it possible.",
        icon: HeartHandshake,
      },
    ],
  },
  {
    name: "Programs",
    eyebrow: "LEARN. BUILD. BELONG.",
    title: "Your next chapter starts here.",
    description: "Find your people, put ideas into practice, and make something you're proud of.",
    items: [
      {
        name: "Mentorship",
        href: "/mentorship",
        description: "Build real projects with a mentor.",
        icon: GraduationCap,
      },
      {
        name: "Code Challenge",
        href: "/code-challenge",
        description: "Sharpen your problem-solving skills.",
        icon: Code2,
      },
      {
        name: "Hackathons",
        href: "/hackathons",
        description: "Team up. Try something. Ship it.",
        icon: Trophy,
      },
      {
        name: "Lounge Hours",
        href: "/lounge-hours",
        description: "Drop in, get help, and hang out.",
        icon: Coffee,
      },
    ],
  },
  {
    name: "Resources",
    eyebrow: "A LITTLE HELP GOES A LONG WAY",
    title: "Make the most of your time at ASU.",
    description:
      "Helpful links, shared knowledge, and a little friendly competition. All in one place.",
    items: [
      {
        name: "Resources",
        href: "/resources",
        description: "Your starting point for useful tools.",
        icon: BookOpen,
      },
      {
        name: "ASU CS Wiki",
        href: "https://wiki.thesoda.io",
        description: "Computer science, by the community.",
        icon: Code2,
      },
      {
        name: "Platform",
        href: "https://platform.thesoda.io",
        description: "Access the SoDA member platform.",
        icon: Users,
      },
      {
        name: "Leaderboard",
        href: "/leaderboard",
        description: "See who's making their mark.",
        icon: Trophy,
      },
    ],
  },
] as const;
const membershipUrl =
  "https://sundevilcentral.eoss.asu.edu/feeds?type=club&type_id=35661&tab=about";

function NavigationLink({ item, onSelect }: { item: NavItem; onSelect: () => void }) {
  const Icon = item.icon;
  const content = (
    <>
      <span className="soda-nav-icon">
        <Icon size={21} aria-hidden="true" />
      </span>
      <span>
        <span className="soda-nav-link-title">
          {item.name}
          {item.href.startsWith("http") && <ArrowUpRight size={14} aria-hidden="true" />}
        </span>
        <span className="soda-nav-description">{item.description}</span>
      </span>
    </>
  );
  const props = { className: "soda-nav-card", onClick: onSelect, "aria-label": item.name };
  return item.href.startsWith("http") || item.href.includes("#") ? (
    <a
      {...props}
      href={item.href}
      {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  ) : (
    <Link {...props} to={item.href}>
      {content}
    </Link>
  );
}

export default function NavbarSection() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const groupTriggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const location = useLocation();
  const close = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [location.key]);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const reset = () => {
      setOpenGroup(null);
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    window.addEventListener("resize", reset);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("resize", reset);
    };
  }, []);
  return (
    <nav
      ref={navRef}
      className="soda-nav"
      aria-label="Main navigation"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (openGroup) {
          groupTriggers.current[openGroup]?.focus();
          setOpenGroup(null);
        } else if (mobileOpen) {
          mobileTrigger.current?.focus();
          setMobileOpen(false);
        }
      }}
    >
      <div className="soda-nav-bar">
        <Link
          to="/"
          className="soda-nav-brand"
          aria-label="SoDA home"
          onClick={() => {
            close();
            window.scrollTo(0, 0);
          }}
        >
          <img src="/logo/Soda_Logo_Dark_Mode.svg" width="314" height="132" alt="SoDA" />
        </Link>
        <div id="soda-navigation" className={`soda-nav-links${mobileOpen ? " is-open" : ""}`}>
          {groups.map((group) => (
            <div className="soda-nav-group" key={group.name}>
              <button
                type="button"
                className="soda-nav-trigger"
                ref={(node) => {
                  groupTriggers.current[group.name] = node;
                }}
                aria-expanded={openGroup === group.name}
                aria-controls={`soda-panel-${group.name}`}
                onClick={() => setOpenGroup(openGroup === group.name ? null : group.name)}
              >
                {group.name}
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              <div
                id={`soda-panel-${group.name}`}
                className="soda-nav-panel"
                hidden={openGroup !== group.name}
              >
                <div className="soda-nav-panel-inner">
                  <div className="soda-nav-directory">
                    <p className="soda-nav-eyebrow">EXPLORE {group.name.toUpperCase()}</p>
                    <div className="soda-nav-card-grid">
                      {group.items.map((item) => (
                        <NavigationLink key={item.name} item={item} onSelect={close} />
                      ))}
                    </div>
                  </div>
                  <aside className="soda-nav-feature">
                    <span className="soda-nav-eyebrow">{group.eyebrow}</span>
                    <h2>{group.title}</h2>
                    <p>{group.description}</p>
                    <a
                      href={membershipUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                    >
                      Find your place at SoDA <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </aside>
                </div>
                <div className="soda-nav-panel-footer">
                  <span>Student-led. Community-powered.</span>
                  <span>
                    Open to every Sun Devil <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Shop intentionally keeps its external-link icon and internal route. */}
          <Link className="soda-nav-direct" to="/shop" onClick={close}>
            Shop <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link className="soda-nav-direct" to="/donate" onClick={close}>
            Donate
          </Link>
        </div>
        <div className="soda-nav-actions">
          <a
            className="soda-nav-join"
            href={membershipUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a Member
          </a>
          <button
            ref={mobileTrigger}
            className="soda-nav-mobile-toggle"
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="soda-navigation"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setOpenGroup(null);
            }}
          >
            {mobileOpen ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
