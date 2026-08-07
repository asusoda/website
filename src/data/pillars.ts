export interface Pillar {
  slug: string;
  header: string;
  description: string;
  imgURL: string;
  alt: string;
  // Hover-play video, added per pillar once footage is available.
  videoURL?: string;
}

export const pillars: Pillar[] = [
  {
    slug: "professional-development",
    header: "Professional Development",
    description:
      "SoDA offers boundless opportunities to advance your career. From technical workshops hosted by industry leaders to career fairs and networking events, you’ll gain invaluable experience and connections to kickstart your journey as a software developer.",
    imgURL: "/events/amazon-table.webp",
    alt: "Amazon table at a SoDA event",
  },
  {
    slug: "community",
    header: "Community and Support",
    description:
      "SoDA provides a supportive network of fellow computer science students, offering collaboration, encouragement, and a sense of belonging through regular meetings and events with free food.",
    imgURL: "/events/microsoft-resume-review.webp",
    alt: "Microsoft resume review at a SoDA event",
  },
  {
    slug: "learning",
    header: "Learning",
    description:
      "Enhance your skills through a variety of learning opportunities, including coding workshops, bootcamps, and talks from industry professionals. SoDA is committed to your personal and professional growth, ensuring you stay ahead in the fast-paced tech world.",
    imgURL: "/events/what-is-soda.webp",
    alt: "SoDA members at a meeting",
  },
];
