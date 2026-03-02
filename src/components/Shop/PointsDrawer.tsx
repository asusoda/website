import React, { useState } from "react";
import PointsBreakdownTable from "./PointsBreakdownTable";
import { ArrowLeft, X } from "lucide-react";

/**
 * Floating drawer that keeps the points table accessible across all shop pages.
 * Shows a vertical "Points" tab; hovering or focusing the drawer reveals the table.
 */
const PointsDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const translateClass = isOpen ? "translate-x-0" : "translate-x-[calc(100%-2rem)]";

  return (
    <>
      <div className="fixed top-1/2 right-[-6px] -translate-y-1/2 z-40 group/drawer hidden md:block">
        <div
          className={`flex items-center transition-transform duration-300 ease-out ${translateClass}`}
          onMouseEnter={openDrawer}
          onMouseLeave={closeDrawer}
        >
          <div
            className="bg-blue-500/20 backdrop-blur-md text-white w-4 sm:w-5 px-0.5 py-3 border border-white/15 shadow-lg shadow-blue-500/10 text-[10px] font-semibold tracking-[0.25em] uppercase h-[23vh] flex items-center justify-between cursor-pointer select-none"
            style={{ writingMode: "vertical-rl" }}
            role="button"
            tabIndex={0}
            onClick={toggleOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleOpen();
              }
            }}
          >
            <ArrowLeft size={20} color="grey" /> Points Breakdown{" "}
            <ArrowLeft size={20} color="grey" />
          </div>
          <div className="w-[340px] max-h-[80vh] overflow-y-auto border border-white/10 rounded-l-none rounded-r-xl">
            <PointsBreakdownTable />
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        {!isOpen ? (
          <button
            type="button"
            onClick={openDrawer}
            className="bg-blue-500/20 backdrop-blur-md text-white border border-white/15 shadow-lg shadow-blue-500/10 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider"
          >
            Points
          </button>
        ) : (
          <div className="w-[calc(100vw-2rem)] max-w-sm">
            <div className="flex items-center justify-end mb-2">
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close points breakdown"
                className="bg-black/40 backdrop-blur-md text-white border border-white/15 rounded-full p-2"
              >
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto border border-white/10 rounded-xl">
              <PointsBreakdownTable />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PointsDrawer;
