import { useState, useEffect } from "react";
import "./Navbar.scss";

const LINKS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
] as const;
type NavLink = (typeof LINKS)[number];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<NavLink>("Home");
  const [isSaas, setIsSaas] = useState(
    () => document.documentElement.getAttribute("data-theme") === "saas"
  );

  const toggleTheme = () => {
    const next = !isSaas;
    setIsSaas(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "saas");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: NavLink) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">
        <button className="nav-logo" onClick={() => scrollTo("Home")}>
          <span className="bracket">&lt;</span>
          <span>UJ</span>
          <span className="bracket">/&gt;</span>
        </button>

        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {LINKS.map((link) => (
            <li key={link}>
              <button
                className={`nav-link${active === link ? " active" : ""}`}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
          <li>
            <button
              className="btn btn-primary nav-cta"
              onClick={() => scrollTo("Contact")}
            >
              Hire Me
            </button>
          </li>
        </ul>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isSaas ? "Switch to Default theme" : "Switch to SaaS theme"}
        >
          {isSaas ? (
            // Current: SaaS → show icon to go back to Default (purple spark)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            // Current: Default → show icon to go to SaaS (moon/minimal)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
