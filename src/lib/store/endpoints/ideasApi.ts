import type { Competitor, IdeaReport } from "@/data";
import { api } from "../api";

export interface ListIdeasParams {
  status?: "processing" | "completed" | "failed";
  category?: string;
}

export const ideasApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listIdeas: builder.query<IdeaReport[], ListIdeasParams | void>({
      query: (params) => ({ url: "/api/ideas", params: params || {} }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Idea" as const, id })),
              { type: "Idea", id: "LIST" },
            ]
          : [{ type: "Idea", id: "LIST" }],
    }),
    getIdea: builder.query<IdeaReport, string>({
      query: (ideaId) => `/api/ideas/${ideaId}`,
      providesTags: (_result, _error, ideaId) => [{ type: "Idea", id: ideaId }],
    }),
    listCompetitorsForIdea: builder.query<Competitor[], string>({
      query: (ideaId) => `/api/ideas/${ideaId}/competitors`,
      providesTags: (result, _error, ideaId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Competitor" as const, id })),
              { type: "Competitor", id: `IDEA-${ideaId}` },
            ]
          : [{ type: "Competitor", id: `IDEA-${ideaId}` }],
    }),
  }),
});

export const {
  useListIdeasQuery,
  useGetIdeaQuery,
  useListCompetitorsForIdeaQuery,
} = ideasApi;
