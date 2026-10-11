import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import type { Epoch } from "../types";

interface Props {
  epochs: Epoch[];
  indexA: number | null;
  indexB: number | null;
  onChangeA: (i: number) => void;
  onChangeB: (i: number) => void;
}

function EpochSelect({
  label,
  epochs,
  value,
  onChange,
}: {
  label: string;
  epochs: Epoch[];
  value: number | null;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex-1 space-y-1">
      <Label>{label}</Label>
      <Select
        value={value === null ? undefined : String(value)}
        onValueChange={(v) => onChange(Number(v))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select epoch" />
        </SelectTrigger>
        <SelectContent>
          {epochs.map((e) => (
            <SelectItem key={e.index} value={String(e.index)}>
              {e.epoch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function EpochPicker({
  epochs,
  indexA,
  indexB,
  onChangeA,
  onChangeB,
}: Props) {
  return (
    <div className="flex gap-3">
      <EpochSelect
        label="Older"
        epochs={epochs}
        value={indexA}
        onChange={onChangeA}
      />
      <EpochSelect
        label="Newer"
        epochs={epochs}
        value={indexB}
        onChange={onChangeB}
      />
    </div>
  );
}
