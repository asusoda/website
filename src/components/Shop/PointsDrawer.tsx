import React, { useState } from "react";
import PointsBreakdownTable from "./PointsBreakdownTable";

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
    <div className="fixed top-1/2 right-[-6px] -translate-y-1/2 z-40 group/drawer">
      <div
        className={`flex items-center transition-transform duration-300 ease-out ${translateClass}`}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
      >
        <div
          className="bg-blue-500/20 backdrop-blur-md text-white w-4 sm:w-5 px-0.5 py-3 border border-white/15 shadow-lg shadow-blue-500/10 text-[10px] font-semibold tracking-[0.25em] uppercase h-[60vh] flex items-center justify-center cursor-pointer select-none"
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
          Points
        </div>
        <div className="w-[340px] max-h-[80vh] overflow-y-auto border border-white/10 rounded-l-none rounded-r-xl">
          <PointsBreakdownTable />
        </div>
      </div>
    </div>
  );
};

export default PointsDrawer;
