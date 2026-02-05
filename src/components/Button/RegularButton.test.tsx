import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RegularButton from "./RegularButton";

describe("RegularButton", () => {
  it("should render with the provided name", () => {
    render(<RegularButton name="Click Me" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should have correct button type", () => {
    render(<RegularButton name="Submit" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should have the correct CSS classes", () => {
    render(<RegularButton name="Test" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("regular-btn");
  });

  it("should render the button text inside a span with btn-text class", () => {
    render(<RegularButton name="Test Button" />);

    const span = screen.getByText("Test Button");
    expect(span.tagName).toBe("SPAN");
    expect(span).toHaveClass("btn-text");
  });
});
