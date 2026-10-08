import { useState } from "react";
import { Scheme } from "@/types/scheme";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ExternalLink, CheckCircle2, Star, FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { DocumentsModal } from "./DocumentsModal";
import { ApplicationTrackerModal } from "./ApplicationTrackerModal";

interface SchemeCardProps {
  scheme: Scheme;
  showMatchScore?: boolean;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Housing": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Healthcare": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    "Education": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    "Agriculture": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "Business & Entrepreneurship": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    "Financial Inclusion": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "Insurance": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    "Women & Child Welfare": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    "Energy & Welfare": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    "Employment & Skills": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
    "Pension & Retirement": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    "Disability Welfare": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  };
  return colors[category] || "bg-muted text-muted-foreground";
};

const SchemeCard = ({ scheme, showMatchScore = false }: SchemeCardProps) => {
  const { t } = useLanguage();
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  const matchScore = scheme.eligibilityScore || 0;
  const localizedCategory = t(`category.${scheme.category}`, scheme.category);

  return (
    <>
      <Card className="group flex h-full flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-elegant hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge 
              variant="secondary" 
              className={cn("shrink-0 text-xs", getCategoryColor(scheme.category))}
            >
              {localizedCategory}
            </Badge>
            {showMatchScore && matchScore > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1">
                <Star className="h-3 w-3 fill-success text-success" />
                <span className="text-xs font-semibold text-success">{matchScore}% {t("recommendation.eligible")}</span>
              </div>
            )}
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors">
            {scheme.name}
          </h3>
          <p className="text-xs text-muted-foreground">{scheme.ministry}</p>
        </CardHeader>
        
        <CardContent className="flex-1 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {scheme.description}
          </p>
          
          {scheme.matchReason && (
            <div className="rounded-lg bg-success/5 border border-success/20 p-3">
              <p className="text-xs font-medium text-success">{t("recommendation.whyMatches")}</p>
              <p className="text-xs text-muted-foreground mt-1">{scheme.matchReason}</p>
            </div>
          )}
          
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
              {t("schemeCard.keyBenefits")}
            </p>
            <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
          </div>
          
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
              {t("schemeCard.eligibility")}
            </p>
            <ul className="space-y-1.5">
              {scheme.eligibility.slice(0, 3).map((criterion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-border flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs w-full"
              onClick={() => setDocsModalOpen(true)}
            >
              <FileText className="h-3.5 w-3.5 mr-1" />
              {t("schemeCard.viewDocs")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs w-full"
              onClick={() => setTrackModalOpen(true)}
            >
              <Search className="h-3.5 w-3.5 mr-1" />
              {t("schemeCard.trackApp")}
            </Button>
          </div>

          {scheme.applicationLink && (
            <Button asChild variant="default" className="w-full" size="sm">
              <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                {t("schemeCard.applyNow")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>

      <DocumentsModal
        open={docsModalOpen}
        onOpenChange={setDocsModalOpen}
        schemeName={scheme.name}
      />
      <ApplicationTrackerModal
        open={trackModalOpen}
        onOpenChange={setTrackModalOpen}
        defaultSchemeName={scheme.name}
      />
    </>
  );
};

export default SchemeCard;
