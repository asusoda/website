import { ReactNode } from "react";

interface ContentItemTypes {
  id: number;
  title: string;
  content: ReactNode[];
  button: string;
}

const content: ContentItemTypes[] = [
  {
    id: 1,
    title: "How To Join SoDA",
    content: [
      <p key="p1">
        Want to join SoDA? Just go to one of our meetings! Everyone who attends our meetings is a
        SoDA member.
      </p>,
    ],
    button: "Join our SunDevilSync",
  },
  {
    id: 2,
    title: "Professional Development",
    content: [
      <p key="p2">
        We want students to become familiar with industry by helping them prepare for technical
        interviews, and showing them how and when to apply.
      </p>,
    ],
    button: "Learn more",
  },
  {
    id: 3,
    title: "Technical Workshops",
    content: [
      <p key="p3">
        Want to join SoDA? Just go to one of our meetings! Everyone who attends our meetings is a
        SoDA member.
      </p>,
    ],
    button: "Learn more",
  },
  {
    id: 4,
    title: "SoDA Code Challenge X",
    content: [
      <p key="p4">
        Want to join SoDA? Just go to one of our meetings! Everyone who attends our meetings is a
        SoDA member.
      </p>,
    ],
    button: "Sign up now",
  },
  {
    id: 5,
    title: "Community",
    content: [
      <p key="p5">
        Want to join SoDA? Just go to one of our meetings! Everyone who attends our meetings is a
        SoDA member.
      </p>,
    ],
    button: "Join our SunDevilSync",
  },
];

export default content;
