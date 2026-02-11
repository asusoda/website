import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialMediaLinks from "./SocialMediaLinks";

describe("SocialMediaLinks", () => {
  it("should render a section element", () => {
    render(<SocialMediaLinks />);

    const section = document.querySelector("section.social-media-links");
    expect(section).toBeInTheDocument();
  });

  it("should render all social media links", () => {
    render(<SocialMediaLinks />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(7); // 7 social media platforms
  });

  it("should have correct href for each social media link", () => {
    render(<SocialMediaLinks />);

    const links = screen.getAllByRole("link");
    const expectedUrls = [
      "https://sundevilcentral.eoss.asu.edu/feeds?type=club&type_id=35661&tab=about",
      "https://discord.gg/the-software-developers-association-762811961238618122",
      "https://www.instagram.com/soda.asu/",
      "https://www.facebook.com/SoDAASU/",
      "https://www.linkedin.com/company/thesoda/",
      "https://x.com/asu_soda",
      "https://github.com/asusoda",
    ];

    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", expectedUrls[index]);
    });
  });

  it("should open all links in new tabs", () => {
    render(<SocialMediaLinks />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("should have noopener noreferrer for security", () => {
    render(<SocialMediaLinks />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("should have correct styling classes on links", () => {
    render(<SocialMediaLinks />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass("text-gray-400");
    });
  });
});
