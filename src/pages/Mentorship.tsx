import React from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownContent = `
# Mentorship Program

The Mentorship Program is designed to connect underclassmen with experienced upperclassmen to foster professional growth and development. This SoDA initiative aims to provide valuable guidance and support to students through a structured mentoring process. Check out past mentee projects below!

Sign up to be a mentor [here](https://forms.gle/xtks7VpbyLHcy2XY9).

Sign up to be a mentee [here](https://forms.gle/Feu2GAfWQmashLZm9).

## Responsibilities and Perks

### Mentors
**Responsibilities**

- Share professional insights and support.
- Help their (2-3) mentees create a project from scratch over the course of 2 months
- Stay active and communicative
- 1-2 hr Time commitment per week

**Perks:** 

- **Volunteer:** Contribute to the professional growth of students.
- **Special Opportunities:** Access to industry speakers and exclusive events and priority consideration for SoDA Officer recruitment and perks.
- **Certificate of Mentorship:** Enhance your resume with formal recognition.
- **Networking:** Meet industry professionals at our Alumni Banquet.

### Mentees
**Responsibilities**

- Stay active and communicative
- Work on a project
- 2-3 hr Time commitment per week (variable)

**Perks**

- **Personalized Help:** Receive tailored advice and support.
- **Skill Expansion:** Gain new skills from exclusive workshops and practical experience.
- **Support System:** Benefit from a structured support system, particularly useful during freshman/sophomore years.
- **Resume Aid:** Build a project to enhance your coding skills and level up your resume.
- **Networking:** Get the opportunity to network and present to industry professionals at our Alumni Banquet.

### Communication

- **Discord Channel:** Dedicated space for mentors and mentees to receive updates and reminders.
- **Lounge Hours:** Strongly encouraged to attend.


## FAQ

#### If I've applied previously and didn't get in, should I apply again?

Absolutely! Due to the high volume of mentees and limited mentors, we aren't able to accept everyone, so we encourage students to apply again.

#### If I've been a mentee previously can I apply again?

If you successfully completed the program, you can re-apply, but because we want to provide opportunities to other students, you might not be accepted again.

#### What if I'm unable to complete the program?

Let us know! Please check our requirements and make sure you're able to commit to the program beforehand, but we understand that life happens. Just contact your mentor and the program directors and let them know you won't be able to complete it asap.



## Past Mentee Projects

- [AegisCheck Device Security Advisor](https://docs.google.com/presentation/d/10zfAyyPBSTMyYRJ8c3B1oJjxGdeSrIPUiN6ap1XQq3o/edit?usp=sharing)
- [AI-Powered Career Pathway Recommender for Students](https://www.canva.com/design/DAG6gm_BJmk/4rSJlwC1V1we5ITQ2bXc7A/edit?utm_content=DAG6gm_BJmk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Centsible](https://docs.google.com/presentation/d/1vI31THxieC1meoEArUugXvOTLyi6d9cRBjznbMDrcC4/edit?usp=sharing)
- [ClarityRead](https://docs.google.com/presentation/d/1C-wiW3cu88dU725C3dWOcjnjr_rF5xb9ow5HEreYpc0/edit?usp=sharing)
- [Culture Bites](https://docs.google.com/presentation/d/1TxgRJDfrUUf2I8zSrY04ovv0vOxr6t1QTHuXQpgwR4o/edit?usp=sharing)
- [EcoPulse](https://docs.google.com/presentation/d/1JX5SuBtRrCotTTZYShOoAPpleHJkNHYmgDd0h0g_Dck/edit?usp=sharing)
- [LED Strip Controller](https://drive.google.com/open?id=1Ao-3WdJbkPmUnTC1Pz0CJzkIUbpv1E0l)
- [Waste Classifier App](https://docs.google.com/presentation/d/1LFWdR7HNzJbx5KHx3-zSLrZsTm78KtmLeneGlnGrUw4/edit?usp=sharing)
`;

export default function Mentorship() {
  return (
    <div className="max-w-5xl mx-auto p-6 my-28 shadow-md rounded-lg">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Mentorship Program</title>
        <meta name="description" content="Learn about the ASU Soda Mentorship Program, designed to connect students with experienced mentors for professional growth." />
        <meta name="keywords" content="Mentorship Program, ASU Soda, Mentorship, Professional Growth, Student Mentorship, Mentorship Program Details, Computer science, CS Club" />
      </Helmet>

      <div className="prose lg:prose-xl prose-invert">
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </div> // Add the missing closing tag for the main container div
  );
}
