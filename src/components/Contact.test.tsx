import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Contact from "./Contact";

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => ({ success: true }),
  } as Response);
});

describe("Contact", () => {
  it("renders section title", () => {
    render(<Contact />);
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders contact email", () => {
    render(<Contact />);
    expect(screen.getByText("contact@unmeshjathar.com")).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Job Opportunity/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell me about/i)).toBeInTheDocument();
  });

  it("renders Send Message button", () => {
    render(<Contact />);
    expect(screen.getByText("Send Message")).toBeInTheDocument();
  });

  it("shows success message after form submission", async () => {
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText("Jane Doe"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("jane@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Job Opportunity/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Tell me about/i), {
      target: { value: "Test message" },
    });
    fireEvent.click(screen.getByText("Send Message"));
    await waitFor(() =>
      expect(screen.getByText(/Message sent/i)).toBeInTheDocument(),
    );
  });

  it("calls Web3Forms API on submit", async () => {
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText("Jane Doe"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("jane@example.com"), {
      target: { value: "t@t.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Job Opportunity/i), {
      target: { value: "Subject" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Tell me about/i), {
      target: { value: "Message" },
    });
    fireEvent.click(screen.getByText("Send Message"));
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.web3forms.com/submit",
        expect.objectContaining({ method: "POST" }),
      ),
    );
  });
});
