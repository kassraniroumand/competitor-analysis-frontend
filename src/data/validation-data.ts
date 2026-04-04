export interface ValidationData {
  ideaId: string;
  searchDemand: {
    score: number;
    verdict: 'Strong' | 'Moderate' | 'Weak';
    summary: string;
    keywords: { term: string; volume: number; trend: 'up' | 'down' | 'stable'; competition: 'Low' | 'Medium' | 'High' }[];
    trendData: { month: string; volume: number }[];
  };
  communityInterest: {
    score: number;
    redditMentions: number;
    twitterMentions: number;
    forumThreads: number;
    sentiment: 'Positive' | 'Mixed' | 'Negative';
    topPlatforms: { name: string; mentions: number; sentiment: string }[];
  };
  marketSize: {
    tam: string;
    sam: string;
    som: string;
    growthRate: string;
    notes: string[];
  };
  verdict: {
    score: number;
    label: 'Highly Validated' | 'Validated' | 'Needs More Data' | 'Weak Signal';
    summary: string;
    recommendations: string[];
  };
}

export const mockValidation: ValidationData[] = [
  {
    ideaId: '1',
    searchDemand: {
      score: 85,
      verdict: 'Strong',
      summary: 'High and growing search interest in AI inventory tools for restaurants. Keywords show consistent upward trend over 12 months.',
      keywords: [
        { term: 'restaurant inventory software', volume: 12400, trend: 'up', competition: 'Medium' },
        { term: 'food waste management AI', volume: 4800, trend: 'up', competition: 'Low' },
        { term: 'inventory forecasting restaurant', volume: 3200, trend: 'up', competition: 'Low' },
        { term: 'restaurant demand prediction', volume: 1900, trend: 'stable', competition: 'Low' },
        { term: 'reduce food waste technology', volume: 8100, trend: 'up', competition: 'Medium' },
        { term: 'smart kitchen inventory', volume: 2600, trend: 'up', competition: 'Low' },
      ],
      trendData: [
        { month: 'Apr', volume: 6200 }, { month: 'May', volume: 6800 },
        { month: 'Jun', volume: 7400 }, { month: 'Jul', volume: 7100 },
        { month: 'Aug', volume: 8200 }, { month: 'Sep', volume: 8900 },
        { month: 'Oct', volume: 9400 }, { month: 'Nov', volume: 10200 },
        { month: 'Dec', volume: 9800 }, { month: 'Jan', volume: 11000 },
        { month: 'Feb', volume: 11800 }, { month: 'Mar', volume: 12400 },
      ],
    },
    communityInterest: {
      score: 78,
      redditMentions: 342,
      twitterMentions: 1280,
      forumThreads: 67,
      sentiment: 'Positive',
      topPlatforms: [
        { name: 'Reddit r/restaurantowners', mentions: 189, sentiment: 'Very Positive' },
        { name: 'Twitter/X', mentions: 1280, sentiment: 'Positive' },
        { name: 'Restaurant Owner Forum', mentions: 67, sentiment: 'Positive' },
        { name: 'LinkedIn Groups', mentions: 94, sentiment: 'Mixed' },
      ],
    },
    marketSize: {
      tam: '$4.2B',
      sam: '$1.1B',
      som: '$85M',
      growthRate: '14.3% CAGR',
      notes: [
        'Restaurant tech market growing rapidly post-pandemic',
        'Food waste regulations driving adoption in EU and parts of US',
        'SMB segment largely underserved — opportunity for affordable solutions',
        'AI/ML adoption in food service still early — first-mover advantage possible',
      ],
    },
    verdict: {
      score: 82,
      label: 'Highly Validated',
      summary: 'Strong demand signals across search, community, and market data. The combination of growing keyword volume, positive community sentiment, and a large addressable market makes this a well-validated opportunity.',
      recommendations: [
        'Focus on the SMB restaurant segment for initial launch',
        'Emphasize weather-aware forecasting as key differentiator',
        'Build integrations with popular POS systems early',
        'Consider a freemium tier to accelerate adoption',
      ],
    },
  },
  {
    ideaId: '2',
    searchDemand: {
      score: 74,
      verdict: 'Strong',
      summary: 'Solid search demand for freelancer tax tools. Seasonal spikes around tax season with steady baseline interest.',
      keywords: [
        { term: 'freelancer tax software', volume: 18200, trend: 'stable', competition: 'High' },
        { term: 'self employed tax calculator', volume: 14500, trend: 'up', competition: 'High' },
        { term: 'quarterly tax estimates freelancer', volume: 6700, trend: 'up', competition: 'Medium' },
        { term: 'automatic expense categorization', volume: 3400, trend: 'up', competition: 'Low' },
        { term: '1099 tax filing app', volume: 9800, trend: 'stable', competition: 'Medium' },
      ],
      trendData: [
        { month: 'Apr', volume: 22000 }, { month: 'May', volume: 8400 },
        { month: 'Jun', volume: 7200 }, { month: 'Jul', volume: 6800 },
        { month: 'Aug', volume: 7100 }, { month: 'Sep', volume: 8900 },
        { month: 'Oct', volume: 10200 }, { month: 'Nov', volume: 9400 },
        { month: 'Dec', volume: 11800 }, { month: 'Jan', volume: 18500 },
        { month: 'Feb', volume: 16200 }, { month: 'Mar', volume: 19800 },
      ],
    },
    communityInterest: {
      score: 71,
      redditMentions: 528,
      twitterMentions: 890,
      forumThreads: 112,
      sentiment: 'Positive',
      topPlatforms: [
        { name: 'Reddit r/freelance', mentions: 312, sentiment: 'Positive' },
        { name: 'Reddit r/personalfinance', mentions: 216, sentiment: 'Mixed' },
        { name: 'Twitter/X', mentions: 890, sentiment: 'Positive' },
        { name: 'Freelancer Forums', mentions: 112, sentiment: 'Positive' },
      ],
    },
    marketSize: {
      tam: '$8.7B',
      sam: '$2.3B',
      som: '$120M',
      growthRate: '11.2% CAGR',
      notes: [
        'Freelance workforce growing 3x faster than traditional employment',
        'Existing solutions are either too expensive or too basic',
        'Strong lock-in potential once users trust a tax tool with their data',
        'Regulatory complexity creates barriers but also moats',
      ],
    },
    verdict: {
      score: 74,
      label: 'Validated',
      summary: 'Good demand validated by search volume and growing freelancer population. Competitive landscape is crowded but there\'s room for a simpler, more automated approach.',
      recommendations: [
        'Differentiate with real-time expense tracking and one-click filing',
        'Target new freelancers who find existing tools overwhelming',
        'Partner with freelance platforms for distribution',
        'Launch before Q1 tax season for maximum impact',
      ],
    },
  },
  {
    ideaId: '4',
    searchDemand: {
      score: 79,
      verdict: 'Strong',
      summary: 'Very high search volume for resume tools. AI-powered tailoring is a growing sub-segment with lower competition.',
      keywords: [
        { term: 'AI resume builder', volume: 22100, trend: 'up', competition: 'High' },
        { term: 'tailor resume to job description', volume: 9800, trend: 'up', competition: 'Medium' },
        { term: 'ATS resume optimizer', volume: 7400, trend: 'up', competition: 'Medium' },
        { term: 'AI cover letter generator', volume: 12600, trend: 'up', competition: 'Medium' },
        { term: 'resume keyword scanner', volume: 5200, trend: 'stable', competition: 'Low' },
      ],
      trendData: [
        { month: 'Apr', volume: 14200 }, { month: 'May', volume: 15800 },
        { month: 'Jun', volume: 16400 }, { month: 'Jul', volume: 15100 },
        { month: 'Aug', volume: 17200 }, { month: 'Sep', volume: 19800 },
        { month: 'Oct', volume: 18400 }, { month: 'Nov', volume: 16200 },
        { month: 'Dec', volume: 14800 }, { month: 'Jan', volume: 21000 },
        { month: 'Feb', volume: 19800 }, { month: 'Mar', volume: 22100 },
      ],
    },
    communityInterest: {
      score: 82,
      redditMentions: 890,
      twitterMentions: 2400,
      forumThreads: 156,
      sentiment: 'Positive',
      topPlatforms: [
        { name: 'Reddit r/jobs', mentions: 412, sentiment: 'Very Positive' },
        { name: 'Reddit r/resumes', mentions: 478, sentiment: 'Positive' },
        { name: 'Twitter/X', mentions: 2400, sentiment: 'Positive' },
        { name: 'LinkedIn', mentions: 320, sentiment: 'Mixed' },
      ],
    },
    marketSize: {
      tam: '$3.1B',
      sam: '$890M',
      som: '$65M',
      growthRate: '18.5% CAGR',
      notes: [
        'AI tools for job search are the fastest-growing segment in HR tech',
        'Gen Z and millennial job seekers expect AI-powered tools',
        'Freemium model works well — upsell on premium tailoring features',
        'B2B opportunity with career services at universities',
      ],
    },
    verdict: {
      score: 65,
      label: 'Validated',
      summary: 'Strong demand and community interest, but the market is getting crowded with AI resume tools. Differentiation through superior tailoring quality and ATS optimization is key.',
      recommendations: [
        'Focus on tailoring accuracy as the core differentiator',
        'Offer a generous free tier to build word-of-mouth',
        'Add LinkedIn profile optimization as a premium feature',
        'Consider B2B partnerships with universities and bootcamps',
      ],
    },
  },
];
