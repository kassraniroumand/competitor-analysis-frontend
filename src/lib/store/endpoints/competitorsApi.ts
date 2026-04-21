import type { Competitor } from "@/data";
import { api } from "../api";

export interface ListCompetitorsParams {
  ideaId?: string;
  type?: "direct" | "indirect";
}

export const competitorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listCompetitors: builder.query<Competitor[], ListCompetitorsParams | void>({
      query: (params) => ({ url: "/api/competitors", params: params || {} }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Competitor" as const, id })),
              { type: "Competitor", id: "LIST" },
            ]
          : [{ type: "Competitor", id: "LIST" }],
    }),
    getCompetitor: builder.query<Competitor, string>({
      query: (competitorId) => `/api/competitors/${competitorId}`,
      providesTags: (_result, _error, competitorId) => [
        { type: "Competitor", id: competitorId },
      ],
    }),
  }),
});

export const { useListCompetitorsQuery, useGetCompetitorQuery } =
  competitorsApi;
