import { type CSSProperties, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiAmazon,
  SiAmericanexpress,
  SiGeneralmotors,
  SiGodaddy,
  SiGoldmansachs,
  SiGarmin,
  SiPaypal,
  SiStarbucks,
} from "react-icons/si";
import sponsors from "./sponsors.json";
import amazon from "./logo/amazon.webp";
import statefarm from "./logo/statefarm.webp";
import drivetime from "./logo/drivetime.webp";
import deloitte from "./logo/deloitte.webp";
import goldmansachsLogo from "./logo/goldmansachs.webp";
import garminLogo from "./logo/garmin.webp";
import starbucksLogo from "./logo/starbucks.webp";
import paypalLogo from "./logo/paypal.webp";
import godaddyLogo from "./logo/godaddy.webp";
import americanexpressLogo from "./logo/americanexpress.webp";
import axosoft from "./logo/axosoft.webp";
import workiva from "./logo/workiva.webp";
import generalmotorsLogo from "./logo/generalmotors.webp";

type SponsorLogo =
  | "amazon"
  | "statefarm"
  | "drivetime"
  | "deloitte"
  | "goldmansachs"
  | "garmin"
  | "starbucks"
  | "paypal"
  | "godaddy"
  | "americanexpress"
  | "axosoft"
  | "workiva"
  | "generalmotors";

type SponsorEntry = {
  name: SponsorLogo;
  src: string;
  url: string;
  label: string;
  Icon?: IconType;
};

function SponsorsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
  const [marqueeDuration, setMarqueeDuration] = useState(20);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateSliderSettings = () => {
      setMarqueeDuration(mediaQuery.matches ? 14 : 20);
    };

    updateSliderSettings();
    mediaQuery.addEventListener("change", updateSliderSettings);

    return () => mediaQuery.removeEventListener("change", updateSliderSettings);
  }, []);

  const logoMap: Record<SponsorLogo, string> = {
    amazon,
    statefarm,
    drivetime,
    deloitte,
    goldmansachs: goldmansachsLogo,
    garmin: garminLogo,
    starbucks: starbucksLogo,
    paypal: paypalLogo,
    godaddy: godaddyLogo,
    americanexpress: americanexpressLogo,
    axosoft,
    workiva,
    generalmotors: generalmotorsLogo,
  };

  const iconMap: Partial<Record<SponsorLogo, IconType>> = {
    amazon: SiAmazon,
    goldmansachs: SiGoldmansachs,
    garmin: SiGarmin,
    starbucks: SiStarbucks,
    paypal: SiPaypal,
    godaddy: SiGodaddy,
    americanexpress: SiAmericanexpress,
    generalmotors: SiGeneralmotors,
  };

  const urlMap: Record<SponsorLogo, string> = {
    amazon: "https://www.aboutamazon.com/",
    statefarm: "https://www.statefarm.com/",
    drivetime: "https://www.drivetime.com/",
    deloitte: "https://www2.deloitte.com/",
    goldmansachs: "https://www.goldmansachs.com/",
    garmin: "https://www.garmin.com/",
    starbucks: "https://www.starbucks.com/",
    paypal: "https://www.paypal.com/",
    godaddy: "https://www.godaddy.com/",
    americanexpress: "https://www.americanexpress.com/",
    axosoft: "https://www.axosoft.com/",
    workiva: "https://www.workiva.com/",
    generalmotors: "https://www.gm.com/",
  };

  const labelMap: Record<SponsorLogo, string> = {
    amazon: "Amazon",
    statefarm: "State Farm",
    drivetime: "DriveTime",
    deloitte: "Deloitte",
    goldmansachs: "Goldman Sachs",
    garmin: "Garmin",
    starbucks: "Starbucks",
    paypal: "PayPal",
    godaddy: "GoDaddy",
    americanexpress: "American Express",
    axosoft: "Axosoft",
    workiva: "Workiva",
    generalmotors: "General Motors",
  };

  const sponsorEntries = sponsors.reduce<SponsorEntry[]>((acc, entry) => {
    const name = entry.name as SponsorLogo;
    const src = logoMap[name];
    const Icon = iconMap[name];
    const url = urlMap[name];
    const label = labelMap[name];

    if (!src || !url || !label) {
      return acc;
    }

    acc.push({
      name,
      src,
      url,
      label,
      Icon,
    });
    return acc;
  }, []);

  const duplicatedSponsors = [...sponsorEntries, ...sponsorEntries];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    itemRefs.current.forEach((item) => {
      if (!item) return;
      item.style.transformOrigin = "center";
      item.style.transition = "transform 0.45s ease-out, opacity 0.45s ease-out";
    });

    let frameId = 0;

    const tick = () => {
      const { left, width } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const maxDistance = Math.max(width / 2, 1);

      itemRefs.current.forEach((item) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - itemCenter);
        const clamped = Math.min(distance / maxDistance, 1);
        const baseScale = 0.78;
        const scaleBoost = 0.92;
        const scale = baseScale + (1 - clamped) * scaleBoost;
        const opacity = 0.45 + (1 - clamped) * 0.55;
        item.style.transform = `scale(${scale})`;
        item.style.opacity = opacity.toString();
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section id="sponsors" className="flex w-full flex-col items-center gap-8 px-0 text-center">
      <h2 className="section-header-text">Sponsors</h2>
      <p className="max-w-2xl text-sm text-gray-400 md:text-base">
        We&apos;re grateful for the partners who support our members with mentorship, workshops, and
        recruiting opportunities.
      </p>
      <div
        ref={containerRef}
        className="sponsors-marquee"
        style={
          {
            "--sponsors-duration": `${marqueeDuration}s`,
          } as CSSProperties
        }
      >
        <div className="sponsors-track">
          {duplicatedSponsors.map(({ src, Icon, name, url, label }, index) => (
            <a
              key={`${name}-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-full min-h-[120px] w-44 items-center justify-center px-8 py-6 opacity-70 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soda-blue md:min-h-[160px] md:w-56"
            >
              {Icon ? (
                <Icon className="h-16 w-16 text-soda-white md:h-20 md:w-20" />
              ) : (
                <img src={src} alt={label} className="h-16 w-auto object-contain md:h-20" />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorsMarquee;
