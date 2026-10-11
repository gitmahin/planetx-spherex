import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Badge } from "@repo/ui/components/badge";
import { formatRaDec } from "@/lib/format";
import type { CompareResult } from "../types";
import { BlinkCompare } from "./BlinkCompare";
import { CrossfadeCompare } from "./CrossfadeCompare";

export function CompareView({ data }: { data: CompareResult }) {
  const { epoch_a: a, epoch_b: b, changed_points: changed } = data;

  return (
    <div className="space-y-3">
      <Tabs defaultValue="slider">
        <TabsList>
          <TabsTrigger value="slider">Slider</TabsTrigger>
          <TabsTrigger value="blink">Blink</TabsTrigger>
        </TabsList>
        <TabsContent value="slider">
          <CrossfadeCompare a={a} b={b} changed={changed} />
        </TabsContent>
        <TabsContent value="blink">
          <BlinkCompare a={a} b={b} changed={changed} />
        </TabsContent>
      </Tabs>

      <div className="space-y-1 text-sm">
        <Badge variant={changed.length ? "destructive" : "secondary"}>
          {changed.length
            ? `${changed.length} object(s) moved`
            : "Nothing detected as moved"}
        </Badge>
        {changed.map((p, i) => (
          <p key={i} className="font-mono text-xs text-muted-foreground">
            {formatRaDec(p.ra, p.dec)}
          </p>
        ))}
      </div>
    </div>
  );
}
