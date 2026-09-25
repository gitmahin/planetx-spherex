export const RedisResponse = {
  OK: "OK",
  NIL: null,
  FAILED: 0,
  SUCCESS: 1, // 1 or > 1 based on how much keys are deleted
} as const;
