export interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  ageMin: number;
  ageMax: number;
  benefits: string;
  fullDescription: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  instructions: string[];
  deadline?: string;
  isEligible?: boolean;
  ineligibilityReason?: string;
}

export const mockSchemes: Scheme[] = [
  {
    id: "1",
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support for farmers",
    category: "Agriculture",
    location: "All India",
    ageMin: 18,
    ageMax: 100,
    benefits: "₹6,000 per year in three equal installments",
    fullDescription:
      "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme that provides income support to all landholding farmers' families across the country, to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.",
    eligibilityCriteria: [
      "Must be a farmer with cultivable land",
      "Age between 18-100 years",
      "Valid Aadhaar card",
      "Bank account linked with Aadhaar",
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Land ownership documents",
      "Bank passbook",
      "Passport size photograph",
    ],
    instructions: [
      "Visit the official PM-KISAN portal",
      "Register using Aadhaar number",
      "Fill in land details",
      "Submit required documents",
      "Track application status online",
    ],
    isEligible: true,
  },
  {
    id: "2",
    title: "National Scholarship Portal - Post Matric",
    description: "Financial assistance for SC/ST/OBC students",
    category: "Education",
    location: "All India",
    ageMin: 18,
    ageMax: 25,
    benefits: "Up to ₹20,000 per year for college education",
    fullDescription:
      "The Post Matric Scholarship scheme provides financial assistance to students from SC/ST/OBC categories pursuing higher education to help them complete their studies without financial burden.",
    eligibilityCriteria: [
      "Must be SC/ST/OBC category student",
      "Age between 18-25 years",
      "Enrolled in recognized institution",
      "Family income less than ₹2.5 lakhs per annum",
    ],
    requiredDocuments: [
      "Category certificate",
      "Income certificate",
      "Previous year marksheet",
      "Current enrollment proof",
      "Bank details",
      "Aadhaar card",
    ],
    instructions: [
      "Register on National Scholarship Portal",
      "Fill application form carefully",
      "Upload all required documents",
      "Submit to institution for verification",
      "Track status on portal",
    ],
    deadline: "2025-12-31",
    isEligible: false,
    ineligibilityReason: "Your age (28) is outside the required 18-25 range.",
  },
  {
    id: "3",
    title: "Pradhan Mantri Awas Yojana - Urban",
    description: "Housing for all in urban areas",
    category: "Housing",
    location: "Urban Areas",
    ageMin: 21,
    ageMax: 70,
    benefits: "Subsidy up to ₹2.67 lakhs on home loans",
    fullDescription:
      "PMAY-U aims to provide affordable housing to all eligible beneficiaries in urban areas through financial assistance and interest subsidies on home loans.",
    eligibilityCriteria: [
      "Must not own a pucca house in India",
      "Age between 21-70 years",
      "Annual household income criteria varies by category",
      "First-time home buyer",
    ],
    requiredDocuments: [
      "Aadhaar card of all family members",
      "Income certificate",
      "Property documents",
      "Bank account details",
      "Passport size photographs",
    ],
    instructions: [
      "Apply online through PMAY portal",
      "Get application verified by competent authority",
      "Submit to participating banks/HFCs",
      "Await approval and sanction",
      "Complete property purchase and claim subsidy",
    ],
    deadline: "2025-03-31",
    isEligible: true,
  },
  {
    id: "4",
    title: "Ayushman Bharat - Health Insurance",
    description: "Health insurance coverage for families",
    category: "Healthcare",
    location: "All India",
    ageMin: 0,
    ageMax: 100,
    benefits: "Health coverage up to ₹5 lakhs per family per year",
    fullDescription:
      "Ayushman Bharat provides comprehensive health insurance coverage to economically vulnerable families, covering hospitalization expenses up to ₹5 lakhs per family per year.",
    eligibilityCriteria: [
      "Family listed in SECC 2011 database",
      "Meets deprivation criteria",
      "Rural/urban poor households",
      "No age restrictions",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Ration card",
      "Mobile number",
      "Any government ID proof",
    ],
    instructions: [
      "Check eligibility on official portal",
      "Visit nearest Common Service Center",
      "Get Ayushman Card generated",
      "Use card at empaneled hospitals",
      "No premium payment required",
    ],
    isEligible: true,
  },
  {
    id: "5",
    title: "Skill India - Pradhan Mantri Kaushal Vikas Yojana",
    description: "Skill development and training programs",
    category: "Skill Development",
    location: "All India",
    ageMin: 15,
    ageMax: 45,
    benefits: "Free skill training with certification and monetary rewards",
    fullDescription:
      "PMKVY aims to provide skill training to youth to help them get better livelihoods. Individuals with prior learning experience or skills will also be assessed and certified under Recognition of Prior Learning (RPL).",
    eligibilityCriteria: [
      "Age between 15-45 years",
      "School dropout or unemployed",
      "Indian citizen",
      "Should not have received any other government skill training",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Age proof document",
      "Educational qualification certificate",
      "Bank account details",
      "Passport size photograph",
    ],
    instructions: [
      "Find nearest training center on Skill India portal",
      "Enroll for desired course",
      "Complete training and assessment",
      "Receive certificate and monetary reward",
      "Get placement assistance",
    ],
    deadline: "2026-03-31",
    isEligible: true,
  },
  {
    id: "6",
    title: "Stand Up India",
    description: "Bank loans for SC/ST and women entrepreneurs",
    category: "Entrepreneurship",
    location: "All India",
    ageMin: 18,
    ageMax: 65,
    benefits: "Loans between ₹10 lakhs to ₹1 crore for new enterprises",
    fullDescription:
      "Stand Up India scheme facilitates bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
    eligibilityCriteria: [
      "Must be SC/ST or Woman",
      "Age between 18-65 years",
      "First-time entrepreneur",
      "Loan for new enterprise only",
    ],
    requiredDocuments: [
      "Project report",
      "Identity and address proof",
      "Category certificate (for SC/ST)",
      "Educational qualification proof",
      "Experience certificate if any",
    ],
    instructions: [
      "Prepare detailed project report",
      "Apply through designated bank branch",
      "Attend bank interview",
      "Complete loan formalities",
      "Receive funds and start enterprise",
    ],
    isEligible: false,
    ineligibilityReason: "Not applicable for your demographic profile.",
  },
];
