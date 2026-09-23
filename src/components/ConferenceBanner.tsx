import { ArrowUpRight } from "lucide-react";
import "./ConferenceBanner.css";

export default function ConferenceBanner() {
  return (
    <aside aria-label="Conference announcement" className="conference-banner">
      <a href="https://wtc.thesoda.io/" className="conference-banner__link">
        <time dateTime="2026-09-25" className="conference-banner__date">
          <span>SEP</span>
          <span>25</span>
          <span className="sr-only">2026</span>
        </time>
        <span className="conference-banner__event">
          <span className="conference-banner__eyebrow">SoDA × WiCS · Women in Tech Conference</span>
          <span className="conference-banner__title">
            Ada Lovelace Summit <span className="conference-banner__edition">III</span>
          </span>
        </span>
        <span className="conference-banner__details">11 AM–5 PM · Memorial Union</span>
        <span className="conference-banner__cta">
          Explore the summit
          <span className="conference-banner__arrow">
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        </span>
      </a>
    </aside>
  );
}
