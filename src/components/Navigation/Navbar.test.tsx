import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
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

describe("mentorship navigation", () => {
  it("navigates from the desktop link to the mentorship route", async () => {
    const user = userEvent.setup();
    renderNavigation();
    const link = screen.getByRole("link", { name: "Mentorship" });
    expect(link).toHaveAttribute("href", "/mentorship");
    await user.click(link);
    expect(screen.getByRole("heading", { name: "Mentorship page" })).toBeVisible();
  });

  it("navigates from the compact menu and closes it after selection", async () => {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Mentorship" }));
    expect(screen.getByRole("heading", { name: "Mentorship page" })).toBeVisible();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
});
