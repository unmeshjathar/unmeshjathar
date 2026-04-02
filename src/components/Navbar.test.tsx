import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "./Navbar";

// Mock scrollIntoView
beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  Object.defineProperty(window, "scrollY", { value: 0, writable: true });
});

describe("Navbar", () => {
  it("renders the UJ logo", () => {
    render(<Navbar />);
    expect(screen.getByText("UJ")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    ["Home", "About", "Skills", "Projects", "Experience", "Contact"].forEach(
      (link) => expect(screen.getByText(link)).toBeInTheDocument(),
    );
  });

  it("renders Hire Me CTA button", () => {
    render(<Navbar />);
    expect(screen.getByText("Hire Me")).toBeInTheDocument();
  });

  it("toggles mobile menu on hamburger click", () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText("Menu");
    const navLinks = document.querySelector(".nav-links");
    expect(navLinks?.classList.contains("open")).toBe(false);
    fireEvent.click(hamburger);
    expect(navLinks?.classList.contains("open")).toBe(true);
  });

  it("closes mobile menu when a nav link is clicked", () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText("Menu");
    fireEvent.click(hamburger);
    fireEvent.click(screen.getByText("About"));
    const navLinks = document.querySelector(".nav-links");
    expect(navLinks?.classList.contains("open")).toBe(false);
  });

  it("marks clicked link as active", () => {
    render(<Navbar />);
    const skillsBtn = screen.getByText("Skills");
    fireEvent.click(skillsBtn);
    expect(skillsBtn.classList.contains("active")).toBe(true);
  });
});
