import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { AladinViewer } from "../aladin/AladinViewer";
import { ComparePanel } from "../components/ComparePanel";
import { CutoutSwitch } from "../components/CutoutSwitch";
import { EpochPicker } from "../components/EpochPicker";
import { PathPanel } from "../components/PathPanel";
import { TargetCard } from "../components/TargetCard";
import { useSkyWatcher } from "../hooks/useSkyWatcher";

export function SkyWatcherPage() {
  const w = useSkyWatcher();
  const epochList = w.epochs.data ?? [];

  return (
    <main className="mx-auto max-w-7xl space-y-4 p-4">
      <header>
        <h1 className="text-2xl font-semibold">SPHEREx Sky Watcher</h1>
        <p className="text-sm text-muted-foreground">
          Browse the sky, click a spot, and see how it changed between SPHEREx
          scans.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sky map</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <AladinViewer
              onPick={w.pick}
              cutout={w.cutout}
              changed={w.compare.data?.changed_points}
              path={w.track.path}
              focus={w.focus}
            />
            <CutoutSwitch value={w.aladinSlot} onChange={w.setAladinSlot} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <TargetCard
            target={w.target}
            isCreating={w.createSession.isPending}
            error={w.createSession.error ?? w.epochs.error}
            epochCount={w.epochs.data?.length}
          />

          {epochList.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Compare epochs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EpochPicker
                  epochs={epochList}
                  indexA={w.indexA}
                  indexB={w.indexB}
                  onChangeA={w.setIndexA}
                  onChangeB={w.setIndexB}
                />
                <ComparePanel
                  compare={w.compare}
                  epochCount={epochList.length}
                />
              </CardContent>
            </Card>
          )}

          <PathPanel
            path={w.track.path}
            hasMore={w.track.hasMore}
            isPending={w.track.isPending}
            disabled={!w.sessionId}
            error={w.track.error}
            onNext={w.track.next}
          />
        </div>
      </div>
    </main>
  );
}
