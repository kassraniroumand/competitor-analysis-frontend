"""Single-file FastAPI server that mirrors src/data/mock-data.ts.

Run:
    pip install "fastapi[standard]"
    fastapi dev api.py
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="IdeaSpark Mock Data API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------
# Data — keys kept in camelCase to match the TS IdeaReport / Competitor shape
# so the JSON payloads are drop-in equivalents of src/data/mock-data.ts
# --------------------------------------------------------------------------

mock_reports = [
    {
        "id": "1",
        "title": "AI Inventory Forecasting for Restaurants",
        "description": "An AI-powered tool that helps restaurants predict inventory needs and reduce food waste by analyzing historical sales data, weather patterns, and local events.",
        "status": "completed",
        "opportunityScore": 82,
        "category": "FoodTech / AI",
        "createdAt": "2024-03-15",
        "updatedAt": "2024-03-15",
        "targetAudience": "Restaurant owners & managers",
        "industry": "Food & Beverage",
        "geography": "North America",
        "businessModel": "SaaS Subscription",
        "keywords": ["AI", "inventory", "food waste", "restaurants", "forecasting"],
    },
    {
        "id": "2",
        "title": "Freelancer Tax Automation Platform",
        "description": "A platform that automatically categorizes freelancer expenses, estimates quarterly taxes, and files returns with one click.",
        "status": "completed",
        "opportunityScore": 74,
        "category": "FinTech",
        "createdAt": "2024-03-12",
        "updatedAt": "2024-03-13",
        "targetAudience": "Freelancers & independent contractors",
        "industry": "Financial Services",
        "geography": "United States",
        "businessModel": "Freemium",
        "keywords": ["tax", "freelancer", "automation", "fintech"],
    },
    {
        "id": "3",
        "title": "Pet Health Monitoring Wearable",
        "description": "A smart collar that monitors pet vital signs and activity levels, alerting owners to potential health issues before they become serious.",
        "status": "processing",
        "opportunityScore": 0,
        "category": "PetTech / IoT",
        "createdAt": "2024-03-18",
        "updatedAt": "2024-03-18",
        "targetAudience": "Pet owners",
        "industry": "Pet Care",
        "geography": "Global",
        "businessModel": "Hardware + Subscription",
        "keywords": ["pet", "health", "IoT", "wearable", "monitoring"],
    },
    {
        "id": "4",
        "title": "AI-Powered Resume Tailoring Tool",
        "description": "An AI tool that automatically tailors resumes and cover letters to specific job postings, optimizing for ATS systems.",
        "status": "completed",
        "opportunityScore": 65,
        "category": "HRTech / AI",
        "createdAt": "2024-03-10",
        "updatedAt": "2024-03-11",
        "targetAudience": "Job seekers",
        "industry": "Human Resources",
        "geography": "Global",
        "businessModel": "Freemium",
        "keywords": ["resume", "AI", "job search", "ATS", "career"],
    },
    {
        "id": "5",
        "title": "Micro-Learning Platform for Trades",
        "description": "A mobile-first learning platform offering bite-sized courses for skilled trades workers, from plumbing to electrical work.",
        "status": "failed",
        "opportunityScore": 0,
        "category": "EdTech",
        "createdAt": "2024-03-08",
        "updatedAt": "2024-03-09",
        "targetAudience": "Trade professionals & apprentices",
        "industry": "Education",
        "geography": "North America",
        "businessModel": "Subscription",
        "keywords": ["education", "trades", "micro-learning", "mobile"],
    },
]


mock_competitors = [
    # Idea 1: AI Inventory Forecasting for Restaurants
    {
        "id": "c1", "ideaId": "1", "name": "WasteNot AI", "logo": "🟢", "website": "https://wastenot.ai",
        "description": "AI-powered food waste reduction platform for commercial kitchens and restaurants.",
        "type": "direct", "pricingModel": "SaaS Subscription", "pricingSummary": "$149–$499/mo",
        "targetAudience": "Restaurant chains & commercial kitchens",
        "features": ["Inventory tracking", "Waste analytics", "Demand forecasting", "Supplier integration"],
        "strengths": ["Strong brand in restaurant space", "Established customer base", "Good integrations"],
        "weaknesses": ["High pricing for small restaurants", "No weather-based forecasting", "Complex onboarding"],
        "relevanceScore": 92, "marketSegment": "Enterprise restaurants",
    },
    {
        "id": "c2", "ideaId": "1", "name": "FreshTrack", "logo": "🔵", "website": "https://freshtrack.io",
        "description": "Smart inventory management for fresh food businesses with real-time tracking and automated ordering.",
        "type": "direct", "pricingModel": "Tiered SaaS", "pricingSummary": "$79–$299/mo",
        "targetAudience": "SMB restaurants & grocery stores",
        "features": ["Real-time inventory", "Auto-ordering", "Expiry tracking", "Mobile app"],
        "strengths": ["Affordable pricing", "Easy to use", "Good mobile experience"],
        "weaknesses": ["Limited AI capabilities", "No predictive analytics", "Basic reporting"],
        "relevanceScore": 85, "marketSegment": "SMB food service",
    },
    {
        "id": "c3", "ideaId": "1", "name": "KitchenIQ", "logo": "🟣", "website": "https://kitcheniq.com",
        "description": "All-in-one kitchen management suite including staff scheduling, inventory, and menu planning.",
        "type": "indirect", "pricingModel": "Per-location pricing", "pricingSummary": "$199–$799/mo per location",
        "targetAudience": "Multi-location restaurant groups",
        "features": ["Staff scheduling", "Menu costing", "Inventory management", "Analytics dashboard"],
        "strengths": ["Comprehensive solution", "Enterprise features", "Strong analytics"],
        "weaknesses": ["Expensive", "Feature bloat", "Slow product updates"],
        "relevanceScore": 72, "marketSegment": "Enterprise food service",
    },
    {
        "id": "c4", "ideaId": "1", "name": "GreenBite", "logo": "🟡", "website": "https://greenbite.co",
        "description": "Sustainability-focused food waste tracking with environmental impact reporting for restaurants.",
        "type": "indirect", "pricingModel": "Freemium", "pricingSummary": "Free–$129/mo",
        "targetAudience": "Eco-conscious restaurants",
        "features": ["Waste tracking", "Environmental reports", "Sustainability badges", "Donation matching"],
        "strengths": ["Free tier available", "Sustainability angle", "Good PR value"],
        "weaknesses": ["Limited forecasting", "No inventory management", "Small team"],
        "relevanceScore": 64, "marketSegment": "Sustainability-focused",
    },
    {
        "id": "c5", "ideaId": "1", "name": "OrderFlow", "logo": "🔴", "website": "https://orderflow.app",
        "description": "Restaurant supply chain optimization platform with AI-powered ordering recommendations.",
        "type": "indirect", "pricingModel": "Transaction-based", "pricingSummary": "1.5% per order + $49/mo base",
        "targetAudience": "Independent restaurants",
        "features": ["Smart ordering", "Supplier comparison", "Cost optimization", "Delivery tracking"],
        "strengths": ["Low base cost", "Good supplier network", "Cost savings focus"],
        "weaknesses": ["Transaction fees add up", "Limited waste features", "US-only"],
        "relevanceScore": 58, "marketSegment": "Supply chain",
    },
    # Idea 2: Freelancer Tax Automation Platform
    {
        "id": "c6", "ideaId": "2", "name": "TurboTax Self-Employed", "logo": "💙", "website": "https://turbotax.com",
        "description": "Tax filing software with features tailored for freelancers and self-employed workers.",
        "type": "direct", "pricingModel": "Annual License", "pricingSummary": "$119–$219/yr",
        "targetAudience": "Freelancers & self-employed",
        "features": ["Expense categorization", "Quarterly estimates", "Tax filing", "Audit support"],
        "strengths": ["Massive brand trust", "Comprehensive tax coverage", "IRS integration"],
        "weaknesses": ["Expensive for basic needs", "Upsells aggressively", "Not real-time"],
        "relevanceScore": 90, "marketSegment": "Consumer tax",
    },
    {
        "id": "c7", "ideaId": "2", "name": "Keeper Tax", "logo": "💚", "website": "https://keepertax.com",
        "description": "AI-powered tax write-off finder for freelancers that scans bank statements automatically.",
        "type": "direct", "pricingModel": "SaaS Subscription", "pricingSummary": "$16/mo or $192/yr",
        "targetAudience": "Freelancers & gig workers",
        "features": ["Auto write-off detection", "Bank sync", "Tax filing", "CPA review"],
        "strengths": ["Very affordable", "Great UX", "Automatic deduction finding"],
        "weaknesses": ["Limited to US", "No invoicing", "Basic reporting"],
        "relevanceScore": 88, "marketSegment": "Freelancer finance",
    },
    {
        "id": "c8", "ideaId": "2", "name": "Bench", "logo": "🧡", "website": "https://bench.co",
        "description": "Online bookkeeping service combining software with human bookkeepers for small businesses.",
        "type": "indirect", "pricingModel": "Monthly Retainer", "pricingSummary": "$299–$499/mo",
        "targetAudience": "Small business owners",
        "features": ["Bookkeeping", "Financial reports", "Tax prep", "Dedicated bookkeeper"],
        "strengths": ["Human + software approach", "Accurate books", "Year-end tax ready"],
        "weaknesses": ["Expensive for solopreneurs", "Slow turnaround", "Not self-service"],
        "relevanceScore": 65, "marketSegment": "SMB bookkeeping",
    },
    # Idea 4: AI-Powered Resume Tailoring Tool
    {
        "id": "c9", "ideaId": "4", "name": "Jobscan", "logo": "🟠", "website": "https://jobscan.co",
        "description": "Resume optimization tool that matches your resume against job descriptions for ATS compatibility.",
        "type": "direct", "pricingModel": "Freemium", "pricingSummary": "Free–$49.95/mo",
        "targetAudience": "Job seekers",
        "features": ["ATS matching", "Resume scoring", "LinkedIn optimization", "Cover letter builder"],
        "strengths": ["Strong ATS expertise", "Detailed match reports", "LinkedIn integration"],
        "weaknesses": ["Limited free tier", "No AI rewriting", "Dated UI"],
        "relevanceScore": 91, "marketSegment": "Job search tools",
    },
    {
        "id": "c10", "ideaId": "4", "name": "Teal", "logo": "🩵", "website": "https://tealhq.com",
        "description": "All-in-one job search platform with resume builder, job tracker, and AI-powered tools.",
        "type": "direct", "pricingModel": "Freemium", "pricingSummary": "Free–$29/mo",
        "targetAudience": "Active job seekers",
        "features": ["Resume builder", "Job tracker", "AI resume tailoring", "Chrome extension"],
        "strengths": ["Great free tier", "Modern UX", "Job tracking included"],
        "weaknesses": ["New player", "Limited cover letter", "US-focused"],
        "relevanceScore": 84, "marketSegment": "Job search tools",
    },
    {
        "id": "c11", "ideaId": "4", "name": "Resume Worded", "logo": "📝", "website": "https://resumeworded.com",
        "description": "AI-powered platform that scores and improves resumes and LinkedIn profiles.",
        "type": "indirect", "pricingModel": "Freemium", "pricingSummary": "Free–$19/mo",
        "targetAudience": "Professionals & students",
        "features": ["Resume scoring", "LinkedIn review", "Sample bullets", "Targeted resume"],
        "strengths": ["Affordable", "Good feedback quality", "LinkedIn focus"],
        "weaknesses": ["No full rewrite", "Limited customization", "Generic suggestions"],
        "relevanceScore": 70, "marketSegment": "Career development",
    },
]


score_breakdown = {
    "demand": 85,
    "competition": 72,
    "painPoint": 88,
    "differentiation": 78,
    "monetization": 80,
}


pain_points = [
    {"point": "Manual inventory counting is time-consuming and error-prone", "frequency": "Very High", "severity": "High", "quote": "\"I spend 3 hours every morning counting stock. It's insane.\""},
    {"point": "Unpredictable demand leads to over-ordering and waste", "frequency": "High", "severity": "High", "quote": "\"We throw away $2,000+ of food every week during slow periods.\""},
    {"point": "No integration between POS and inventory systems", "frequency": "High", "severity": "Medium", "quote": "\"Our POS and inventory don't talk to each other. Everything is double-entry.\""},
    {"point": "Seasonal variations catch managers off-guard", "frequency": "Medium", "severity": "High", "quote": "\"Every holiday season, we either run out of key items or waste tons of fresh produce.\""},
    {"point": "Difficulty tracking expiry dates across multiple suppliers", "frequency": "Medium", "severity": "Medium", "quote": "\"We found expired ingredients in the walk-in three times last month.\""},
]


market_gaps = [
    {"gap": "Weather-aware demand forecasting", "description": "No competitor uses local weather data to adjust inventory predictions"},
    {"gap": "Event-based demand spikes", "description": "Local events, sports games, and holidays are not factored into current solutions"},
    {"gap": "Small restaurant affordability", "description": "Most solutions are priced for chains; independent restaurants are underserved"},
    {"gap": "Multi-supplier price optimization", "description": "No tool compares prices across suppliers to recommend cheapest sourcing"},
]


risks = [
    {"risk": "High competition from established players", "level": "High", "description": "Several well-funded competitors already serve this market"},
    {"risk": "Restaurant tech adoption is slow", "level": "Medium", "description": "Many restaurants still rely on pen-and-paper inventory methods"},
    {"risk": "Data quality depends on POS integration", "level": "Medium", "description": "Accuracy of predictions relies on clean historical sales data"},
    {"risk": "High customer acquisition cost", "level": "Medium", "description": "Restaurant owners are hard to reach and convert through digital channels"},
]


# --------------------------------------------------------------------------
# Endpoints
# --------------------------------------------------------------------------

@app.get("/api/ideas")
def list_ideas(
    status: str | None = Query(None, description="Filter by status: processing | completed | failed"),
    category: str | None = None,
):
    result = mock_reports
    if status:
        result = [r for r in result if r["status"] == status]
    if category:
        result = [r for r in result if r["category"] == category]
    return result


@app.get("/api/ideas/{idea_id}")
def get_idea(idea_id: str):
    for r in mock_reports:
        if r["id"] == idea_id:
            return r
    raise HTTPException(status_code=404, detail=f"Idea {idea_id} not found")


@app.get("/api/ideas/{idea_id}/competitors")
def list_competitors_for_idea(idea_id: str):
    if not any(r["id"] == idea_id for r in mock_reports):
        raise HTTPException(status_code=404, detail=f"Idea {idea_id} not found")
    return [c for c in mock_competitors if c["ideaId"] == idea_id]


@app.get("/api/competitors")
def list_competitors(
    ideaId: str | None = Query(None, description="Filter by ideaId"),
    type: str | None = Query(None, description="Filter by type: direct | indirect"),
):
    result = mock_competitors
    if ideaId:
        result = [c for c in result if c["ideaId"] == ideaId]
    if type:
        result = [c for c in result if c["type"] == type]
    return result


@app.get("/api/competitors/{competitor_id}")
def get_competitor(competitor_id: str):
    for c in mock_competitors:
        if c["id"] == competitor_id:
            return c
    raise HTTPException(status_code=404, detail=f"Competitor {competitor_id} not found")


@app.get("/api/score-breakdown")
def get_score_breakdown():
    return score_breakdown


@app.get("/api/pain-points")
def get_pain_points():
    return pain_points


@app.get("/api/market-gaps")
def get_market_gaps():
    return market_gaps


@app.get("/api/risks")
def get_risks():
    return risks


@app.get("/health")
def health():
    return {"status": "ok"}
