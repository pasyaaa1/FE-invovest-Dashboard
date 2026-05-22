export function toInputDate(iso: string): string {
  return iso.slice(0, 10);
}

export function formatDateId(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
