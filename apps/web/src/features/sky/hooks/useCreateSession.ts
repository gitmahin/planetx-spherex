import { useMutation } from "@tanstack/react-query";
import { skyApi } from "../api/sky.api";

export function useCreateSession() {
  return useMutation({ mutationFn: skyApi.createSession });
}
