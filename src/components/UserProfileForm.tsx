import { useState, useEffect } from "react";
import { UserProfile } from "@/types/scheme";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { indianStates } from "@/data/schemes";
import { Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
  initialProfile?: UserProfile | null;
}

const UserProfileForm = ({ onSubmit, isLoading, initialProfile }: UserProfileFormProps) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    gender: "",
    state: "",
    category: "",
    income: 0,
    occupation: "",
    education: "",
    isDisabled: false,
    isMinority: false,
    isBPL: false,
  });

  useEffect(() => {
    if (initialProfile) {
      setFormData(initialProfile);
    }
  }, [initialProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant border-border">
      <CardHeader className="text-center pb-2">
        <CardTitle className="font-display text-2xl">{t("form.title")}</CardTitle>
        <CardDescription className="text-base">
          {t("form.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">{t("form.ageLabelWithUnit")}</Label>
              <Input
                id="age"
                type="number"
                min={1}
                max={120}
                value={formData.age === 0 ? "" : formData.age}
                onChange={(e) => {
                  const value = e.target.value;
                  updateField("age", value === "" ? 0 : parseInt(value, 10) || 0);
                }}
                className="bg-background"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">{t("form.gender")}</Label>
              <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("form.selectGender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t("form.genderMale")}</SelectItem>
                  <SelectItem value="female">{t("form.genderFemale")}</SelectItem>
                  <SelectItem value="other">{t("form.genderOther")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">{t("form.state")}</Label>
              <Select value={formData.state} onValueChange={(v) => updateField("state", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("form.selectState")} />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">{t("form.category")}</Label>
              <Select value={formData.category} onValueChange={(v) => updateField("category", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("form.selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{t("form.catGeneral")}</SelectItem>
                  <SelectItem value="sc">{t("form.catSC")}</SelectItem>
                  <SelectItem value="st">{t("form.catST")}</SelectItem>
                  <SelectItem value="obc">{t("form.catOBC")}</SelectItem>
                  <SelectItem value="ews">{t("form.catEWS")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Annual Income */}
            <div className="space-y-2">
              <Label htmlFor="income">{t("form.incomeLabelWithUnit")}</Label>
              <Input
                id="income"
                type="number"
                min={0}
                step={5000}
                value={formData.income === 0 ? "" : formData.income}
                onChange={(e) => {
                  const value = e.target.value;
                  updateField("income", value === "" ? 0 : parseInt(value, 10) || 0);
                }}
                placeholder={t("form.incomePlaceholder")}
                className="bg-background"
                required
              />
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation">{t("form.occupation")}</Label>
              <Select value={formData.occupation} onValueChange={(v) => updateField("occupation", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("form.selectOccupation")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">{t("form.occFarmer")}</SelectItem>
                  <SelectItem value="student">{t("form.occStudent")}</SelectItem>
                  <SelectItem value="employed">{t("form.occEmployed")}</SelectItem>
                  <SelectItem value="government">{t("form.occGovt")}</SelectItem>
                  <SelectItem value="self-employed">{t("form.occSelfEmployed")}</SelectItem>
                  <SelectItem value="unemployed">{t("form.occUnemployed")}</SelectItem>
                  <SelectItem value="homemaker">{t("form.occHomemaker")}</SelectItem>
                  <SelectItem value="retired">{t("form.occRetired")}</SelectItem>
                  <SelectItem value="daily-wage">{t("form.occDailyWage")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Education */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="education">{t("form.education")}</Label>
              <Select value={formData.education} onValueChange={(v) => updateField("education", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("form.selectEducation")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-formal">{t("form.eduNoFormal")}</SelectItem>
                  <SelectItem value="primary">{t("form.eduPrimary")}</SelectItem>
                  <SelectItem value="middle">{t("form.eduMiddle")}</SelectItem>
                  <SelectItem value="secondary">{t("form.eduSecondary")}</SelectItem>
                  <SelectItem value="higher-secondary">{t("form.eduHigherSecondary")}</SelectItem>
                  <SelectItem value="diploma">{t("form.eduDiploma")}</SelectItem>
                  <SelectItem value="graduate">{t("form.eduGraduate")}</SelectItem>
                  <SelectItem value="post-graduate">{t("form.eduPostGraduate")}</SelectItem>
                  <SelectItem value="professional">{t("form.eduProfessional")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground">{t("form.additionalInfo")}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="disabled"
                  checked={formData.isDisabled}
                  onCheckedChange={(checked) => updateField("isDisabled", !!checked)}
                />
                <Label htmlFor="disabled" className="text-sm font-normal cursor-pointer">
                  {t("form.disabled")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="minority"
                  checked={formData.isMinority}
                  onCheckedChange={(checked) => updateField("isMinority", !!checked)}
                />
                <Label htmlFor="minority" className="text-sm font-normal cursor-pointer">
                  {t("form.minority")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bpl"
                  checked={formData.isBPL}
                  onCheckedChange={(checked) => updateField("isBPL", !!checked)}
                />
                <Label htmlFor="bpl" className="text-sm font-normal cursor-pointer">
                  {t("form.bpl")}
                </Label>
              </div>
            </div>
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("form.submitting")}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                {t("form.submit")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
