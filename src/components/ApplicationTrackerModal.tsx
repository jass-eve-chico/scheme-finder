import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { Search, CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";

interface ApplicationTrackerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultSchemeName?: string;
}

export const ApplicationTrackerModal = ({
  open,
  onOpenChange,
  defaultSchemeName,
}: ApplicationTrackerModalProps) => {
  const { t } = useLanguage();
  const [appId, setAppId] = useState("SCH-2026-89124");
  const [tracked, setTracked] = useState(true);

  const steps = [
    {
      title: t("tracker.statusUnderReview"),
      done: true,
      date: "02 Mar 2026",
    },
    {
      title: t("tracker.statusVerification"),
      done: true,
      date: "05 Mar 2026",
    },
    {
      title: t("tracker.statusApproved"),
      done: true,
      date: "07 Mar 2026",
    },
    {
      title: t("tracker.statusDisbursed"),
      done: false,
      date: "Expected in 3-5 days",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (appId.trim()) {
      setTracked(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <DialogTitle className="font-display text-xl">
              {t("tracker.title")}
            </DialogTitle>
          </div>
          <DialogDescription>
            {defaultSchemeName ? `${defaultSchemeName} — ` : ""}
            {t("tracker.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSearch} className="space-y-4 my-2">
          <div className="space-y-2">
            <Label htmlFor="appId">{t("tracker.appIdLabel")}</Label>
            <div className="flex gap-2">
              <Input
                id="appId"
                placeholder={t("tracker.appIdPlaceholder")}
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                className="bg-background"
                required
              />
              <Button type="submit" variant="hero" size="sm">
                <Search className="h-4 w-4 mr-1" />
                {t("tracker.trackBtn")}
              </Button>
            </div>
          </div>
        </form>

        {tracked && (
          <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  {t("tracker.statusLabel")}
                </span>
                <p className="text-sm font-semibold text-primary mt-0.5">
                  {t("tracker.statusApproved")}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                {t("tracker.lastUpdate")}
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                {t("tracker.timeline")}
              </p>
              <div className="space-y-2.5">
                {steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    {st.done ? (
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 flex justify-between items-center">
                      <span className={st.done ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {st.title}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">{st.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("documents.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
