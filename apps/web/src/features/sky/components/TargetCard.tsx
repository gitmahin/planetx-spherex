import { Badge } from "@repo/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import Skeleton from "react-loading-skeleton";
import { formatRaDec } from "@/lib/format";
import type { SkyCoord } from "../types";
import { ErrorAlert } from "./ErrorAlert";

interface Props {
  target: SkyCoord | null;
  isCreating: boolean;
  error: Error | null;
  epochCount?: number;
}

export function TargetCard({ target, isCreating, error, epochCount }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Target</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {!target && (
          <p className="text-sm text-muted-foreground">
            Click anywhere on the sky map to watch that spot over time.
          </p>
        )}
        {target && (
          <p className="font-mono text-sm">
            {formatRaDec(target.ra, target.dec)}
          </p>
        )}
        {isCreating && <Skeleton className="h-5 w-40" />}
        {epochCount !== undefined && (
          <Badge variant="secondary">{epochCount} epochs found</Badge>
        )}
        {error && <ErrorAlert message={error.message} />}
      </CardContent>
    </Card>
  );
}
