import type { UseQueryResult } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@repo/ui/components/alert";

import { CompareView } from "../compare/CompareView";
import type { CompareResult } from "../types";
import { ErrorAlert } from "./ErrorAlert";
import Skeleton from "react-loading-skeleton";

interface Props {
  compare: UseQueryResult<CompareResult>;
  epochCount: number;
}

export function ComparePanel({ compare, epochCount }: Props) {
  if (epochCount === 0) return null;

  return (
    <div className="space-y-3">
      {epochCount === 1 && (
        <Alert>
          <AlertDescription>
            Only one epoch covers this spot so far, so there is nothing to
            compare yet.
          </AlertDescription>
        </Alert>
      )}
      {compare.isLoading && <Skeleton className="h-72 w-full" />}
      {compare.error && <ErrorAlert message={compare.error.message} />}
      {compare.data && <CompareView data={compare.data} />}
    </div>
  );
}
