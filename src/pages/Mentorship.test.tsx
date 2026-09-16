import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import Mentorship from "./Mentorship";

afterEach(cleanup);
const renderPage = () =>
  render(
    <HelmetProvider>
      <Mentorship />
    </HelmetProvider>
  );

describe("Mentorship page", () => {
  it("shows eight projects and preserves the separate signup destinations", () => {
    renderPage();
    expect(screen.getAllByRole("article")).toHaveLength(8);
    expect(screen.getByRole("link", { name: "Become a mentee" })).toHaveAttribute(
      "href",
      "https://forms.gle/Feu2GAfWQmashLZm9"
    );
    expect(screen.getByRole("link", { name: "Become a mentor" })).toHaveAttribute(
      "href",
      "https://forms.gle/xtks7VpbyLHcy2XY9"
    );
  });

  it("filters the gallery and restores all projects", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "Sustainability" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "EcoPulse" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Centsible" })).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("2 projects");
    await user.click(screen.getByRole("button", { name: "Hardware" }));
    expect(screen.getByRole("status")).toHaveTextContent("1 project");
    await user.click(screen.getByRole("button", { name: "All projects" }));
    expect(screen.getAllByRole("article")).toHaveLength(8);
  });

  it("opens the correct deck, navigates within bounds, closes with Escape, and restores focus", async () => {
    const user = userEvent.setup();
    renderPage();
    const trigger = screen.getByRole("button", { name: "View EcoPulse" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "EcoPulse" });
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      "/mentorship/ecopulse/slide-1.webp"
    );
    expect(within(dialog).getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "href",
      "/mentorship/ecopulse/presentation.pdf"
    );
    expect(
      within(dialog).getByRole("link", { name: "Open original" }).getAttribute("href")
    ).toContain("1JX5SuBtRrCotTTZYShOoAPpleHJkNHYmgDd0h0g_Dck");
    expect(within(dialog).getByRole("button", { name: "Previous slide" })).toBeDisabled();
    await user.click(within(dialog).getByRole("button", { name: "Next slide" }));
    expect(within(dialog).getByRole("status")).toHaveTextContent("Slide 2 of 13");
    const region = within(dialog).getByRole("region");
    region.focus();
    await user.keyboard("{ArrowLeft}");
    expect(within(dialog).getByRole("status")).toHaveTextContent("Slide 1 of 13");
    for (let i = 0; i < 15; i++) await user.keyboard("{ArrowRight}");
    expect(within(dialog).getByRole("status")).toHaveTextContent("Slide 13 of 13");
    expect(within(dialog).getByRole("button", { name: "Next slide" })).toBeDisabled();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    expect(within(screen.getByRole("dialog")).getByRole("status")).toHaveTextContent(
      "Slide 1 of 13"
    );
  });

  it("keeps slide text and downloads usable if a preview image fails", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "View Centsible" }));
    const dialog = screen.getByRole("dialog");
    fireEvent.error(within(dialog).getByRole("img"));
    expect(within(dialog).getByText(/couldn’t load this slide/)).toBeVisible();
    await user.click(within(dialog).getByText("Read slide text"));
    expect(within(dialog).getByText(/By Sowmya/)).toBeVisible();
    expect(within(dialog).getByRole("link", { name: "Download PDF" })).toBeVisible();
  });

  it("serves Millie’s local demo and PowerPoint instead of relying on private Drive access", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "View LED Strip Controller" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("video source")).toHaveAttribute(
      "src",
      "/mentorship/led-controller/demo.mp4"
    );
    expect(dialog.querySelector("video")).toHaveAttribute("preload", "none");
    expect(within(dialog).getByRole("link", { name: "Download PPTX" })).toHaveAttribute(
      "href",
      "/mentorship/led-controller/presentation.pptx"
    );
  });

  it("retains an explicit Canva fallback for the project without a supplied deck", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: /View AI-Powered Career/ }));
    expect(
      within(screen.getByRole("dialog"))
        .getByRole("link", { name: "View on Canva" })
        .getAttribute("href")
    ).toContain("DAG6gm_BJmk/XnDec7So2zNR9GiLKwTPIw");
  });

  it("supports keyboard role changes with the corresponding responsibilities and application", async () => {
    const user = userEvent.setup();
    renderPage();
    const mentee = screen.getByRole("tab", { name: "I’m a mentee" });
    mentee.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "I’m a mentor" })).toHaveFocus();
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("1–2 hours / week");
    expect(panel).toHaveTextContent("Certificate of Mentorship");
    expect(within(panel).getByRole("link", { name: "Apply as a mentor" })).toHaveAttribute(
      "href",
      "https://forms.gle/xtks7VpbyLHcy2XY9"
    );
    await user.keyboard("{Home}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("2–3 hours / week");
  });

  it("expands the program FAQ", async () => {
    const user = userEvent.setup();
    renderPage();
    const question = screen.getByText("What if I can’t complete the program?");
    expect(question.closest("details")).not.toHaveAttribute("open");
    await user.click(question);
    expect(question.closest("details")).toHaveAttribute("open");
    expect(screen.getByText(/Contact your mentor and the program directors/)).toBeVisible();
  });
});
