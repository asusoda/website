import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserPoints } from "../../hooks/useUserPoints";
import { ERROR_MESSAGES } from "../../lib/api";

/**
 * Compact info banner shown once when a signed-in
 * user has 0 points or no points record found.
 *
 * Two cases:
 *  No points record found (404)
 *  Record found but total_points === 0
 */
const ZeroPointsDialog: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const { userPoints, loading, error } = useUserPoints();
  const [open, setOpen] = useState(true);

  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  const isNoRecord = error === ERROR_MESSAGES.NO_POINTS_RECORD;
  const isZeroPoints = !error && userPoints !== null && userPoints.total_points === 0;

  useEffect(() => {
    if (!isSignedIn || loading || !email) return;
    if (!isNoRecord && !isZeroPoints) return;

    const storageKey = `seenZeroPoints:${email}`;
    if (localStorage.getItem(storageKey)) return;

    setOpen(true);
  }, [isSignedIn, loading, isNoRecord, isZeroPoints, email]);

  const handleDismiss = () => {
    const storageKey = `seenZeroPoints:${email}`;
    localStorage.setItem(storageKey, "true");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 w-72 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-white text-sm font-semibold">
                {isNoRecord ? "No points record found" : "You have 0 points"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-gray-500 hover:text-white transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>

          {/* Current email */}
          <div className="bg-zinc-800 rounded-lg px-3 py-2 mb-3 border border-white/5">
            <p className="text-gray-500 text-[10px] mb-0.5">Signed in as</p>
            <p className="text-white font-mono text-xs break-all">{email}</p>
          </div>

          {/* Instruction */}
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            If you signed in with an alias email, try using your ASURITE email{" "}
            <span className="text-blue-400 font-mono">{"<asurite>"}@asu.edu</span>.
          </p>

          <button
            type="button"
            onClick={handleDismiss}
            className="w-full bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ZeroPointsDialog;
