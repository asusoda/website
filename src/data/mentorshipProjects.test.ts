import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  filterMentorshipProjects,
  mentorshipProjects,
  projectCategories,
} from "./mentorshipProjects";
import slides from "./mentorship-slides.json";

describe("mentorship project sources", () => {
  it("preserves the eight original project-to-link matches", () => {
    const expected = {
      aegischeck: "10zfAyyPBSTMyYRJ8c3B1oJjxGdeSrIPUiN6ap1XQq3o",
      centsible: "1vI31THxieC1meoEArUugXvOTLyi6d9cRBjznbMDrcC4",
      clarityread: "1C-wiW3cu88dU725C3dWOcjnjr_rF5xb9ow5HEreYpc0",
      "culture-bites": "1TxgRJDfrUUf2I8zSrY04ovv0vOxr6t1QTHuXQpgwR4o",
      ecopulse: "1JX5SuBtRrCotTTZYShOoAPpleHJkNHYmgDd0h0g_Dck",
      "led-controller": "1Ao-3WdJbkPmUnTC1Pz0CJzkIUbpv1E0l",
      "waste-classifier": "1LFWdR7HNzJbx5KHx3-zSLrZsTm78KtmLeneGlnGrUw4",
      "career-pathway": "DAG6gm_BJmk/XnDec7So2zNR9GiLKwTPIw",
    };
    expect(new Set(mentorshipProjects.map((p) => p.id)).size).toBe(8);
    for (const [id, destination] of Object.entries(expected))
      expect(mentorshipProjects.find((p) => p.id === id)?.original).toContain(destination);
    expect(slides.ecopulse[0].text).toContain("Nelson");
    expect(slides.ecopulse[0].text).toContain("EcoPulse");
  });

  it("has real previews and original downloads for all seven supplied decks", () => {
    for (const project of mentorshipProjects.filter((p) => p.format !== "external")) {
      expect(existsSync(resolve("public/mentorship", project.id, "cover.webp"))).toBe(true);
      const source = readFileSync(
        resolve("public/mentorship", project.id, `presentation.${project.format}`)
      );
      expect(source.subarray(0, project.format === "pdf" ? 4 : 2).toString()).toBe(
        project.format === "pdf" ? "%PDF" : "PK"
      );
    }
    expect(Object.values(slides).reduce((count, deck) => count + deck.length, 0)).toBe(68);
    for (const deck of Object.values(slides))
      for (const slide of deck) expect(existsSync(resolve("public", `.${slide.image}`))).toBe(true);
  });

  it("filters without mutating or reordering its input and supports an empty collection", () => {
    const input = [...mentorshipProjects].reverse();
    expect(filterMentorshipProjects(input, "All projects")).toEqual(input);
    expect(filterMentorshipProjects(input, "Sustainability").map((p) => p.id)).toEqual([
      "ecopulse",
      "waste-classifier",
    ]);
    expect(input).toEqual([...mentorshipProjects].reverse());
    for (const category of projectCategories)
      expect(filterMentorshipProjects([], category)).toEqual([]);
  });
});
