import { Helmet } from "react-helmet-async";

export default function TravelReimbursement() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Helmet>
        <title>Travel Reimbursement - SoDA</title>
        <meta
          name="description"
          content="Submit your travel reimbursement through the SoDA Notion form."
        />
      </Helmet>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 h-[calc(100vh-8rem)]">
        <div className="h-full w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/60">
          <iframe
            src="https://asusoda.notion.site/ebd//3bdd9941980245958ca355d9e986e413"
            title="SoDA Travel Reimbursement Form"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
