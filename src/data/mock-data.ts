export interface IdeaReport {
  id: string;
  title: string;
  description: string;
  status: 'processing' | 'completed' | 'failed';
  opportunityScore: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  targetAudience?: string;
  industry?: string;
  geography?: string;
  businessModel?: string;
  keywords?: string[];
}

export interface Competitor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  type: 'direct' | 'indirect';
  pricingModel: string;
  pricingSummary: string;
  targetAudience: string;
  features: string[];
  strengths: string[];
  weaknesses: string[];
  relevanceScore: number;
  marketSegment: string;
}

export const mockReports: IdeaReport[] = [
  {
    id: '1',
    title: 'AI Inventory Forecasting for Restaurants',
    description: 'An AI-powered tool that helps restaurants predict inventory needs and reduce food waste by analyzing historical sales data, weather patterns, and local events.',
    status: 'completed',
    opportunityScore: 82,
    category: 'FoodTech / AI',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    targetAudience: 'Restaurant owners & managers',
    industry: 'Food & Beverage',
    geography: 'North America',
    businessModel: 'SaaS Subscription',
    keywords: ['AI', 'inventory', 'food waste', 'restaurants', 'forecasting'],
  },
  {
    id: '2',
    title: 'Freelancer Tax Automation Platform',
    description: 'A platform that automatically categorizes freelancer expenses, estimates quarterly taxes, and files returns with one click.',
    status: 'completed',
    opportunityScore: 74,
    category: 'FinTech',
    createdAt: '2024-03-12',
    updatedAt: '2024-03-13',
    targetAudience: 'Freelancers & independent contractors',
    industry: 'Financial Services',
    geography: 'United States',
    businessModel: 'Freemium',
    keywords: ['tax', 'freelancer', 'automation', 'fintech'],
  },
  {
    id: '3',
    title: 'Pet Health Monitoring Wearable',
    description: 'A smart collar that monitors pet vital signs and activity levels, alerting owners to potential health issues before they become serious.',
    status: 'processing',
    opportunityScore: 0,
    category: 'PetTech / IoT',
    createdAt: '2024-03-18',
    updatedAt: '2024-03-18',
    targetAudience: 'Pet owners',
    industry: 'Pet Care',
    geography: 'Global',
    businessModel: 'Hardware + Subscription',
    keywords: ['pet', 'health', 'IoT', 'wearable', 'monitoring'],
  },
  {
    id: '4',
    title: 'AI-Powered Resume Tailoring Tool',
    description: 'An AI tool that automatically tailors resumes and cover letters to specific job postings, optimizing for ATS systems.',
    status: 'completed',
    opportunityScore: 65,
    category: 'HRTech / AI',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-11',
    targetAudience: 'Job seekers',
    industry: 'Human Resources',
    geography: 'Global',
    businessModel: 'Freemium',
    keywords: ['resume', 'AI', 'job search', 'ATS', 'career'],
  },
  {
    id: '5',
    title: 'Micro-Learning Platform for Trades',
    description: 'A mobile-first learning platform offering bite-sized courses for skilled trades workers, from plumbing to electrical work.',
    status: 'failed',
    opportunityScore: 0,
    category: 'EdTech',
    createdAt: '2024-03-08',
    updatedAt: '2024-03-09',
    targetAudience: 'Trade professionals & apprentices',
    industry: 'Education',
    geography: 'North America',
    businessModel: 'Subscription',
    keywords: ['education', 'trades', 'micro-learning', 'mobile'],
  },
];

export const mockCompetitors: Competitor[] = [
  {
    id: 'c1',
    name: 'WasteNot AI',
    logo: '🟢',
    website: 'https://wastenot.ai',
    description: 'AI-powered food waste reduction platform for commercial kitchens and restaurants.',
    type: 'direct',
    pricingModel: 'SaaS Subscription',
    pricingSummary: '$149–$499/mo',
    targetAudience: 'Restaurant chains & commercial kitchens',
    features: ['Inventory tracking', 'Waste analytics', 'Demand forecasting', 'Supplier integration'],
    strengths: ['Strong brand in restaurant space', 'Established customer base', 'Good integrations'],
    weaknesses: ['High pricing for small restaurants', 'No weather-based forecasting', 'Complex onboarding'],
    relevanceScore: 92,
    marketSegment: 'Enterprise restaurants',
  },
  {
    id: 'c2',
    name: 'FreshTrack',
    logo: '🔵',
    website: 'https://freshtrack.io',
    description: 'Smart inventory management for fresh food businesses with real-time tracking and automated ordering.',
    type: 'direct',
    pricingModel: 'Tiered SaaS',
    pricingSummary: '$79–$299/mo',
    targetAudience: 'SMB restaurants & grocery stores',
    features: ['Real-time inventory', 'Auto-ordering', 'Expiry tracking', 'Mobile app'],
    strengths: ['Affordable pricing', 'Easy to use', 'Good mobile experience'],
    weaknesses: ['Limited AI capabilities', 'No predictive analytics', 'Basic reporting'],
    relevanceScore: 85,
    marketSegment: 'SMB food service',
  },
  {
    id: 'c3',
    name: 'KitchenIQ',
    logo: '🟣',
    website: 'https://kitcheniq.com',
    description: 'All-in-one kitchen management suite including staff scheduling, inventory, and menu planning.',
    type: 'indirect',
    pricingModel: 'Per-location pricing',
    pricingSummary: '$199–$799/mo per location',
    targetAudience: 'Multi-location restaurant groups',
    features: ['Staff scheduling', 'Menu costing', 'Inventory management', 'Analytics dashboard'],
    strengths: ['Comprehensive solution', 'Enterprise features', 'Strong analytics'],
    weaknesses: ['Expensive', 'Feature bloat', 'Slow product updates'],
    relevanceScore: 72,
    marketSegment: 'Enterprise food service',
  },
  {
    id: 'c4',
    name: 'GreenBite',
    logo: '🟡',
    website: 'https://greenbite.co',
    description: 'Sustainability-focused food waste tracking with environmental impact reporting for restaurants.',
    type: 'indirect',
    pricingModel: 'Freemium',
    pricingSummary: 'Free–$129/mo',
    targetAudience: 'Eco-conscious restaurants',
    features: ['Waste tracking', 'Environmental reports', 'Sustainability badges', 'Donation matching'],
    strengths: ['Free tier available', 'Sustainability angle', 'Good PR value'],
    weaknesses: ['Limited forecasting', 'No inventory management', 'Small team'],
    relevanceScore: 64,
    marketSegment: 'Sustainability-focused',
  },
  {
    id: 'c5',
    name: 'OrderFlow',
    logo: '🔴',
    website: 'https://orderflow.app',
    description: 'Restaurant supply chain optimization platform with AI-powered ordering recommendations.',
    type: 'indirect',
    pricingModel: 'Transaction-based',
    pricingSummary: '1.5% per order + $49/mo base',
    targetAudience: 'Independent restaurants',
    features: ['Smart ordering', 'Supplier comparison', 'Cost optimization', 'Delivery tracking'],
    strengths: ['Low base cost', 'Good supplier network', 'Cost savings focus'],
    weaknesses: ['Transaction fees add up', 'Limited waste features', 'US-only'],
    relevanceScore: 58,
    marketSegment: 'Supply chain',
  },
];

export const scoreBreakdown = {
  demand: 85,
  competition: 72,
  painPoint: 88,
  differentiation: 78,
  monetization: 80,
};

export const painPoints = [
  { point: 'Manual inventory counting is time-consuming and error-prone', frequency: 'Very High', severity: 'High', quote: '"I spend 3 hours every morning counting stock. It\'s insane."' },
  { point: 'Unpredictable demand leads to over-ordering and waste', frequency: 'High', severity: 'High', quote: '"We throw away $2,000+ of food every week during slow periods."' },
  { point: 'No integration between POS and inventory systems', frequency: 'High', severity: 'Medium', quote: '"Our POS and inventory don\'t talk to each other. Everything is double-entry."' },
  { point: 'Seasonal variations catch managers off-guard', frequency: 'Medium', severity: 'High', quote: '"Every holiday season, we either run out of key items or waste tons of fresh produce."' },
  { point: 'Difficulty tracking expiry dates across multiple suppliers', frequency: 'Medium', severity: 'Medium', quote: '"We found expired ingredients in the walk-in three times last month."' },
];

export const marketGaps = [
  { gap: 'Weather-aware demand forecasting', description: 'No competitor uses local weather data to adjust inventory predictions' },
  { gap: 'Event-based demand spikes', description: 'Local events, sports games, and holidays are not factored into current solutions' },
  { gap: 'Small restaurant affordability', description: 'Most solutions are priced for chains; independent restaurants are underserved' },
  { gap: 'Multi-supplier price optimization', description: 'No tool compares prices across suppliers to recommend cheapest sourcing' },
];

export const risks = [
  { risk: 'High competition from established players', level: 'High', description: 'Several well-funded competitors already serve this market' },
  { risk: 'Restaurant tech adoption is slow', level: 'Medium', description: 'Many restaurants still rely on pen-and-paper inventory methods' },
  { risk: 'Data quality depends on POS integration', level: 'Medium', description: 'Accuracy of predictions relies on clean historical sales data' },
  { risk: 'High customer acquisition cost', level: 'Medium', description: 'Restaurant owners are hard to reach and convert through digital channels' },
];
