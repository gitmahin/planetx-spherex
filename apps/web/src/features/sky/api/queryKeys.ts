export const skyKeys = {
  epochs: (sessionId: string | null) => ["sky", "epochs", sessionId] as const,
  compare: (sessionId: string | null, a: number | null, b: number | null) =>
    ["sky", "compare", sessionId, a, b] as const,
};
