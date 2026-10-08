import { Scheme, UserProfile } from "@/types/scheme";
import { indianStates } from "@/data/schemes";

// Concept dictionary mapping multilingual tokens to canonical topics and categories
interface SearchConcept {
  id: string;
  category: string;
  keywords: string[]; // English, Hindi, Hinglish terms
  canonicalTerms: string[];
}

export const SEARCH_CONCEPTS: SearchConcept[] = [
  {
    id: "student_scholarship",
    category: "Education",
    keywords: [
      // English
      "student", "scholarship", "study", "education", "college", "school", "degree",
      "b.tech", "btech", "m.tech", "diploma", "engineering", "tuition", "hostel",
      // Hindi
      "छात्र", "विद्यार्थी", "छात्रवृत्ति", "वजीफा", "शिक्षा", "पढ़ाई", "कॉलेज", "स्कूल", "डिग्री",
      "इंजीनियरिंग", "स्नातक",
      // Hinglish
      "padhai", "padhna", "scholarship chahiye", "padhai ke liye", "vidyarthi", "fees",
      "college ke liye", "school ke liye", "padhai ke liye scholarship"
    ],
    canonicalTerms: ["student", "scholarship", "education", "fellowship", "merit", "matric", "post-matric"]
  },
  {
    id: "farmer_agriculture",
    category: "Agriculture",
    keywords: [
      // English
      "farmer", "agriculture", "farming", "crop", "cultivator", "kisan", "agri", "harvest",
      "fertilizer", "tractor", "irrigation",
      // Hindi
      "किसान", "कृषक", "खेती", "कृषि", "फसल", "खाद", "बीज", "सिंचाई", "खेत", "जुताई",
      // Hinglish
      "kisan", "farmer ke liye scheme", "kheti", "krishi", "fasal", "khet", "kisaan", "bavai"
    ],
    canonicalTerms: ["farmer", "kisan", "agriculture", "crop", "krishi", "pm-kisan"]
  },
  {
    id: "business_loan",
    category: "Business & Entrepreneurship",
    keywords: [
      // English
      "business loan", "business", "loan", "entrepreneur", "startup", "shop", "msme",
      "mudra", "credit", "self employed", "enterprise",
      // Hindi
      "व्यवसाय ऋण", "व्यापार ऋण", "व्यवसाय", "व्यापार", "ऋण", "कर्ज", "लोन", "दुकान",
      "उद्यमी", "उद्यमिता", "मुद्रा लोन",
      // Hinglish
      "business loan chahiye", "karz", "loan chahiye", "apna business", "dukaan ke liye",
      "vyapar", "kamai", "mudra loan chahiye", "self employed", "chhota business"
    ],
    canonicalTerms: ["business", "loan", "entrepreneur", "mudra", "msme", "credit", "startup", "pmegp"]
  },
  {
    id: "housing",
    category: "Housing",
    keywords: [
      // English
      "housing", "house", "home", "pmay", "shelter", "flat", "residence", "construction",
      // Hindi
      "आवास", "घर", "मकान", "रहने का घर", "गृह", "झोपड़ी", "पक्का मकान",
      // Hinglish
      "makan", "ghar", "awas", "makaan chahiye", "ghar banane", "chhat", "pucca makan"
    ],
    canonicalTerms: ["housing", "house", "pmay", "awas", "home", "shelter"]
  },
  {
    id: "healthcare",
    category: "Healthcare",
    keywords: [
      // English
      "health", "healthcare", "medical", "hospital", "treatment", "ayushman", "medicine",
      "doctor", "illness", "surgery",
      // Hindi
      "स्वास्थ्य", "इलाज", "चिकित्सा", "अस्पताल", "दवा", "आयुष्मान", "बीमारी", "उपचार",
      // Hinglish
      "ilaaj", "health", "hospital", "bimaari", "dawa", "doctor", "ayushman card", "treatment"
    ],
    canonicalTerms: ["health", "hospital", "ayushman", "medical", "treatment", "swasthya"]
  },
  {
    id: "women_child",
    category: "Women & Child Welfare",
    keywords: [
      // English
      "women", "woman", "girl", "child", "maternity", "mother", "daughter", "female", "widow",
      "sukanya", "pregnancy",
      // Hindi
      "महिला", "नारी", "लड़की", "बेटी", "कन्या", "बालिका", "मातृ", "विधवा", "गर्भवती",
      // Hinglish
      "mahila", "aurat", "ladki", "beti", "kanya", "balika", "vidhwa", "sukanya samriddhi"
    ],
    canonicalTerms: ["women", "girl", "child", "maternity", "mother", "daughter", "sukanya", "mahila"]
  },
  {
    id: "pension_senior",
    category: "Pension & Retirement",
    keywords: [
      // English
      "pension", "senior citizen", "old age", "elderly", "retired", "retirement",
      // Hindi
      "पेंशन", "वृद्धावस्था", "बुजुर्ग", "वृद्ध", "सेवानिवृत्त", "बुढ़ापा",
      // Hinglish
      "pension", "bujurg", "old age", "budhe", "vriddha", "retire", "budhapa"
    ],
    canonicalTerms: ["pension", "senior", "elderly", "old age", "atal pension"]
  },
  {
    id: "disability_welfare",
    category: "Disability Welfare",
    keywords: [
      // English
      "disability", "disabled", "handicapped", "pwd", "divyang", "blind", "deaf",
      // Hindi
      "दिव्यांग", "विकलांग", "अशक्त", "नेत्रहीन",
      // Hinglish
      "divyang", "viklang", "handicap", "disability"
    ],
    canonicalTerms: ["disability", "disabled", "divyang", "handicap", "assistive"]
  },
  {
    id: "employment_skills",
    category: "Employment & Skills",
    keywords: [
      // English
      "employment", "job", "skill", "training", "unemployed", "placement", "rozgar",
      // Hindi
      "रोजगार", "नौकरी", "कौशल", "प्रशिक्षण", "बेरोजगार",
      // Hinglish
      "rozgar", "naukri", "job chahiye", "skill training", "berozgari", "kaam"
    ],
    canonicalTerms: ["employment", "skill", "training", "job", "rozgar", "pmkvy"]
  },
  {
    id: "insurance_financial",
    category: "Insurance",
    keywords: [
      // English
      "insurance", "life insurance", "accident cover", "bima", "financial", "premium",
      // Hindi
      "बीमा", "सुरक्षा बीमा", "जीवन ज्योति", "पॉलिसी",
      // Hinglish
      "bima", "life insurance", "accident bima", "suraksha bima"
    ],
    canonicalTerms: ["insurance", "bima", "suraksha", "jeevan jyoti", "cover"]
  }
];

// Mapping for Indian states in English, Hindi, Hinglish
const STATE_MAP: Record<string, string> = {
  "haryana": "Haryana",
  "हरियाणा": "Haryana",
  "punjab": "Punjab",
  "पंजाब": "Punjab",
  "delhi": "Delhi",
  "दिल्ली": "Delhi",
  "up": "Uttar Pradesh",
  "uttar pradesh": "Uttar Pradesh",
  "उत्तर प्रदेश": "Uttar Pradesh",
  "bihar": "Bihar",
  "बिहार": "Bihar",
  "maharashtra": "Maharashtra",
  "महाराष्ट्र": "Maharashtra",
  "rajasthan": "Rajasthan",
  "राजस्थान": "Rajasthan",
  "madhya pradesh": "Madhya Pradesh",
  "मध्य प्रदेश": "Madhya Pradesh",
  "mp": "Madhya Pradesh",
  "gujarat": "Gujarat",
  "गुजरात": "Gujarat",
  "karnataka": "Karnataka",
  "कर्नाटक": "Karnataka",
  "tamil nadu": "Tamil Nadu",
  "तमिलनाडु": "Tamil Nadu",
  "kerala": "Kerala",
  "केरल": "Kerala",
  "west bengal": "West Bengal",
  "पश्चिम बंगाल": "West Bengal",
  "bengal": "West Bengal",
};

/**
 * Natural language profile parser
 * Supports English, Hindi, and Hinglish queries:
 * e.g.
 * - "I am a B.Tech student from Haryana"
 * - "मैं हरियाणा का B.Tech छात्र हूँ"
 * - "Main Haryana ka B.Tech student hoon"
 * - "I am a student and need a scholarship"
 * - "मैं एक छात्र हूँ और मुझे छात्रवृत्ति चाहिए"
 * - "Mujhe scholarship chahiye, main student hoon"
 */
export interface ParsedNLQuery {
  profile: UserProfile;
  matchedConcepts: string[];
  matchedCategories: string[];
  searchKeywords: string[];
  intentDescription: string;
}

export function parseNaturalLanguageProfile(rawQuery: string): ParsedNLQuery {
  const query = rawQuery.toLowerCase().trim();

  const profile: UserProfile = {
    age: 21,
    gender: "male",
    state: "Haryana",
    category: "general",
    income: 250000,
    occupation: "student",
    education: "graduate",
    isDisabled: false,
    isMinority: false,
    isBPL: false,
  };

  const matchedConcepts: string[] = [];
  const matchedCategories: string[] = [];
  const searchKeywords: string[] = [];

  // 1. Detect State
  for (const [key, stateName] of Object.entries(STATE_MAP)) {
    if (query.includes(key)) {
      profile.state = stateName;
      break;
    }
  }

  // Also check direct match against full state list
  for (const st of indianStates) {
    if (query.includes(st.toLowerCase())) {
      profile.state = st;
      break;
    }
  }

  // 2. Detect Occupation & Education
  // Student & Scholarship
  if (
    query.includes("student") ||
    query.includes("छात्र") ||
    query.includes("विद्यार्थी") ||
    query.includes("padhai") ||
    query.includes("scholarship") ||
    query.includes("छात्रवृत्ति") ||
    query.includes("वजीफा") ||
    query.includes("b.tech") ||
    query.includes("btech")
  ) {
    profile.occupation = "student";
    matchedConcepts.push("student_scholarship");
    matchedCategories.push("Education");
    searchKeywords.push("student", "scholarship", "education");

    if (query.includes("b.tech") || query.includes("btech") || query.includes("graduate") || query.includes("स्नातक")) {
      profile.education = "graduate";
      profile.age = 21;
    }
  }

  // Farmer / Agriculture
  if (
    query.includes("farmer") ||
    query.includes("किसान") ||
    query.includes("कृषक") ||
    query.includes("kisan") ||
    query.includes("kheti") ||
    query.includes("krishi")
  ) {
    profile.occupation = "farmer";
    profile.age = 35;
    matchedConcepts.push("farmer_agriculture");
    matchedCategories.push("Agriculture");
    searchKeywords.push("farmer", "kisan", "agriculture");
  }

  // Business / Self Employed
  if (
    query.includes("business") ||
    query.includes("vyapar") ||
    query.includes("व्यवसाय") ||
    query.includes("व्यापार") ||
    query.includes("loan") ||
    query.includes("ऋण") ||
    query.includes("कर्ज") ||
    query.includes("dukaan")
  ) {
    profile.occupation = "self-employed";
    matchedConcepts.push("business_loan");
    matchedCategories.push("Business & Entrepreneurship");
    searchKeywords.push("business", "loan", "entrepreneurship");
  }

  // 3. Detect Age if explicitly mentioned (e.g., "25 years old", "25 saal", "25 वर्ष")
  const ageMatch = query.match(/(\d{1,2})\s*(?:years|saal|year|वर्ष|sal)/);
  if (ageMatch && ageMatch[1]) {
    const parsedAge = parseInt(ageMatch[1], 10);
    if (parsedAge >= 1 && parsedAge <= 120) {
      profile.age = parsedAge;
    }
  }

  // 4. Detect Category (SC, ST, OBC, EWS, General)
  if (query.includes("sc") || query.includes("अनुसूचित जाति")) {
    profile.category = "sc";
  } else if (query.includes("st") || query.includes("अनुसूचित जनजाति")) {
    profile.category = "st";
  } else if (query.includes("obc") || query.includes("अन्य पिछड़ा")) {
    profile.category = "obc";
  } else if (query.includes("ews") || query.includes("आर्थिक कमजोर")) {
    profile.category = "ews";
  }

  // 5. Detect Disability, BPL, Minority
  if (query.includes("disabled") || query.includes("दिव्यांग") || query.includes("विकलांग") || query.includes("divyang")) {
    profile.isDisabled = true;
    matchedConcepts.push("disability_welfare");
    matchedCategories.push("Disability Welfare");
  }
  if (query.includes("bpl") || query.includes("गरीबी रेखा") || query.includes("ration card") || query.includes("राशन")) {
    profile.isBPL = true;
  }
  if (query.includes("minority") || query.includes("अल्पसंख्यक")) {
    profile.isMinority = true;
  }

  // 6. Check for Housing / Healthcare / Pension intents
  if (query.includes("makan") || query.includes("ghar") || query.includes("आवास") || query.includes("housing")) {
    matchedConcepts.push("housing");
    matchedCategories.push("Housing");
    searchKeywords.push("housing", "awas", "pmay");
  }
  if (query.includes("health") || query.includes("ilaaj") || query.includes("hospital") || query.includes("इलाज") || query.includes("स्वास्थ्य")) {
    matchedConcepts.push("healthcare");
    matchedCategories.push("Healthcare");
    searchKeywords.push("health", "ayushman", "treatment");
  }
  if (query.includes("pension") || query.includes("पेंशन") || query.includes("bujurg") || query.includes("old age")) {
    profile.age = 62;
    matchedConcepts.push("pension_senior");
    matchedCategories.push("Pension & Retirement");
    searchKeywords.push("pension", "senior citizen");
  }

  return {
    profile,
    matchedConcepts,
    matchedCategories: Array.from(new Set(matchedCategories)),
    searchKeywords: Array.from(new Set(searchKeywords)),
    intentDescription: `Detected Profile: ${profile.occupation} from ${profile.state}, seeking ${matchedCategories.join(", ") || "benefits"}`
  };
}

/**
 * Filter schemes using multilingual search
 * Understands English, Hindi, and Hinglish keywords
 */
export function filterSchemesMultilingual(
  schemes: Scheme[],
  searchQuery: string,
  selectedCategory: string
): Scheme[] {
  const query = searchQuery.toLowerCase().trim();

  // If no search query and no category filter
  if (!query && (selectedCategory === "All Categories" || !selectedCategory)) {
    return schemes;
  }

  // Expand query with matching concept keywords and canonical terms
  const expandedTerms = new Set<string>();
  const targetCategories = new Set<string>();

  if (query) {
    expandedTerms.add(query);

    // Split words
    const queryTokens = query.split(/\s+/).filter(Boolean);
    queryTokens.forEach(t => expandedTerms.add(t));

    // Check concept match
    for (const concept of SEARCH_CONCEPTS) {
      const hasMatch = concept.keywords.some(kw => {
        const kwLower = kw.toLowerCase();
        return query.includes(kwLower) || queryTokens.includes(kwLower);
      });

      if (hasMatch) {
        targetCategories.add(concept.category);
        concept.canonicalTerms.forEach(term => expandedTerms.add(term.toLowerCase()));
      }
    }
  }

  const termsArray = Array.from(expandedTerms);

  return schemes.filter(scheme => {
    // 1. Category match
    const categoryMatches =
      !selectedCategory ||
      selectedCategory === "All Categories" ||
      scheme.category.toLowerCase() === selectedCategory.toLowerCase();

    if (!categoryMatches) {
      return false;
    }

    // 2. Query search match
    if (!query) {
      return true;
    }

    const schemeNameLower = scheme.name.toLowerCase();
    const schemeDescLower = scheme.description.toLowerCase();
    const schemeMinistryLower = scheme.ministry.toLowerCase();
    const schemeCategoryLower = scheme.category.toLowerCase();
    const schemeEligibilityText = (scheme.eligibility || []).join(" ").toLowerCase();
    const schemeBenefitsText = (scheme.benefits || "").toLowerCase();

    // Check direct contains
    if (
      schemeNameLower.includes(query) ||
      schemeDescLower.includes(query) ||
      schemeMinistryLower.includes(query) ||
      schemeCategoryLower.includes(query)
    ) {
      return true;
    }

    // Check if scheme belongs to a matched target category from multilingual search
    if (targetCategories.has(scheme.category)) {
      return true;
    }

    // Check if any canonical term matches
    const hasCanonicalMatch = termsArray.some(term => {
      if (term.length < 3) return false;
      return (
        schemeNameLower.includes(term) ||
        schemeDescLower.includes(term) ||
        schemeCategoryLower.includes(term) ||
        schemeEligibilityText.includes(term) ||
        schemeBenefitsText.includes(term)
      );
    });

    return hasCanonicalMatch;
  });
}
