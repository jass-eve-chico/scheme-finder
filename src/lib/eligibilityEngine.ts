import { Scheme, UserProfile } from "@/types/scheme";
import { Language } from "@/data/translations";

export interface EvaluatedScheme extends Scheme {
  eligibilityScore: number;
  matchReason: string;
  matchDetails?: {
    ageMatch: boolean;
    incomeMatch: boolean;
    occupationMatch: boolean;
    categoryMatch: boolean;
  };
}

export interface EligibilityResult {
  matchedSchemes: EvaluatedScheme[];
  summary: string;
}

/**
 * Deterministic scheme eligibility evaluator
 * Language-independent: score and matching criteria are calculated identically
 * regardless of the user's selected UI language.
 */
export function evaluateEligibility(
  profile: UserProfile,
  schemes: Scheme[],
  lang: Language = "en"
): EligibilityResult {
  const evaluated = schemes.map((scheme) => {
    let score = 50; // Base score
    const reasons: string[] = [];

    const schemeNameLower = scheme.name.toLowerCase();
    const schemeCategoryLower = scheme.category.toLowerCase();
    const eligibilityText = (scheme.eligibility || []).join(" ").toLowerCase();
    const benefitsLower = (scheme.benefits || "").toLowerCase();
    const fullText = `${schemeNameLower} ${schemeCategoryLower} ${eligibilityText} ${benefitsLower}`;

    let ageMatch = true;
    let incomeMatch = true;
    let occupationMatch = false;
    let categoryMatch = false;

    // 1. Occupation Matching
    if (profile.occupation === "student") {
      if (
        scheme.category === "Education" ||
        fullText.includes("student") ||
        fullText.includes("scholarship") ||
        fullText.includes("fellowship") ||
        fullText.includes("merit")
      ) {
        score += 35;
        occupationMatch = true;
        reasons.push("Perfect match for students seeking scholarships and educational aid.");
      } else if (scheme.category === "Employment & Skills") {
        score += 15;
        occupationMatch = true;
        reasons.push("Provides skill training and youth employment opportunities.");
      }
    } else if (profile.occupation === "farmer") {
      if (
        scheme.category === "Agriculture" ||
        fullText.includes("farmer") ||
        fullText.includes("kisan") ||
        fullText.includes("crop") ||
        fullText.includes("cultivator")
      ) {
        score += 35;
        occupationMatch = true;
        reasons.push("Tailored for agricultural workers and farmers.");
      }
    } else if (profile.occupation === "self-employed") {
      if (
        scheme.category === "Business & Entrepreneurship" ||
        fullText.includes("business") ||
        fullText.includes("loan") ||
        fullText.includes("mudra") ||
        fullText.includes("msme") ||
        fullText.includes("startup")
      ) {
        score += 35;
        occupationMatch = true;
        reasons.push("Provides credit assistance and business growth support.");
      }
    } else if (profile.occupation === "unemployed") {
      if (
        scheme.category === "Employment & Skills" ||
        scheme.category === "Business & Entrepreneurship" ||
        fullText.includes("skill") ||
        fullText.includes("employment")
      ) {
        score += 30;
        occupationMatch = true;
        reasons.push("Offers employment skills and self-employment funding.");
      }
    } else if (profile.occupation === "retired") {
      if (
        scheme.category === "Pension & Retirement" ||
        fullText.includes("senior") ||
        fullText.includes("pension") ||
        fullText.includes("elderly")
      ) {
        score += 35;
        occupationMatch = true;
        reasons.push("Provides monthly pension security for senior citizens.");
      }
    } else if (profile.occupation === "daily-wage") {
      if (
        scheme.category === "Energy & Welfare" ||
        scheme.category === "Housing" ||
        fullText.includes("labor") ||
        fullText.includes("unorganised") ||
        fullText.includes("worker")
      ) {
        score += 30;
        occupationMatch = true;
        reasons.push("Targeted welfare benefits for daily wage workers.");
      }
    }

    // 2. Income Evaluation
    const income = profile.income;
    if (eligibilityText.includes("bpl") || eligibilityText.includes("poverty line")) {
      if (profile.isBPL || income <= 150000) {
        score += 15;
        incomeMatch = true;
        reasons.push("Meets low income / BPL criteria.");
      } else {
        score -= 20;
        incomeMatch = false;
      }
    } else if (eligibilityText.includes("ews") || eligibilityText.includes("3 lakh") || eligibilityText.includes("₹3 lakh")) {
      if (income <= 300000) {
        score += 10;
        incomeMatch = true;
      } else if (income > 500000) {
        score -= 10;
        incomeMatch = false;
      }
    } else if (eligibilityText.includes("6 lakh") || eligibilityText.includes("₹6 lakh")) {
      if (income <= 600000) {
        score += 10;
        incomeMatch = true;
      }
    } else if (eligibilityText.includes("18 lakh") || eligibilityText.includes("₹18 lakh")) {
      if (income <= 1800000) {
        score += 5;
        incomeMatch = true;
      }
    }

    // 3. Category & Social Criteria
    if (profile.category === "sc" || profile.category === "st") {
      if (fullText.includes("sc") || fullText.includes("st") || fullText.includes("tribal") || fullText.includes("scheduled")) {
        score += 15;
        categoryMatch = true;
        reasons.push("Reserved category priority available.");
      }
    } else if (profile.category === "obc") {
      if (fullText.includes("obc") || fullText.includes("backward")) {
        score += 10;
        categoryMatch = true;
      }
    } else if (profile.category === "ews") {
      if (fullText.includes("ews") || fullText.includes("economically weaker")) {
        score += 10;
        categoryMatch = true;
      }
    }

    // 4. Special Profiles (Disability, Minority, Gender)
    if (profile.isDisabled && (scheme.category === "Disability Welfare" || fullText.includes("disabilit") || fullText.includes("divyang"))) {
      score += 35;
      reasons.push("Direct benefit for persons with disability.");
    }

    if (profile.isMinority && (fullText.includes("minority") || fullText.includes("alpsankhyak"))) {
      score += 25;
      reasons.push("Special provision for minority community members.");
    }

    if (profile.gender === "female" && (scheme.category === "Women & Child Welfare" || fullText.includes("women") || fullText.includes("girl") || fullText.includes("mahila"))) {
      score += 30;
      reasons.push("Specially dedicated scheme for women empowerment.");
    }

    // 5. Age checking
    const age = profile.age;
    if (age < 18 && scheme.category === "Business & Entrepreneurship") {
      score -= 25;
      ageMatch = false;
    } else if (age < 60 && scheme.category === "Pension & Retirement" && !fullText.includes("atal")) {
      score -= 25;
      ageMatch = false;
    }

    // Clamp score
    const finalScore = Math.min(98, Math.max(30, score));

    // Construct localized match reason
    let matchReason = reasons[0] || "This scheme may be relevant based on your socio-economic profile.";
    if (lang === "hi") {
      if (occupationMatch && profile.occupation === "student") {
        matchReason = "छात्रवृत्ति और उच्च शिक्षा सहायता चाहने वाले छात्रों के लिए उपयुक्त योजना।";
      } else if (occupationMatch && profile.occupation === "farmer") {
        matchReason = "कृषि और किसान कल्याण हेतु वित्तीय सहायता एवं लाभ।";
      } else if (occupationMatch && profile.occupation === "self-employed") {
        matchReason = "व्यवसाय विकास और ऋण सहायता के लिए उपयुक्त योजना।";
      } else if (profile.gender === "female" && scheme.category === "Women & Child Welfare") {
        matchReason = "महिला सशक्तिकरण और कल्याण हेतु विशेष योजना।";
      } else {
        matchReason = "आपकी प्रोफ़ाइल, आय और पात्रता मानदंडों के अनुसार उपयुक्त योजना।";
      }
    } else if (lang === "hinglish") {
      if (occupationMatch && profile.occupation === "student") {
        matchReason = "Scholarship aur higher education help ke liye perfect scheme.";
      } else if (occupationMatch && profile.occupation === "farmer") {
        matchReason = "Kheti aur kisan welfare ke liye direct fayda.";
      } else if (occupationMatch && profile.occupation === "self-employed") {
        matchReason = "Business badhane aur loan support ke liye best match.";
      } else if (profile.gender === "female" && scheme.category === "Women & Child Welfare") {
        matchReason = "Women empowerment aur benefit ke liye special scheme.";
      } else {
        matchReason = "Aapki profile aur income criteria ke mutabik matched scheme.";
      }
    }

    return {
      ...scheme,
      eligibilityScore: finalScore,
      matchReason,
      matchDetails: {
        ageMatch,
        incomeMatch,
        occupationMatch,
        categoryMatch,
      },
    };
  });

  // Filter schemes with score >= 60 and sort by highest score first
  const matchedSchemes = evaluated
    .filter((s) => s.eligibilityScore >= 60)
    .sort((a, b) => b.eligibilityScore - a.eligibilityScore);

  let summary = `Based on your profile as a ${profile.occupation} from ${profile.state || "India"}, we found ${matchedSchemes.length} high-match schemes with benefits up to ₹10 Lakhs. Review the eligibility requirements to apply.`;
  if (lang === "hi") {
    summary = `आपकी प्रोफ़ाइल (${profile.occupation}, ${profile.state || "भारत"}) के आधार पर हमने ${matchedSchemes.length} अत्यधिक उपयुक्त योजनाएँ पाई हैं। आवेदन करने के लिए पात्रता विवरण देखें।`;
  } else if (lang === "hinglish") {
    summary = `Aapki profile (${profile.occupation}, ${profile.state || "India"}) ke basis par ${matchedSchemes.length} matching schemes mili hain. Apply karne ke liye details check karein.`;
  }

  return {
    matchedSchemes,
    summary,
  };
}
