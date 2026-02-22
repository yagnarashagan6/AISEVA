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
  isEligible?: boolean;
  deadline?: string;
}

export interface UserProfile {
  personalDetails: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    caste: string;
    religion: string;
    maritalStatus: string;
  };
  contactInfo: {
    mobileNumber: string;
    email: string;
    address: string;
    pincode: string;
    state: string;
    district: string;
  };
  familyIncome: {
    annualIncome: string;
    familySize: string;
    incomeSource: string;
    rationCardType: string;
  };
  educationEmployment: {
    education: string;
    employmentStatus: string;
    occupation: string;
  };
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName: string;
  };
}

export interface Notification {
  id: string;
  type: "new_scheme" | "deadline" | "update";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
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
      "Caste certificate",
      "Income certificate",
      "Mark sheets",
      "Aadhaar Card",
      "Bank passbook",
    ],
    instructions: [
      "Register on National Scholarship Portal",
      "Upload required documents",
      "Fill application form",
      "Submit before deadline",
      "Track status online",
    ],
    isEligible: true,
  },
  {
    id: "3",
    title: "Pradhan Mantri Awas Yojana - Gramin",
    description: "Housing assistance for rural poor",
    category: "Housing",
    location: "Rural Areas",
    ageMin: 18,
    ageMax: 70,
    benefits: "Financial assistance up to ₹1.20 lakh",
    fullDescription:
      "The Pradhan Mantri Awas Yojana (Gramin) aims to provide a pucca house with basic amenities to all houseless and those living in kutcha houses in rural areas by 2022.",
    eligibilityCriteria: [
      "Must be from rural area",
      "Houseless or living in kutcha house",
      "BPL family",
      "No pucca house owned by any family member",
    ],
    requiredDocuments: [
      "BPL card",
      "Aadhaar Card",
      "Income certificate",
      "Land documents",
      "Bank passbook",
    ],
    instructions: [
      "Apply through Gram Panchayat",
      "Get verification done",
      "Submit documents",
      "Wait for approval",
      "Start construction after approval",
    ],
    isEligible: false,
  },
  {
    id: "4",
    title: "Ayushman Bharat - PM-JAY",
    description: "Health insurance for poor families",
    category: "Healthcare",
    location: "All India",
    ageMin: 0,
    ageMax: 100,
    benefits: "Health coverage up to ₹5 lakhs per family per year",
    fullDescription:
      "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY) is the largest health assurance scheme in the world which provides health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization to over 10.74 crore poor and vulnerable families.",
    eligibilityCriteria: [
      "Family must be in SECC database",
      "Rural: Households with specific deprivation categories",
      "Urban: Occupational categories eligible",
      "No age limit",
    ],
    requiredDocuments: [
      "Ration Card",
      "Aadhaar Card",
      "SECC verification",
      "Identity proof",
    ],
    instructions: [
      "Check eligibility online",
      "Visit nearest hospital",
      "Get Ayushman card made",
      "Avail cashless treatment",
      "No premium payment required",
    ],
    isEligible: true,
    deadline: "2025-03-31",
  },
  {
    id: "5",
    title: "PM Mudra Loan Scheme",
    description: "Micro finance for small businesses",
    category: "Entrepreneurship",
    location: "All India",
    ageMin: 18,
    ageMax: 65,
    benefits: "Loan up to ₹10 lakhs for business",
    fullDescription:
      "Pradhan Mantri MUDRA Yojana (PMMY) is a scheme launched by the Hon'ble Prime Minister to provide loans up to 10 lakh to the non-corporate, non-farm small/micro enterprises.",
    eligibilityCriteria: [
      "Age between 18-65 years",
      "Valid business plan",
      "Good credit history",
      "Collateral free loan available",
    ],
    requiredDocuments: [
      "Business plan",
      "Identity proof",
      "Address proof",
      "Bank statements",
      "Project report",
    ],
    instructions: [
      "Visit nearest bank",
      "Submit application with documents",
      "Bank evaluation",
      "Loan approval",
      "Disbursement and monitoring",
    ],
    isEligible: undefined,
    deadline: "2025-06-30",
  },
  {
    id: "6",
    title: "Skill India - PMKVY",
    description: "Free skill development training",
    category: "Skill Development",
    location: "All India",
    ageMin: 18,
    ageMax: 45,
    benefits: "Free training and certification with monetary reward",
    fullDescription:
      "Pradhan Mantri Kaushal Vikas Yojana (PMKVY) is the flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE) implemented by National Skill Development Corporation (NSDC).",
    eligibilityCriteria: [
      "Age between 18-45 years",
      "Indian citizen",
      "Willing to undergo skill training",
      "Basic literacy preferred",
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Educational certificates",
      "Bank account details",
      "Passport size photos",
    ],
    instructions: [
      "Find training center near you",
      "Enroll for desired course",
      "Complete training successfully",
      "Appear for assessment",
      "Receive certificate and monetary reward",
    ],
    isEligible: true,
  },
];

export const defaultUserProfile: UserProfile = {
  personalDetails: {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    caste: "",
    religion: "",
    maritalStatus: "",
  },
  contactInfo: {
    mobileNumber: "",
    email: "",
    address: "",
    pincode: "",
    state: "",
    district: "",
  },
  familyIncome: {
    annualIncome: "",
    familySize: "",
    incomeSource: "",
    rationCardType: "",
  },
  educationEmployment: {
    education: "",
    employmentStatus: "",
    occupation: "",
  },
  bankDetails: {
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  },
};

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "new_scheme",
    title: "New Scheme Added",
    message:
      "PM Digital India Scheme has been added to your recommended schemes.",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
  },
  {
    id: "2",
    type: "deadline",
    title: "Application Deadline Approaching",
    message: "Only 7 days left to apply for Ayushman Bharat - PM-JAY scheme.",
    timestamp: "2024-01-14T14:45:00Z",
    read: false,
  },
  {
    id: "3",
    type: "update",
    title: "Profile Update Required",
    message:
      "Please update your income details to get better scheme recommendations.",
    timestamp: "2024-01-13T09:15:00Z",
    read: true,
  },
];
