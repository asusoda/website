import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Forms() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Helmet>
        <title>Forms - SoDA</title>
        <meta
          name="description"
          content="Access official SoDA forms including travel reimbursement."
        />
      </Helmet>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Forms</h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10">
            Quick access to operational forms for members and officers.
          </p>

          <Link to="/forms/travel-reimbursment" className="block group">
            <Card className="bg-zinc-900/80 border-zinc-800 hover:border-blue-400/40 hover:bg-zinc-900 transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl flex items-center justify-between gap-3 text-white">
                  <span className="flex items-center gap-3">
                    <FileText className="text-blue-400" size={26} />
                    Travel Reimbursement Form
                  </span>
                  <ArrowRight className="text-blue-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Submit reimbursement requests through the official SoDA Notion form.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
