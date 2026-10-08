import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { FileText, CheckCircle2 } from "lucide-react";

interface DocumentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schemeName?: string;
}

export const DocumentsModal = ({ open, onOpenChange, schemeName }: DocumentsModalProps) => {
  const { t } = useLanguage();

  const documents = [
    { key: "documents.aadhaar", required: true },
    { key: "documents.income", required: true },
    { key: "documents.residence", required: true },
    { key: "documents.bank", required: true },
    { key: "documents.caste", required: false },
    { key: "documents.ration", required: false },
    { key: "documents.education", required: false },
    { key: "documents.disability", required: false },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="h-4 w-4" />
            </div>
            <DialogTitle className="font-display text-xl">
              {t("documents.title")}
            </DialogTitle>
          </div>
          <DialogDescription>
            {schemeName ? `${schemeName} — ` : ""}
            {t("documents.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-2 max-h-[60vh] overflow-y-auto pr-1">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
            >
              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{t(doc.key)}</p>
                <span className="text-xs text-muted-foreground">
                  {doc.required ? "Mandatory for verification" : "If applicable for your profile"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("documents.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
