import { useQuery } from "@tanstack/react-query";
import { skyApi } from "../api/sky.api";
import { skyKeys } from "../api/queryKeys";

export function useEpochs(sessionId: string | null) {
  return useQuery({
    queryKey: skyKeys.epochs(sessionId),
    queryFn: () => skyApi.getEpochs(sessionId!),
    enabled: !!sessionId,
  });
}
