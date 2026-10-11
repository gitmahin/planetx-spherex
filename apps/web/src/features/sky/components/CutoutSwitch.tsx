import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import type { EpochSlot } from "../types";

interface Props {
  value: EpochSlot;
  onChange: (slot: EpochSlot) => void;
}

export function CutoutSwitch({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">Show on map:</span>
      <Tabs value={value} onValueChange={(v) => onChange(v as EpochSlot)}>
        <TabsList>
          <TabsTrigger value="A">Older</TabsTrigger>
          <TabsTrigger value="B">Newer</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
