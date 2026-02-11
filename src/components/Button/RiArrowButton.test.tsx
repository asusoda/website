import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RiArrowButton from "./RiArrowButton";

describe("RiArrowButton", () => {
  it("should render as a link with the provided name and URL", () => {
    render(<RiArrowButton name="Learn More" url="https://example.com" />);

    const link = screen.getByRole("link", { name: "Learn More" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("should open link in a new tab", () => {
    render(<RiArrowButton name="External Link" url="https://example.com" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should have the correct CSS classes", () => {
    render(<RiArrowButton name="Test" url="https://example.com" />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("right-arrow-btn");
    expect(link).toHaveClass("min-w-48");
    expect(link).toHaveClass("no-underline");
  });

  it("should render the button text inside a span with btn-text class", () => {
    render(<RiArrowButton name="Click Here" url="https://example.com" />);

    const span = screen.getByText("Click Here");
    expect(span.tagName).toBe("SPAN");
    expect(span).toHaveClass("btn-text");
  });

  it("should handle different URLs correctly", () => {
    const { rerender } = render(<RiArrowButton name="Link 1" url="https://google.com" />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "https://google.com");

    rerender(<RiArrowButton name="Link 2" url="https://github.com" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://github.com");
  });
});
