"use client";

import { useEffect, useState, useCallback, useRef } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  char: string;
  phase: "appearing" | "growing" | "stable" | "fading";
  progress: number;
  speed: number;
  lastUpdated: number;
};

export default function Stars({ className = "" }: { className?: string }) {
  const [stars, setStars] = useState<Star[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const initialized = useRef(false);
  const lastNewStarTime = useRef(0);

  // Characters to use for stars at different phases
  const starChars = [".", "+", "*", "✦", "✧", "★"];

  // Maximum number of stars in equilibrium
  const maxStars = 50;

  // *** ADJUSTABLE PARAMETERS ***
  const spawnInterval = 5; // Time in ms between spawn attempts (lower = more frequent spawns)
  const spawnProbability = 1; // Chance of spawning a star when eligible (higher = more stars)
  const minStarSpeed = 0.0002; // Minimum progress per millisecond (lower = longer life)
  const maxStarSpeed = 0.0004; // Maximum progress per millisecond (lower = longer life)
  const minStarsBeforeSpawn = maxStars * 0.8; // Only spawn when below this number (prevents overcrowding)

  // Create a star with given parameters
  const createStar = useCallback(
    (id: number, width: number, height: number, initialProgress = 0, now = Date.now()) => {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      // Random speed factor - ADJUSTED to be slower
      const speed = minStarSpeed + Math.random() * (maxStarSpeed - minStarSpeed);

      let phase: "appearing" | "growing" | "stable" | "fading";
      let char: string;

      // Determine initial phase and character based on progress
      if (initialProgress < 0.3) {
        phase = "appearing";
        char = starChars[Math.min(Math.floor((initialProgress / 0.15) * 3), 2)];
      } else if (initialProgress < 0.5) {
        phase = "growing";
        char = starChars[Math.min(2 + Math.floor(((initialProgress - 0.3) / 0.1) * 2), 4)];
      } else if (initialProgress < 0.7) {
        phase = "stable";
        char = starChars[4];
      } else {
        phase = "fading";
        char = starChars[Math.max(0, Math.floor(5 - ((initialProgress - 0.7) / 0.15) * 3))];
      }

      return {
        id,
        x,
        y,
        char,
        phase,
        progress: initialProgress,
        speed,
        lastUpdated: now,
      };
    },
    [starChars, minStarSpeed, maxStarSpeed]
  );

  // Initial dimensions calculation
  useEffect(() => {
    const handleResize = () => {
      const charWidth = 6;
      const charHeight = 14;
      const width = Math.floor((window.innerWidth * 0.9) / charWidth);
      const height = Math.floor(window.innerHeight / charHeight);

      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize stars once dimensions are set
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && !initialized.current) {
      const initialStars: Star[] = [];
      const now = Date.now();

      for (let i = 0; i < maxStars; i++) {
        // Randomly distribute stars across all lifecycle phases
        initialStars.push(
          createStar(now + i, dimensions.width, dimensions.height, Math.random(), now)
        );
      }

      setStars(initialStars);
      initialized.current = true;
    }
  }, [dimensions, createStar, maxStars]);

  // Handle significant resize
  useEffect(() => {
    const handleSignificantResize = () => {
      if (initialized.current) {
        // Adjust existing stars to fit within new dimensions
        setStars((prevStars) => {
          return prevStars.map((star) => {
            // If star is outside new dimensions, reposition it
            if (star.x >= dimensions.width || star.y >= dimensions.height) {
              return {
                ...star,
                x: Math.floor(Math.random() * dimensions.width),
                y: Math.floor(Math.random() * dimensions.height),
              };
            }
            return star;
          });
        });
      }
    };

    handleSignificantResize();
  }, [dimensions]);

  // Frame rate independent animation loop
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || !initialized.current) return;

    let frameId: number;

    const animate = () => {
      // Time-based updates instead of frame-based
      const now = Date.now();

      // Add new stars based on time elapsed, not frames
      // ADJUSTED: More aggressive spawn rate to maintain equilibrium
      if (now - lastNewStarTime.current > spawnInterval && stars.length < minStarsBeforeSpawn) {
        if (Math.random() < spawnProbability) {
          setStars((prevStars) => [
            ...prevStars,
            createStar(now, dimensions.width, dimensions.height, 0, now),
          ]);
          lastNewStarTime.current = now;
        }
      }

      // Update existing stars based on elapsed time
      setStars((prevStars) =>
        prevStars
          .map((star) => {
            // Calculate elapsed time since last update
            const elapsed = now - star.lastUpdated;

            // Calculate new progress based on elapsed time and star's speed
            const newProgress = star.progress + star.speed * elapsed;

            // If completed lifecycle, remove the star
            if (newProgress >= 1) {
              return null;
            }

            // Determine phase and character based on new progress
            let phase: "appearing" | "growing" | "stable" | "fading";
            let char: string;

            if (newProgress < 0.3) {
              phase = "appearing";
              char = starChars[Math.min(Math.floor((newProgress / 0.15) * 3), 2)];
            } else if (newProgress < 0.5) {
              phase = "growing";
              char = starChars[Math.min(2 + Math.floor(((newProgress - 0.3) / 0.1) * 2), 4)];
            } else if (newProgress < 0.7) {
              phase = "stable";
              char = starChars[4];
            } else {
              phase = "fading";
              char = starChars[Math.max(0, Math.floor(5 - ((newProgress - 0.7) / 0.15) * 3))];
            }

            return {
              ...star,
              progress: newProgress,
              phase,
              char,
              lastUpdated: now,
            };
          })
          .filter((star): star is Star => star !== null)
      );

      // Use requestAnimationFrame without additional delay
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [dimensions, starChars, createStar, spawnInterval, spawnProbability, minStarsBeforeSpawn]);

  // Create the grid
  const grid = Array(dimensions.height)
    .fill(0)
    .map(() => Array(dimensions.width).fill(" "));

  // Place stars on the grid
  stars.forEach((star) => {
    if (star.x >= 0 && star.x < dimensions.width && star.y >= 0 && star.y < dimensions.height) {
      grid[star.y][star.x] = star.char;
    }
  });

  return (
    <div className={`${className}`}>
      <pre className="text-white font-mono text-xs leading-[0.35] md:pt-5 md:leading-[1]">
        {grid.map((row, i) => (
          <div key={i}>{row.join("")}</div>
        ))}
      </pre>
    </div>
  );
}
