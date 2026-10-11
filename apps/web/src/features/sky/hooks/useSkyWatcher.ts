import { useCallback, useEffect, useMemo, useState } from "react";
import { WINDOW_ARCMIN, DEFAULT_BAND } from "@/lib/config";
import { useCreateSession } from "./useCreateSession";
import { useEpochs } from "./useEpochs";
import { useCompare } from "./useCompare";
import { useTrackNext } from "./useTrackNext";
import type { EpochSlot, SkyCoord } from "../types";

/** Single place that wires pick -> session -> epochs -> compare. */
export function useSkyWatcher() {
  const [target, setTarget] = useState<SkyCoord | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [indexA, setIndexA] = useState<number | null>(null);
  const [indexB, setIndexB] = useState<number | null>(null);
  const [aladinSlot, setAladinSlot] = useState<EpochSlot>("B");

  const createSession = useCreateSession();
  const epochs = useEpochs(sessionId);
  const compare = useCompare(sessionId, indexA, indexB);
  const track = useTrackNext(sessionId);
  const { reset: resetTrack } = track;
  const { mutate: startSession } = createSession;

  const pick = useCallback(
    (coord: SkyCoord) => {
      setTarget(coord);
      setSessionId(null);
      setIndexA(null);
      setIndexB(null);
      resetTrack();
      startSession(
        { ...coord, window_arcmin: WINDOW_ARCMIN, band: DEFAULT_BAND },
        { onSuccess: (s) => setSessionId(s.session_id) }
      );
    },
    [startSession, resetTrack]
  );

  useEffect(() => {
    if (epochs.data?.length && indexA === null) {
      setIndexA(0);
      setIndexB(epochs.data.length - 1);
    }
  }, [epochs.data, indexA]);

  const cutout = useMemo(() => {
    if (!compare.data) return null;
    return aladinSlot === "A" ? compare.data.epoch_a : compare.data.epoch_b;
  }, [compare.data, aladinSlot]);

  const focus = useMemo(
    () => (target ? { ...target, fovDeg: (WINDOW_ARCMIN / 60) * 2 } : null),
    [target]
  );

  return {
    target,
    sessionId,
    focus,
    pick,
    createSession,
    epochs,
    compare,
    indexA,
    indexB,
    setIndexA,
    setIndexB,
    aladinSlot,
    setAladinSlot,
    cutout,
    track,
  };
}
