export interface PRDSection {
  number: string;
  title: string;
  subsections: PRDSubsection[];
}

export interface PRDSubsection {
  number: string;
  title: string;
  content?: string;
  items?: string[];
  keyValue?: { key: string; value: string }[];
  highlight?: { label: string; text: string };
}

export function generatePRDData(idea: {
  title: string;
  description: string;
  targetAudience?: string;
  industry?: string;
  geography?: string;
  businessModel?: string;
  keywords?: string[];
}): PRDSection[] {
  return [
    {
      number: "1",
      title: "Introduction & Overview",
      subsections: [
        {
          number: "1.1",
          title: "Project Name",
          content: idea.title,
        },
        {
          number: "1.2",
          title: "Executive Summary",
          content: idea.description,
        },
        {
          number: "1.3",
          title: "Problem Statement",
          content:
            "Restaurant owners currently rely on manual inventory counting, leading to significant food waste, over-ordering, and revenue loss. There is no affordable solution that uses predictive analytics combining weather, events, and historical data to forecast demand for small and mid-sized restaurants.",
        },
        {
          number: "1.4",
          title: "Vision & Goals",
          items: [
            "Become the go-to AI inventory tool for independent restaurants",
            "Reduce food waste by up to 40% for customers",
            "Achieve 15% month-over-month growth in active users within the first year",
            "Establish partnerships with at least 3 POS systems for seamless integration",
          ],
        },
      ],
    },
    {
      number: "2",
      title: "Business Case & Value Proposition",
      subsections: [
        {
          number: "2.1",
          title: "Target Audience",
          content: idea.targetAudience || "Not specified",
          keyValue: [
            { key: "Primary", value: "Independent restaurant owners & managers" },
            { key: "Secondary", value: "Small restaurant chains (2–10 locations)" },
            { key: "Geography", value: idea.geography || "Global" },
          ],
        },
        {
          number: "2.2",
          title: "Value Proposition",
          keyValue: [
            {
              key: "For Users",
              value:
                "Eliminate manual inventory guesswork, reduce food waste, and save thousands monthly with AI-driven demand forecasting.",
            },
            {
              key: "For Business",
              value:
                "Recurring SaaS revenue with high retention, strong network effects from supplier data, and expansion into adjacent verticals.",
            },
          ],
        },
        {
          number: "2.3",
          title: "Key Metrics & Success Measures",
          items: [
            "Monthly Active Users (MAU) and retention rate",
            "Average food waste reduction per customer (target: 30–40%)",
            "Customer Acquisition Cost (CAC) vs. Lifetime Value (LTV)",
            "Net Promoter Score (NPS) ≥ 50",
            "MRR growth rate (target: 15% MoM in first 12 months)",
          ],
        },
      ],
    },
    {
      number: "3",
      title: "Scope & Requirements",
      subsections: [
        {
          number: "3.1",
          title: "In-Scope Features (MVP)",
          items: [
            "AI-powered demand forecasting using historical sales data",
            "Weather-aware inventory predictions",
            "Local event calendar integration for demand spikes",
            "Dashboard with waste analytics and cost savings tracking",
            "Basic POS integration (Square, Toast)",
            "Mobile-friendly web application",
          ],
        },
        {
          number: "3.2",
          title: "Out-of-Scope (Future Phases)",
          items: [
            "Multi-supplier price comparison and auto-ordering",
            "Full native mobile app (iOS/Android)",
            "Multi-location chain management dashboard",
            "Sustainability reporting and carbon footprint tracking",
            "Integration with delivery platforms (DoorDash, Uber Eats)",
          ],
        },
        {
          number: "3.3",
          title: "User Stories",
          items: [
            "As a restaurant owner, I want to see predicted inventory needs for the next 7 days, so I can order accurately.",
            "As a kitchen manager, I want alerts when weather changes may affect demand, so I can adjust prep accordingly.",
            "As an owner, I want to track food waste reduction over time, so I can measure ROI on the tool.",
            "As a manager, I want automatic integration with my POS, so I don't have to manually enter sales data.",
          ],
        },
        {
          number: "3.4",
          title: "Non-Functional Requirements",
          items: [
            "Support 10,000+ concurrent users with <200ms API response times",
            "99.9% uptime SLA for prediction services",
            "All data encrypted at rest (AES-256) and in transit (TLS 1.3)",
            "WCAG 2.1 AA accessibility compliance",
            "GDPR and CCPA compliant data handling",
          ],
        },
      ],
    },
    {
      number: "4",
      title: "Design & User Experience",
      subsections: [
        {
          number: "4.1",
          title: "Key UX Principles",
          items: [
            "Simplicity first — restaurant staff have limited time for complex software",
            "Glanceable insights — key predictions visible within 3 seconds of opening the app",
            "Mobile-optimized — designed for use in kitchen environments on tablets and phones",
            "Trust through transparency — show how AI predictions are calculated",
          ],
        },
        {
          number: "4.2",
          title: "User Flows",
          items: [
            "Onboarding: Connect POS → Import historical data → First prediction in <5 minutes",
            "Daily use: Open dashboard → Review 7-day forecast → Adjust orders → Track waste savings",
            "Weekly: Review waste analytics report → Share with team → Adjust menu planning",
          ],
        },
      ],
    },
    {
      number: "5",
      title: "Technical Considerations",
      subsections: [
        {
          number: "5.1",
          title: "Technology Stack",
          keyValue: [
            { key: "Frontend", value: "React + TypeScript, Tailwind CSS, Vite" },
            { key: "Backend", value: "Node.js + PostgreSQL (Auth, Database, Serverless Functions)" },
            { key: "AI/ML", value: "Python (scikit-learn, Prophet) for forecasting models" },
            { key: "Data Sources", value: "OpenWeatherMap API, Google Events API, POS integrations" },
          ],
        },
        {
          number: "5.2",
          title: "Integrations",
          items: [
            "POS Systems: Square, Toast, Clover (Phase 1)",
            "Weather: OpenWeatherMap API for local forecasts",
            "Events: Google Calendar API, Eventbrite for local events",
            "Accounting: QuickBooks integration for cost tracking (Phase 2)",
          ],
        },
        {
          number: "5.3",
          title: "Risks & Mitigation",
          keyValue: [
            {
              key: "Low adoption",
              value: "Mitigation: Free trial + white-glove onboarding for first 50 customers",
            },
            {
              key: "Data quality issues",
              value: "Mitigation: Data validation pipeline + manual override options",
            },
            {
              key: "Competitor response",
              value: "Mitigation: Focus on weather+events differentiation, build moat with data",
            },
          ],
        },
      ],
    },
    {
      number: "6",
      title: "Go-to-Market Strategy",
      subsections: [
        {
          number: "6.1",
          title: "Launch Plan",
          items: [
            "Phase 1: Beta launch with 10 restaurants in one metro area",
            "Phase 2: Expand to 3 cities with referral program",
            "Phase 3: Public launch with content marketing and partnerships",
          ],
        },
        {
          number: "6.2",
          title: "Marketing & Communication",
          items: [
            "Content marketing: Blog posts on food waste reduction ROI",
            "Partnership with restaurant associations for credibility",
            "Case studies from beta users showing cost savings",
            "Targeted social media ads to restaurant owner communities",
          ],
        },
      ],
    },
    {
      number: "7",
      title: "Timeline & Resources",
      subsections: [
        {
          number: "7.1",
          title: "Key Milestones",
          keyValue: [
            { key: "Week 1–4", value: "Design complete, core architecture finalized" },
            { key: "Week 5–10", value: "MVP development (forecasting engine + dashboard)" },
            { key: "Week 11–12", value: "QA, testing, and beta onboarding" },
            { key: "Week 13–14", value: "Beta launch with 10 pilot restaurants" },
            { key: "Week 16–20", value: "Iterate based on feedback, expand to Phase 2" },
          ],
        },
        {
          number: "7.2",
          title: "Estimated Resources",
          keyValue: [
            { key: "Frontend", value: "2 developers" },
            { key: "Backend/ML", value: "2 developers" },
            { key: "Design", value: "1 UX designer (0.5 FTE)" },
            { key: "Product", value: "1 PM (0.5 FTE)" },
            { key: "QA", value: "1 QA engineer" },
          ],
        },
      ],
    },
  ];
}
