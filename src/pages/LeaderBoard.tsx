import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

interface PointsDetails {
  awarded_by?: string;
  event: string;
  points: number;
  timestamp: string;
}

interface LeaderboardEntry {
  identifier?: string;
  name: string;
  points_details: PointsDetails[];
  total_points: number;
}

const FALLBACK_URL = "/leaderboard-fallback.json";
const ITEMS_PER_PAGE = 10;

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  data: PointsDetails[];
  name: string;
}> = ({ isOpen, onClose, data, name }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto text-white border border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Points Breakdown for {name}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-800">
                <th className="p-2 text-left border border-zinc-700">Event</th>
                <th className="p-2 text-left border border-zinc-700">Points</th>
                <th className="p-2 text-left border border-zinc-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((detail, index) => (
                <tr
                  key={`${detail.timestamp}-${index}`}
                  className="hover:bg-soda-blue/5 transition-colors"
                >
                  <td className="p-2 border border-zinc-700">{detail.event}</td>
                  <td className="p-2 border border-zinc-700">{detail.points}</td>
                  <td className="p-2 border border-zinc-700">
                    {new Date(detail.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded bg-soda-red text-white hover:bg-soda-red/70 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadFallbackData = async () => {
      if (!import.meta.env.DEV) return false;

      try {
        const response = await fetch(FALLBACK_URL);
        if (!response.ok) {
          throw new Error(`Fallback leaderboard request failed (${response.status})`);
        }

        const fallbackData = (await response.json()) as LeaderboardEntry[];

        if (isMounted) {
          setLeaderboardData(fallbackData);
          setError(null);
        }

        return true;
      } catch (fallbackError) {
        console.error("Failed to load fallback leaderboard data", fallbackError);
        return false;
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("https://api.thesoda.io/api/points/soda/leaderboard");
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = (await response.json()) as LeaderboardEntry[];
        if (isMounted) {
          setLeaderboardData(data);
        }
      } catch (fetchError) {
        console.error("Failed to fetch leaderboard data", fetchError);
        const fallbackUsed = await loadFallbackData();
        if (!fallbackUsed && isMounted) {
          setError((fetchError as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = leaderboardData.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (b.total_points === a.total_points) {
        return a.name.localeCompare(b.name);
      }
      return b.total_points - a.total_points;
    });
  }, [filteredData]);

  const { podiumEntries, remainderEntries } = useMemo(() => {
    const podiumCount = Math.min(3, sortedData.length);
    return {
      podiumEntries: sortedData.slice(0, podiumCount),
      remainderEntries: sortedData.slice(podiumCount),
    };
  }, [sortedData]);

  useEffect(() => {
    const computedTotalPages = Math.max(1, Math.ceil(remainderEntries.length / ITEMS_PER_PAGE));
    setCurrentPage((prev) => Math.min(prev, computedTotalPages));
  }, [remainderEntries.length]);

  const totalPages =
    remainderEntries.length > 0 ? Math.ceil(remainderEntries.length / ITEMS_PER_PAGE) : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = remainderEntries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const podiumLayout = useMemo(() => {
    const placements = podiumEntries.map((entry, index) => ({
      entry,
      place: index + 1,
    }));

    if (placements.length === 3) {
      return [placements[1], placements[0], placements[2]];
    }

    if (placements.length === 2) {
      return [placements[1], placements[0]];
    }

    return placements;
  }, [podiumEntries]);

  const standHeights: Record<number, string> = {
    1: "h-44",
    2: "h-36",
    3: "h-32",
  };

  const standGradient = "from-[#3A64E4] to-[#6E8BFF]";

  const animationDelayClasses: Record<number, string> = {
    3: "podium-delay-1",
    2: "podium-delay-2",
    1: "podium-delay-3",
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 sm:p-6 my-8 sm:my-16 md:my-24 lg:my-36 shadow-md rounded-lg bg-zinc-900/80 text-white border border-zinc-800">
      <Helmet>
        <title>Leaderboard</title>
        <meta
          name="description"
          content="Check out the top performers in SoDA's leaderboard and see who's leading the rankings!"
        />
        <meta
          name="keywords"
          content="leaderboard, asu soda, asu, software developers association, arizona state university, benifits, computer science"
        />
      </Helmet>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Leaderboard</h1>

      {error && (
        <div className="mb-4 w-full rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 w-full px-2 rounded-lg">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-zinc-700 bg-zinc-800 py-1.5 px-2 rounded w-full sm:w-64 text-white placeholder-zinc-400 focus:outline-none focus:border-soda-blue/50"
        />
        <p className="text-zinc-500 mt-2 sm:mt-0">Click any row for point details</p>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : sortedData.length === 0 ? (
        <div className="mt-10 text-zinc-400">No members found.</div>
      ) : (
        <>
          {podiumLayout.length > 0 && (
            <section className="mt-8 flex w-full flex-col items-center">
              <h2 className="text-xl font-semibold text-soda-gray tracking-wide">Top Performers</h2>
              <div className="mt-6 flex w-full max-w-4xl items-end justify-center gap-2 sm:gap-4 md:gap-6">
                {podiumLayout.map(({ entry, place }) => (
                  <div
                    key={`${entry.identifier ?? entry.name}-podium-${place}`}
                    className={`podium-slide ${animationDelayClasses[place] ?? "podium-delay-1"} relative flex flex-col items-center gap-2`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                      #{place}
                    </span>

                    <div className="flex flex-col items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEntry(entry);
                          setModalOpen(true);
                        }}
                        className="group rounded-2xl bg-gradient-to-br from-[#3F3F46] to-[#52525B] px-6 py-4 text-center shadow-xl ring-1 ring-zinc-500/40 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soda-blue"
                      >
                        <p className="text-lg font-semibold text-white">{entry.name}</p>
                        <p className="text-sm font-medium text-white/80">
                          {entry.total_points} pts
                        </p>
                      </button>

                      <div
                        className={`w-28 md:w-32 rounded-t-2xl bg-gradient-to-t ${standGradient} shadow-[0_0_25px_rgba(58,100,228,0.35)]`}
                      >
                        <div className={`rounded-t-2xl ${standHeights[place] ?? "h-28"}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <p className="text-zinc-300 text-center px-2 mb-4 mt-8">
            This leaderboard tracks points earned through the{" "}
            <Link to="/distinguishedMembers" className="text-soda-blue hover:underline">
              Distinguished Members Program
            </Link>
            , recognizing active participation in SoDA meetings, workshops, and community
            engagement.
          </p>

          {remainderEntries.length > 0 && (
            <>
              <div className="w-full overflow-x-auto">
                <table className="table-auto border-collapse border border-zinc-700 w-full text-center">
                  <thead>
                    <tr className="bg-zinc-800">
                      <th className="border border-zinc-700 py-2 px-4 text-base sm:text-lg font-semibold text-center">
                        Name
                      </th>
                      <th className="border border-zinc-700 py-2 px-4 text-base sm:text-lg font-semibold text-center">
                        Points Earned
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((entry, index) => {
                      const overallRank = podiumEntries.length + startIndex + index + 1;
                      return (
                        <tr
                          key={entry.identifier ?? `${entry.name}-${overallRank}`}
                          onClick={() => {
                            setSelectedEntry(entry);
                            setModalOpen(true);
                          }}
                          className="hover:bg-soda-blue/5 transition-colors cursor-pointer"
                          title={`Rank #${overallRank}`}
                        >
                          <td className="border border-zinc-700 py-2 px-4 text-center">
                            {entry.name}
                          </td>
                          <td className="border border-zinc-700 py-2 px-4 text-center">
                            {entry.total_points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-4 space-y-4 sm:space-y-0">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="w-full sm:w-auto px-4 py-2 rounded bg-soda-blue text-white hover:bg-soda-blue/70 transition-colors disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-base sm:text-lg">
                  Page {Math.min(currentPage, totalPages)} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                  className="w-full sm:w-auto px-4 py-2 rounded bg-soda-blue text-white hover:bg-soda-blue/50 transition-colors disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedEntry(null);
        }}
        data={selectedEntry?.points_details || []}
        name={selectedEntry?.name || ""}
      />
    </div>
  );
};

export default Leaderboard;
