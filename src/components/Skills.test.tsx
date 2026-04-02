import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skills from "./Skills";

describe("Skills", () => {
  it("renders section title", () => {
    render(<Skills />);
    expect(screen.getByText("Skills & Technologies")).toBeInTheDocument();
  });

  it("renders React skill", () => {
    render(<Skills />);
    expect(screen.getByText("React.js")).toBeInTheDocument();
  });

  it("renders TypeScript skill", () => {
    render(<Skills />);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThan(0);
  });

  it("renders AI-Powered Development category", () => {
    render(<Skills />);
    expect(screen.getByText("AI-Powered Development")).toBeInTheDocument();
  });

  it("renders GitHub Copilot skill", () => {
    render(<Skills />);
    expect(screen.getAllByText("GitHub Copilot").length).toBeGreaterThan(0);
  });

  it("renders all 5 skill category cards", () => {
    render(<Skills />);
    const cards = document.querySelectorAll(".skill-card");
    expect(cards.length).toBe(5);
  });

  it("renders tech badges cloud", () => {
    render(<Skills />);
    expect(document.querySelector(".tech-cloud")).toBeInTheDocument();
  });
});
