import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "./About";

describe("About", () => {
  it("renders section heading", () => {
    render(<About />);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders profile image", () => {
    render(<About />);
    const img = screen.getByAltText("Unmesh Jathar");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("unmeshprofilepic.jpeg");
  });

  it("renders experience years badge", () => {
    render(<About />);
    expect(screen.getByText("3.7")).toBeInTheDocument();
  });

  it("renders Meta certified badge", () => {
    render(<About />);
    expect(screen.getAllByText(/Meta Certified/i).length).toBeGreaterThan(0);
  });

  it("renders email contact info", () => {
    render(<About />);
    expect(screen.getByText(/contact@unmeshjathar.com/i)).toBeInTheDocument();
  });

  it("renders location info", () => {
    render(<About />);
    expect(screen.getAllByText(/Pune/i).length).toBeGreaterThan(0);
  });

  it("renders company info", () => {
    render(<About />);
    expect(screen.getAllByText(/Cognizant/i).length).toBeGreaterThan(0);
  });
});
