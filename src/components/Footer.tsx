import { Link } from "react-router-dom";
import { Search, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                SchemeSetu
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("footer.brandTagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/schemes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.browseAllSchemes")}
                </Link>
              </li>
              <li>
                <Link to="/find-schemes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.checkEligibility")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">
              {t("footer.disclaimer")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footer.disclaimerText")}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {t("footer.madeWith")} <Heart className="h-3 w-3 text-destructive fill-destructive" /> {t("footer.forEveryCitizen")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;