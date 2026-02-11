import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownContent = `# SoDA pop Program 
### (fka Distinguished Members Program)

The **SoDA PoP Program** is designed to incentivize active involvement through a structured framework of rewards and recognitions. This program aims to enhance the overall club experience while offering tangible benefits to our members.

# Objectives

1. **Increase Active Participation:** Encourage consistent attendance at meetings, workshops, and club events.
2. **Enhance Member Skills:** Motivate members to engage deeply with technical content and collaborative projects.
3. **Build Community:** Strengthen the sense of belonging and teamwork within the club.
4. **Recognize Contributions:** Acknowledge and reward the efforts and achievements of our members.

# Perks and Rewards

Members can earn points through various activities such as attending meetings, participating in discussions, contributing to projects, and more. These points lead to numerous benefits, including:

- **Priority Opportunities:** Access to limited-space events and seats on SoDA Team Trip to Sponsor's Office (more details to come as the semester progresses).
- **Professional Advancement:** Enhanced visibility in our Resume Book and potential recommendation letters.
- **Exclusive Access:** Voting rights on future workshop topics and direct interactions with industry professionals.
- **Alumni Banquet:** Invitation to Alumni Banquet at the end of the semester/year. (more details coming out soon)

## Point System Breakdown

Earn points through different activities to unlock rewards. Here’s a breakdown:

| **Activity Category**     | **Specific Activity**                                                                 | **Points Awarded** | **Notes**                                                                                   |
|---------------------------|----------------------------------------------------------------------------------------|--------------------|---------------------------------------------------------------------------------------------|
| **Meetings**              | Attend in-person meeting                                                              | 10                 | Higher points for in-person attendance                                                      |
|                           | Attend online meeting                                                                 | Approx. 5          | Encourages participation regardless of location                                             |
|                           | Attend Lounge hours                                                                   | 5                  |                                                                                             |
| **Active Participation**  | Asking questions or contributing to meetings by interacting with workshops/presenters | 1 each time        | Promotes lively discussions and engagement                                                  |
|                           | Bonus points for participation                                                        | 5                  |                                                                                             |
| **Discord Engagement**    | Engaging with the Discord in general and asking questions (not answering questions)    | 2 per month        | Maximum of 10 points per semester; subject to director's discretion                         |
|                           | Helpful post or solving a query                                                       | 5 per instance     | Encourages peer support (cap of 15 points per semester)                                     |
| **Workshop Contribution** | Submit a workshop challenge                                                           | 20                 | Encourages taking the initiative to engage with the events                                  |
`;

export default function PointsSystem() {
  return (
    <div className="max-w-5xl mx-auto p-6 my-28 shadow-md rounded-lg">
      {/* Helmet for SEO */}
      <Helmet>
        <title>SoDA PoP</title>
        <meta
          name="description"
          content="Explore ASU Soda's Distinguished Members Program, designed to reward active members with perks, career growth, and exclusive opportunities."
        />
        <meta
          name="keywords"
          content="Distinguished Members Program, ASU Soda, Points System, Active Participation, Member Rewards, Member Perks, Member Benefits, computer science, CS, software development"
        />
      </Helmet>

      <div className="prose lg:prose-xl prose-invert prose-th:border prose-td:border prose-th:border-neutral-300 prose-td:border-neutral-300 prose-th:p-2 prose-td:p-2">
        <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} />
      </div>
    </div> // Add the missing closing tag for the main container div
  );
}
