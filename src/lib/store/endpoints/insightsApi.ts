import { marketGaps, painPoints, risks, scoreBreakdown } from "@/data";
import { api } from "../api";

export type ScoreBreakdown = typeof scoreBreakdown;
export type PainPoint = (typeof painPoints)[number];
export type MarketGap = (typeof marketGaps)[number];
export type Risk = (typeof risks)[number];

export const insightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getScoreBreakdown: builder.query<ScoreBreakdown, void>({
      query: () => "/api/score-breakdown",
      providesTags: [{ type: "ScoreBreakdown", id: "SINGLE" }],
    }),
    getPainPoints: builder.query<PainPoint[], void>({
      query: () => "/api/pain-points",
      providesTags: [{ type: "PainPoints", id: "LIST" }],
    }),
    getMarketGaps: builder.query<MarketGap[], void>({
      query: () => "/api/market-gaps",
      providesTags: [{ type: "MarketGaps", id: "LIST" }],
    }),
    getRisks: builder.query<Risk[], void>({
      query: () => "/api/risks",
      providesTags: [{ type: "Risks", id: "LIST" }],
    }),
  }),
});

export const {
  useGetScoreBreakdownQuery,
  useGetPainPointsQuery,
  useGetMarketGapsQuery,
  useGetRisksQuery,
} = insightsApi;
