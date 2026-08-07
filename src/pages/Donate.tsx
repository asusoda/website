import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Zap, FileText, Mail, ExternalLink, Check } from "lucide-react";

const ASU_FOUNDATION_URL =
  "https://www.asufoundation.org/changing-futures/inspire-tomorrows-game-changers/software-developers-association-CA105152.html";

const PAYPAL_URL: string = "https://www.paypal.com/paypalme/SoDAASU";

const SPONSOR_PACKET_URL = "/SoDA_Sponsorship_Packet_2026-2027.pdf";
const CONTACT_EMAIL = "asu@thesoda.io";

type Tier = {
  name: string;
  price: string;
  highlight?: boolean;
  benefits: string[];
};

const tiers: Tier[] = [
  {
    name: "Silver",
    price: "$1,750/yr",
    benefits: [
      "Present at 2 SoDA meetings per year",
      "Booth at Fall Hackathon and Spring Code Challenge",
      "Logo on annual SoDA t-shirts",
      "Sponsor shout-out on social and newsletter",
      "Access to event resume drop and curated resume book",
    ],
  },
  {
    name: "Gold",
    price: "$2,750/yr",
    highlight: true,
    benefits: [
      "Everything in Silver",
      "Present at 3 SoDA meetings per year",
      "Priority pick for meeting dates and hosted off-cycle meetings",
      "Dedicated social media posts",
      "Personalized recap packet with event photos",
      "Promote capstone projects to ASU coordination office",
      "10% discount on renewal",
    ],
  },
  {
    name: "Platinum",
    price: "$3,750/yr",
    benefits: [
      "Everything in Gold",
      "Present at 4 SoDA meetings per year",
      "Premium booth at Fall Hackathon and Spring Code Challenge",
      "Host or influence special events (judges, problem statements, custom challenges)",
      "Sponsor-specific recruitment events",
    ],
  },
  {
    name: "Single Event",
    price: "$550",
    benefits: [
      "Sponsor one event à la carte",
      "Technical workshops, panels, AMAs, info sessions, lounge hours",
    ],
  },
];

const staggerFade = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.5, bounce: 0, delay: i * 0.1 },
  }),
};

export default function Donate() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 antialiased">
      <Helmet>
        <title>Donate and Sponsor - SoDA</title>
        <meta
          name="description"
          content="Support the Software Developers Association at ASU. Make a tax-deductible donation through the ASU Foundation, contribute directly via PayPal, or sponsor SoDA as a company."
        />
      </Helmet>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={staggerFade}
            className="mb-12 md:mb-16"
          >
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Support SoDA
            </h1>
            <p
              className="text-gray-400 text-lg md:text-xl max-w-3xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              SoDA is the largest software developer club at ASU, with 2,500+ members, a 4.2k social
              reach, and regular meetings drawing 60 to 400+ attendees. Your contribution funds
              hackathons, code challenges, the mentorship program, alumni events, and everything in
              between.
            </p>
          </motion.div>

          {/* Donation Channels */}
          <motion.h2
            custom={1}
            initial="hidden"
            animate="show"
            variants={staggerFade}
            className="text-2xl md:text-3xl font-semibold mb-6"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Ways to give
          </motion.h2>

          <motion.div
            custom={2}
            initial="hidden"
            animate="show"
            variants={staggerFade}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* PayPal (preferred) */}
            <Card className="bg-blue-500/10 border-blue-400/40 rounded-3xl flex flex-col shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_10px_30px_-12px_rgba(59,130,246,0.3)]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-blue-400" size={28} />
                  <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                    Preferred
                  </span>
                </div>
                <CardTitle
                  className="text-2xl md:text-3xl text-white"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  PayPal
                </CardTitle>
                <CardDescription
                  className="text-gray-300 text-base"
                  style={{ textWrap: "pretty" } as React.CSSProperties}
                >
                  Routes directly to SoDA's nonprofit account, linked to our EIN, with no
                  deductions. This is the fastest way to support us and ensures your full
                  contribution reaches our initiatives.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    100% of your contribution reaches SoDA, no deductions
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    Funds available immediately, no budget-request cycle
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    W9 available on request for corporate sponsors
                  </li>
                </ul>
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="!bg-blue-500 hover:!bg-blue-600 text-white rounded-xl active:scale-[0.96] !transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)]"
                  >
                    <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
                      Donate via PayPal
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="!bg-transparent hover:!bg-zinc-800/60 text-white border border-zinc-700 hover:!border-blue-400/50 rounded-xl active:scale-[0.96] !transition-[transform,background-color,border-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)]"
                  >
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=W9%20request%20for%20SoDA%20sponsorship`}
                    >
                      Request W9
                      <Mail size={16} className="ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* ASU Foundation (alternative) */}
            <Card className="bg-zinc-900/80 border-zinc-800 rounded-3xl flex flex-col shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="text-soda-red" size={28} />
                  <span className="text-xs uppercase tracking-wider text-soda-red font-semibold">
                    Alternative
                  </span>
                </div>
                <CardTitle
                  className="text-2xl md:text-3xl text-white"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  ASU Foundation
                </CardTitle>
                <CardDescription
                  className="text-gray-400 text-base"
                  style={{ textWrap: "pretty" } as React.CSSProperties}
                >
                  Pay your invoice online by credit card, or mail a check written out to ASU
                  Foundation with "SoDA" in the subject line. Funds are appropriated to SoDA via
                  budget requests.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li className="flex gap-2">
                    <Check size={16} className="text-soda-red shrink-0 mt-0.5" />
                    501(c)(3) tax-deductible receipt issued by the ASU Foundation
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-soda-red shrink-0 mt-0.5" />
                    95% of your gift is directed to SoDA; 5% supports ASU's strategic initiatives
                    per Foundation policy
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-soda-red shrink-0 mt-0.5" />
                    Accepts credit card, check, wire, and employer matching programs
                  </li>
                </ul>
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="!bg-soda-red hover:!bg-soda-red/90 text-white rounded-xl active:scale-[0.96] !transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)]"
                  >
                    <a href={ASU_FOUNDATION_URL} target="_blank" rel="noopener noreferrer">
                      Donate via ASU Foundation
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsorship Tiers */}
          <motion.h2
            custom={3}
            initial="hidden"
            animate="show"
            variants={staggerFade}
            className="text-2xl md:text-3xl font-semibold mb-2"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Corporate sponsorship
          </motion.h2>
          <motion.p
            custom={4}
            initial="hidden"
            animate="show"
            variants={staggerFade}
            className="text-gray-400 mb-6 max-w-3xl"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            Engage with up-and-coming software developers, increase brand visibility across ASU, and
            recruit from a pool of 2,500+ students actively seeking internships and full-time roles.
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                custom={5 + i}
                initial="hidden"
                animate="show"
                variants={staggerFade}
                className="h-full"
              >
                <Card
                  className={`rounded-3xl flex flex-col h-full shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)] ${
                    tier.highlight
                      ? "bg-soda-red/10 border-soda-red/50"
                      : "bg-zinc-900/80 border-zinc-800"
                  }`}
                >
                  <CardHeader>
                    {tier.highlight && (
                      <span className="text-xs uppercase tracking-wider text-soda-red font-semibold mb-1">
                        Most popular
                      </span>
                    )}
                    <CardTitle
                      className="text-xl text-white"
                      style={{ textWrap: "balance" } as React.CSSProperties}
                    >
                      {tier.name}
                    </CardTitle>
                    <CardDescription
                      className="text-white/90 text-lg font-semibold"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {tier.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="text-gray-300 text-sm space-y-2">
                      {tier.benefits.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Check
                            size={14}
                            className={`shrink-0 mt-1 ${
                              tier.highlight ? "text-soda-red" : "text-blue-400"
                            }`}
                          />
                          <span style={{ textWrap: "pretty" } as React.CSSProperties}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            custom={9}
            initial="hidden"
            animate="show"
            variants={staggerFade}
            className="grid sm:grid-cols-2 gap-4 mb-16"
          >
            <Button
              asChild
              className="h-auto min-h-[56px] py-4 px-4 !bg-zinc-900/80 hover:!bg-zinc-800/80 text-white border border-zinc-800 hover:!border-blue-400/50 justify-start rounded-2xl active:scale-[0.96] !transition-[transform,border-color,background-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)]"
            >
              <a href={SPONSOR_PACKET_URL} target="_blank" rel="noopener noreferrer">
                <FileText className="text-blue-400 mr-3" size={22} />
                <span className="flex flex-col items-start">
                  <span className="text-base font-semibold text-white">
                    Full sponsorship packet
                  </span>
                  <span className="text-sm text-gray-400">
                    PDF with benefits, tiers, and donation form
                  </span>
                </span>
              </a>
            </Button>
            <Button
              asChild
              className="h-auto min-h-[56px] py-4 px-4 !bg-soda-red hover:!bg-soda-red/90 text-white justify-start rounded-2xl active:scale-[0.96] !transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)]"
            >
              <a href={`mailto:${CONTACT_EMAIL}?subject=SoDA%20Sponsorship%20Inquiry`}>
                <Mail className="mr-3" size={22} />
                <span className="flex flex-col items-start">
                  <span className="text-base font-semibold">Talk to our sponsorship team</span>
                  <span className="text-sm opacity-90">{CONTACT_EMAIL}</span>
                </span>
              </a>
            </Button>
          </motion.div>

          {/* Fine print */}
          <div
            className="text-xs text-gray-500 border-t border-zinc-800 pt-6"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            Gifts to the ASU Foundation for A New American University, a nonprofit organization that
            exists to support Arizona State University, are subject to Foundation policies and fees.
            Donors may restrict 95% of any gift for specific purposes; 5% of each gift received is
            unrestricted for the University's use. Please consult your tax advisor regarding the
            deductibility of charitable contributions.
          </div>
        </div>
      </section>
    </div>
  );
}
