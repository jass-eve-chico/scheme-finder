import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage, LANGUAGE_OPTIONS } from "@/context/LanguageContext";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/schemes", label: t("nav.browseSchemes") },
    { path: "/find-schemes", label: t("nav.findSchemes") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <Search className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            SchemeSetu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language Selector + CTA Button (Desktop) */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {/* Visible Language Selector: English | हिन्दी | Hinglish */}
          <div className="flex items-center rounded-full border border-border bg-muted/50 p-1 text-xs shadow-inner">
            <Globe className="h-3.5 w-3.5 ml-1.5 mr-1 text-muted-foreground shrink-0" />
            <div className="flex items-center">
              {LANGUAGE_OPTIONS.map((opt, idx) => (
                <div key={opt.code} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    className={cn(
                      "rounded-full px-2.5 py-1 font-medium transition-all text-xs cursor-pointer",
                      language === opt.code
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                    )}
                  >
                    {opt.label}
                  </button>
                  {idx < LANGUAGE_OPTIONS.length - 1 && (
                    <span className="text-muted-foreground/40 px-0.5 select-none">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link to="/find-schemes">
            <Button variant="hero" size="sm">
              {t("nav.eligibility")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button & Quick Lang */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Compact language switcher on mobile navbar */}
          <div className="flex items-center rounded-full border border-border bg-muted/60 p-0.5 text-[11px]">
            {LANGUAGE_OPTIONS.map((opt, idx) => (
              <div key={opt.code} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setLanguage(opt.code)}
                  className={cn(
                    "rounded-full px-2 py-0.5 font-medium transition-all cursor-pointer",
                    language === opt.code
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {opt.label}
                </button>
                {idx < LANGUAGE_OPTIONS.length - 1 && (
                  <span className="text-muted-foreground/30 px-0.5">|</span>
                )}
              </div>
            ))}
          </div>

          <button
            className="p-1 rounded-md text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Selector in Mobile Drawer */}
            <div className="mt-2 rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> Language / भाषा
              </p>
              <div className="grid grid-cols-3 gap-1">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "rounded-md py-1.5 text-xs font-medium text-center transition-all",
                      language === opt.code
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "bg-background border border-border text-foreground hover:bg-muted"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Link to="/find-schemes" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="hero" className="mt-2 w-full">
                {t("nav.eligibility")}
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
