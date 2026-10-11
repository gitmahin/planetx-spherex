import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { skyApi } from "../api/sky.api";
import type { PathPoint } from "../types";

/** Steps through epochs one at a time, accumulating the moving object's path. */
export function useTrackNext(sessionId: string | null) {
  const [path, setPath] = useState<PathPoint[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const mutation = useMutation({
    mutationFn: () => skyApi.nextFrame(sessionId!),
    onSuccess: (frame) => {
      setPath(frame.path);
      setHasMore(frame.has_more);
    },
  });

  const { reset: resetMutation } = mutation;
  const reset = useCallback(() => {
    setPath([]);
    setHasMore(true);
    resetMutation();
  }, [resetMutation]);

  return {
    path,
    hasMore,
    next: () => mutation.mutate(),
    isPending: mutation.isPending,
    error: mutation.error,
    reset,
  };
}
