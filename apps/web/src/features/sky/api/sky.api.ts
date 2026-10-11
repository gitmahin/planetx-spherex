import { request } from "@/lib/http";
import type {
  CompareResult,
  CreateSessionInput,
  Epoch,
  SessionInfo,
  TrackFrame,
} from "../types";

export const skyApi = {
  createSession: (input: CreateSessionInput) =>
    request<SessionInfo>("/sessions", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  getEpochs: (sessionId: string) =>
    request<Epoch[]>(`/sessions/${sessionId}/epochs`),

  compare: (sessionId: string, indexA: number, indexB: number) =>
    request<CompareResult>(
      `/sessions/${sessionId}/compare?index_a=${indexA}&index_b=${indexB}`
    ),

  nextFrame: (sessionId: string) =>
    request<TrackFrame>(`/sessions/${sessionId}/next`),
};
