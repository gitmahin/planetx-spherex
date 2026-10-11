import { useQuery } from "@tanstack/react-query";
import { skyApi } from "../api/sky.api";
import { skyKeys } from "../api/queryKeys";

export function useCompare(
  sessionId: string | null,
  a: number | null,
  b: number | null
) {
  return useQuery({
    queryKey: skyKeys.compare(sessionId, a, b),
    queryFn: () => skyApi.compare(sessionId!, a!, b!),
    enabled: !!sessionId && a !== null && b !== null,
    staleTime: Infinity, // archive frames don't change once fetched
  });
}
