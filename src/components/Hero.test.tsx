import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Hero from "./Hero";

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  Object.defineProperty(window, "scrollY", { value: 0, writable: true });
});

describe("Hero", () => {
  it("renders developer name", () => {
    render(<Hero />);
    expect(screen.getByText("Unmesh Jathar")).toBeInTheDocument();
  });

  it("renders greeting heading", () => {
    render(<Hero />);
    expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
  });

  it("renders View My Work button", () => {
    render(<Hero />);
    expect(screen.getByText("View My Work")).toBeInTheDocument();
  });

  it("renders Get In Touch button", () => {
    render(<Hero />);
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders Email Me link", () => {
    render(<Hero />);
    expect(screen.getByText("Email Me")).toBeInTheDocument();
  });

  it("renders Download Resume link", () => {
    render(<Hero />);
    expect(screen.getByText("Download Resume")).toBeInTheDocument();
  });

  it("resume link has correct href", () => {
    render(<Hero />);
    const link = screen.getByText("Download Resume").closest("a");
    expect(link?.getAttribute("href")).toContain("Unmesh_Jathar_Resume.pdf");
  });

  it("renders stats section", () => {
    render(<Hero />);
    expect(screen.getByText("3.7+")).toBeInTheDocument();
    expect(screen.getByText("Years Exp.")).toBeInTheDocument();
  });
});
