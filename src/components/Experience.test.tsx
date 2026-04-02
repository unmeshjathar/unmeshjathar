import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Experience from "./Experience";

describe("Experience", () => {
  it("renders section title", () => {
    render(<Experience />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders Cognizant employer", () => {
    render(<Experience />);
    expect(screen.getAllByText(/Cognizant/i).length).toBeGreaterThan(0);
  });

  it("renders experience duration", () => {
    render(<Experience />);
    expect(screen.getAllByText(/3\.7/i).length).toBeGreaterThan(0);
  });

  it("renders experience cards", () => {
    render(<Experience />);
    const cards = document.querySelectorAll(".exp-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders education section", () => {
    render(<Experience />);
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
  });

  it("renders certification section", () => {
    render(<Experience />);
    expect(screen.getByText(/Awards/i)).toBeInTheDocument();
  });

  it("renders Meta certification", () => {
    render(<Experience />);
    expect(screen.getAllByText(/Meta/i).length).toBeGreaterThan(0);
  });
});
