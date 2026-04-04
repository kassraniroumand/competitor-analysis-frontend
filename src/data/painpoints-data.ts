export interface PainPointData {
  id: string;
  ideaId: string;
  point: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  frequency: 'Very High' | 'High' | 'Medium' | 'Low';
  mentions: number;
  quotes: string[];
  workarounds: string[];
  featureRequests: string[];
}

export const mockPainPoints: PainPointData[] = [
  // Idea 1
  {
    id: 'p1', ideaId: '1',
    point: 'Manual inventory counting is time-consuming and error-prone',
    category: 'Operations',
    severity: 'Critical', frequency: 'Very High', mentions: 847,
    quotes: [
      '"I spend 3 hours every morning counting stock. It\'s insane."',
      '"We miscounted twice last week and ran out of chicken mid-service."',
      '"My staff hates inventory duty — it\'s the #1 reason people quit."',
    ],
    workarounds: ['Hiring extra staff for counting', 'Using paper clipboards and spreadsheets', 'Counting only once a week (leading to errors)'],
    featureRequests: ['Auto-count via barcode scanning', 'Real-time stock levels', 'Photo-based inventory capture'],
  },
  {
    id: 'p2', ideaId: '1',
    point: 'Unpredictable demand leads to over-ordering and waste',
    category: 'Forecasting',
    severity: 'Critical', frequency: 'High', mentions: 623,
    quotes: [
      '"We throw away $2,000+ of food every week during slow periods."',
      '"Nobody can predict how many covers we\'ll do on a random Tuesday."',
      '"I\'d pay anything for a tool that tells me what to order and when."',
    ],
    workarounds: ['Over-ordering as a safety buffer', 'Relying on gut instinct from experienced chefs', 'Running daily specials to use expiring items'],
    featureRequests: ['AI demand prediction', 'Weather-based ordering suggestions', 'Event calendar integration'],
  },
  {
    id: 'p3', ideaId: '1',
    point: 'No integration between POS and inventory systems',
    category: 'Integration',
    severity: 'High', frequency: 'High', mentions: 412,
    quotes: [
      '"Our POS and inventory don\'t talk to each other. Everything is double-entry."',
      '"I have three different systems that should be one."',
    ],
    workarounds: ['Manual data entry across systems', 'Using spreadsheets as a bridge', 'Hiring a part-time data entry person'],
    featureRequests: ['POS auto-sync', 'Universal API connector', 'Automatic stock deduction on sale'],
  },
  {
    id: 'p4', ideaId: '1',
    point: 'Seasonal variations catch managers off-guard',
    category: 'Planning',
    severity: 'High', frequency: 'Medium', mentions: 289,
    quotes: [
      '"Every holiday season, we either run out of key items or waste tons of fresh produce."',
      '"Summer is unpredictable — we don\'t know if patios will be packed or empty."',
    ],
    workarounds: ['Reviewing last year\'s notes manually', 'Asking neighboring businesses for trends', 'Stocking extra of everything "just in case"'],
    featureRequests: ['Seasonal trend analysis', 'Holiday planning mode', 'Local event awareness'],
  },
  {
    id: 'p5', ideaId: '1',
    point: 'Difficulty tracking expiry dates across multiple suppliers',
    category: 'Compliance',
    severity: 'Medium', frequency: 'Medium', mentions: 198,
    quotes: [
      '"We found expired ingredients in the walk-in three times last month."',
      '"Tracking expiry across 5 suppliers with different label formats is a nightmare."',
    ],
    workarounds: ['Color-coded sticker systems', 'First-in-first-out manual rotation', 'Weekly manual expiry checks'],
    featureRequests: ['Expiry date alerts', 'Supplier label scanning', 'FIFO automation'],
  },
  // Idea 2
  {
    id: 'p6', ideaId: '2',
    point: 'Categorizing expenses correctly is confusing and time-consuming',
    category: 'Expense Management',
    severity: 'Critical', frequency: 'Very High', mentions: 1240,
    quotes: [
      '"Is my home office internet a business expense? I never know."',
      '"I have a shoebox of receipts I haven\'t categorized in 6 months."',
      '"I missed $3,000 in deductions last year because I didn\'t know they counted."',
    ],
    workarounds: ['Saving every receipt in a folder and sorting at year-end', 'Paying an accountant $500+ to categorize', 'Guessing and hoping for the best'],
    featureRequests: ['Auto-categorization from bank feeds', 'Receipt photo scanning', 'Deduction suggestions based on profession'],
  },
  {
    id: 'p7', ideaId: '2',
    point: 'Quarterly tax estimates are stressful and often wrong',
    category: 'Tax Filing',
    severity: 'High', frequency: 'High', mentions: 890,
    quotes: [
      '"I never know how much to set aside for taxes each quarter."',
      '"Got hit with a penalty for underpaying my estimated taxes."',
    ],
    workarounds: ['Setting aside 30% of all income blindly', 'Paying an accountant quarterly', 'Filing annual and paying penalties'],
    featureRequests: ['Real-time tax liability tracker', 'Auto quarterly payment reminders', 'Safe harbor calculation'],
  },
  {
    id: 'p8', ideaId: '2',
    point: 'Tax software is designed for employees, not freelancers',
    category: 'Product Fit',
    severity: 'High', frequency: 'High', mentions: 672,
    quotes: [
      '"TurboTax makes me feel like a second-class citizen."',
      '"Every tax tool asks for a W-2 first. I don\'t have a W-2!"',
    ],
    workarounds: ['Using multiple tools together', 'Hiring a CPA specializing in freelancers', 'Filing on paper forms'],
    featureRequests: ['Freelancer-first onboarding', '1099 workflow optimization', 'Multi-client income tracking'],
  },
  // Idea 4
  {
    id: 'p9', ideaId: '4',
    point: 'Tailoring a resume for each job application takes too long',
    category: 'Productivity',
    severity: 'Critical', frequency: 'Very High', mentions: 2100,
    quotes: [
      '"I apply to 20 jobs a week. I can\'t customize my resume for each one."',
      '"I know I should tailor my resume but I just don\'t have the time."',
      '"It takes me 45 minutes to properly adjust my resume for one posting."',
    ],
    workarounds: ['Using one generic resume for all applications', 'Having 3-4 resume versions for different roles', 'Copying keywords manually from job descriptions'],
    featureRequests: ['One-click resume tailoring', 'Auto keyword matching', 'Bulk application support'],
  },
  {
    id: 'p10', ideaId: '4',
    point: 'ATS systems reject qualified candidates due to formatting',
    category: 'ATS Compatibility',
    severity: 'High', frequency: 'High', mentions: 1580,
    quotes: [
      '"I was perfect for the role but my resume never made it past the ATS."',
      '"I had no idea my PDF resume was being parsed incorrectly."',
    ],
    workarounds: ['Using plain text resumes', 'Removing all formatting and design', 'Applying through referrals to bypass ATS'],
    featureRequests: ['ATS compatibility checker', 'Format-safe templates', 'Parse preview tool'],
  },
  {
    id: 'p11', ideaId: '4',
    point: 'Cover letters feel generic and unhelpful',
    category: 'Content Quality',
    severity: 'Medium', frequency: 'High', mentions: 920,
    quotes: [
      '"I write the same cover letter every time and just change the company name."',
      '"Do hiring managers even read cover letters anymore?"',
    ],
    workarounds: ['Using a single template with find-and-replace', 'Skipping cover letters entirely', 'Paying someone on Fiverr to write them'],
    featureRequests: ['AI cover letter from job description', 'Tone matching to company culture', 'Portfolio integration'],
  },
];

export const complaintCategories = [
  { category: 'Operations', count: 1259, color: 'hsl(var(--primary))' },
  { category: 'Forecasting', count: 623, color: 'hsl(var(--chart-2))' },
  { category: 'Integration', count: 412, color: 'hsl(var(--chart-3))' },
  { category: 'Planning', count: 289, color: 'hsl(var(--chart-4))' },
  { category: 'Compliance', count: 198, color: 'hsl(var(--chart-5))' },
];
