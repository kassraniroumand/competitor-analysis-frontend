import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: [
    "Idea",
    "Competitor",
    "ScoreBreakdown",
    "PainPoints",
    "MarketGaps",
    "Risks",
  ],
  endpoints: () => ({}),
});
