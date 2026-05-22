import { apiGet, asArray } from "./api";
import type { SelectOption } from "../components/ui/Select";
import type { CategoryItem, SpeakerItem } from "../types/api";

export async function loadCategoryOptions(): Promise<SelectOption[]> {
  const raw = await apiGet<unknown>("/categories");
  return asArray<CategoryItem>(raw).map((c) => ({
    value: String(c.id),
    label: c.name,
  }));
}

export async function loadSpeakerOptions(): Promise<SelectOption[]> {
  const raw = await apiGet<unknown>("/speakers");
  return asArray<SpeakerItem>(raw).map((s) => ({
    value: String(s.id),
    label: `${s.name} — ${s.role}`,
  }));
}

export function labelForOption(
  options: SelectOption[],
  value: string | null | undefined
): string {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
}
