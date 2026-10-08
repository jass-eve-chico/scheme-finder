import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProfileForm from "@/components/UserProfileForm";
import SchemeCard from "@/components/SchemeCard";
import { UserProfile, Scheme } from "@/types/scheme";
import { governmentSchemes } from "@/data/schemes";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, AlertCircle, Wand2, FileText, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/context/LanguageContext";
import { parseNaturalLanguageProfile } from "@/lib/multilingualSearch";
import { evaluateEligibility, EvaluatedScheme } from "@/lib/eligibilityEngine";
import { Textarea } from "@/components/ui/textarea";

const FindSchemes = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"nl" | "form">("nl");
  const [nlQuery, setNlQuery] = useState("");
  const [lastSubmittedProfile, setLastSubmittedProfile] = useState<UserProfile | null>(null);
  const [matchedSchemes, setMatchedSchemes] = useState<EvaluatedScheme[] | Scheme[] | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleProfileSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setLastSubmittedProfile(profile);

    // Compute deterministic local eligibility results
    const localResult = evaluateEligibility(profile, governmentSchemes, language);

    try {
      // Attempt supabase if configured
      const { data, error: fnError } = await supabase.functions.invoke("match-schemes", {
        body: { userProfile: profile, schemes: governmentSchemes },
      });

      if (!fnError && data && !data.error && Array.isArray(data.matchedSchemes) && data.matchedSchemes.length > 0) {
        const matchedIds = data.matchedSchemes;
        const schemesWithScores: Scheme[] = matchedIds
          .map((match: any) => {
            const scheme = governmentSchemes.find((s) => s.id === match.schemeId);
            if (scheme) {
              return {
                ...scheme,
                eligibilityScore: match.eligibilityScore,
                matchReason: match.matchReason,
              };
            }
            return null;
          })
          .filter(Boolean)
          .sort((a: Scheme, b: Scheme) => (b.eligibilityScore || 0) - (a.eligibilityScore || 0));

        setMatchedSchemes(schemesWithScores);
        setSummary(data.summary || localResult.summary);
      } else {
        // Use deterministic engine
        setMatchedSchemes(localResult.matchedSchemes);
        setSummary(localResult.summary);
      }

      toast({
        title: t("findSchemesPage.foundToastTitle"),
        description: t("findSchemesPage.foundToastDesc"),
      });
    } catch {
      // Fallback seamlessly to local eligibility engine without showing an error
      setMatchedSchemes(localResult.matchedSchemes);
      setSummary(localResult.summary);

      toast({
        title: t("findSchemesPage.foundToastTitle"),
        description: t("findSchemesPage.foundToastDesc"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNLSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;

    const parsed = parseNaturalLanguageProfile(nlQuery);
    setLastSubmittedProfile(parsed.profile);
    handleProfileSubmit(parsed.profile);
  };

  const handleReset = () => {
    setMatchedSchemes(null);
    setSummary("");
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-12">
        <div className="container px-4">
          {!matchedSchemes ? (
            <div className="animate-fade-in max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {t("findSchemesPage.aiBadge")}
                  </span>
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {t("findSchemesPage.title")}
                </h1>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                  {t("findSchemesPage.subtitle")}
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="max-w-2xl mx-auto mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t("findSchemesPage.errorToastTitle")}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Input Mode Selector */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("nl")}
                    className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === "nl"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Wand2 className="h-4 w-4" />
                    {t("form.nlTab")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("form")}
                    className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === "form"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    {t("form.formTab")}
                  </button>
                </div>
              </div>

              {activeTab === "nl" ? (
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elegant">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {t("form.nlTitle")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    {t("form.nlSubtitle")}
                  </p>

                  <form onSubmit={handleNLSubmit} className="space-y-4">
                    <Textarea
                      rows={4}
                      value={nlQuery}
                      onChange={(e) => setNlQuery(e.target.value)}
                      placeholder={t("form.nlPlaceholder")}
                      className="resize-none bg-background text-base"
                    />

                    {/* Quick helper pills */}
                    <div className="space-y-1.5">
                      <p className="text-xs text-muted-foreground">Examples in English, हिन्दी, Hinglish:</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setNlQuery("I am a B.Tech student from Haryana looking for a scholarship")}
                          className="rounded-full border border-border bg-muted/30 px-3 py-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          "I am a B.Tech student from Haryana"
                        </button>
                        <button
                          type="button"
                          onClick={() => setNlQuery("मैं हरियाणा का B.Tech छात्र हूँ और मुझे छात्रवृत्ति चाहिए")}
                          className="rounded-full border border-border bg-muted/30 px-3 py-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          "मैं हरियाणा का B.Tech छात्र हूँ"
                        </button>
                        <button
                          type="button"
                          onClick={() => setNlQuery("Main Haryana ka B.Tech student hoon, mujhe scholarship chahiye")}
                          className="rounded-full border border-border bg-muted/30 px-3 py-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          "Main Haryana ka B.Tech student hoon"
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full mt-4"
                      disabled={isLoading || !nlQuery.trim()}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      {isLoading ? t("form.submitting") : t("form.nlSubmit")}
                    </Button>
                  </form>
                </div>
              ) : (
                <UserProfileForm
                  onSubmit={handleProfileSubmit}
                  isLoading={isLoading}
                  initialProfile={lastSubmittedProfile}
                />
              )}
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={handleReset} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("findSchemesPage.checkAgain")}
                </Button>
              </div>

              <div className="max-w-3xl mx-auto mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground text-center">
                  {t("findSchemesPage.resultsTitle")}
                </h1>

                {summary && (
                  <div className="mt-6 rounded-2xl bg-hero-gradient p-6 text-primary-foreground shadow-md">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">{t("findSchemesPage.aiSummary")}</p>
                        <p className="mt-1 text-primary-foreground/90">{summary}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {matchedSchemes.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {matchedSchemes.map((scheme) => (
                    <SchemeCard key={scheme.id} scheme={scheme} showMatchScore />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t("findSchemesPage.noMatches")}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    {t("findSchemesPage.noMatchesDesc")}
                  </p>
                  <Button onClick={handleReset} className="mt-6">
                    {t("findSchemesPage.tryDifferent")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindSchemes;
