import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

afterEach(cleanup);
function renderNavigation() {
  render(
    <MemoryRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/mentorship" element={<h1>Mentorship page</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("grouped navigation", () => {
  it("opens programs and navigates to mentorship, closing the dropdown", async () => {
    const user = userEvent.setup();
    renderNavigation();
    expect(screen.queryByRole("link", { name: "Mentorship" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Programs" }));
    await user.click(screen.getByRole("link", { name: "Mentorship" }));
    expect(screen.getByRole("heading", { name: "Mentorship page" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Programs" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
  it("shows only one dropdown at a time and toggles it closed", async () => {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(screen.getByRole("button", { name: "About" }));
    expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute("href", "/#team");
    await user.click(screen.getByRole("button", { name: "Resources" }));
    expect(screen.queryByRole("link", { name: "Team" })).not.toBeInTheDocument();
    const wiki = screen.getByRole("link", { name: "ASU CS Wiki" });
    expect(wiki).toHaveAttribute("href", "https://wiki.thesoda.io");
    expect(wiki).toHaveAttribute("target", "_blank");
    expect(wiki).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Platform" })).toHaveAttribute(
      "href",
      "https://platform.thesoda.io"
    );
    await user.click(screen.getByRole("button", { name: "Resources" }));
    expect(screen.queryByRole("link", { name: "ASU CS Wiki" })).not.toBeInTheDocument();
  });
  it("supports keyboard opening and Escape with focus returned to the trigger", async () => {
    const user = userEvent.setup();
    renderNavigation();
    screen.getByRole("button", { name: "Programs" }).focus();
    await user.keyboard("{Enter}{Tab}");
    expect(screen.getByRole("link", { name: "Mentorship" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Programs" })).toHaveFocus();
    expect(screen.queryByRole("link", { name: "Mentorship" })).not.toBeInTheDocument();
  });
  it("dismisses on outside click and when focus leaves navigation", async () => {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(screen.getByRole("button", { name: "About" }));
    await user.click(screen.getByRole("heading", { name: "Home page" }));
    expect(screen.getByRole("button", { name: "About" })).toHaveAttribute("aria-expanded", "false");
    await user.click(screen.getByRole("button", { name: "Resources" }));
    document.querySelector<HTMLButtonElement>(".soda-nav-mobile-toggle")!.focus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Resources" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
  it("closes the mobile disclosure after selecting a route", async () => {
    const user = userEvent.setup();
    renderNavigation();
    // jsdom does not apply viewport media queries; browser QA verifies the mobile layout.
    const toggle = document.querySelector<HTMLButtonElement>(".soda-nav-mobile-toggle")!;
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(screen.getByRole("button", { name: "Programs" }));
    await user.click(screen.getByRole("link", { name: "Mentorship" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("heading", { name: "Mentorship page" })).toBeVisible();
  });
  it("preserves the original destinations and exposes the additional programs", async () => {
    const user = userEvent.setup();
    renderNavigation();
    for (const [group, links] of Object.entries({
      About: {
        "About SoDA": "/#about",
        History: "/history",
        Team: "/#team",
        Sponsors: "/#sponsors",
      },
      Programs: {
        Mentorship: "/mentorship",
        "Code Challenge": "/code-challenge",
        Hackathons: "/hackathons",
        "Lounge Hours": "/lounge-hours",
      },
      Resources: { Leaderboard: "/leaderboard" },
    })) {
      await user.click(screen.getByRole("button", { name: group }));
      for (const [name, href] of Object.entries(links))
        expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
    expect(screen.queryByRole("link", { name: "Resources" })).toBeNull();
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/shop");
    expect(screen.getByRole("link", { name: "Donate" })).toHaveAttribute("href", "/donate");
    expect(screen.getByRole("link", { name: "Become a Member" })).toHaveAttribute(
      "href",
      "https://sundevilcentral.eoss.asu.edu/feeds?type=club&type_id=35661&tab=about"
    );
  });
});
