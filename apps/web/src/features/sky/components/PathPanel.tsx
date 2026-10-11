import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { formatRaDec } from "@/lib/format";
import type { PathPoint } from "../types";
import { ErrorAlert } from "./ErrorAlert";

interface Props {
  path: PathPoint[];
  hasMore: boolean;
  isPending: boolean;
  disabled: boolean;
  error: Error | null;
  onNext: () => void;
}

export function PathPanel({
  path,
  hasMore,
  isPending,
  disabled,
  error,
  onNext,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Track path</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={onNext} disabled={disabled || isPending || !hasMore}>
          {isPending ? "Loading…" : hasMore ? "Next epoch" : "No more epochs"}
        </Button>
        {error && <ErrorAlert message={error.message} />}
        <ol className="space-y-1 font-mono text-xs text-muted-foreground">
          {path.map((p, i) => (
            <li key={i}>
              {i + 1}. {p.epoch} — {formatRaDec(p.ra, p.dec)}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
