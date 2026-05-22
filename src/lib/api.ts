const API_BASE = import.meta.env.VITE_API_URL;

export function getApiUrl(path: string): string {
  const base = API_BASE?.replace(/\/$/, "") ?? "";
  const route = path.startsWith("/") ? path : `/${path}`;
  return `${base}${route}`;
}

/** Normalisasi respons BE: bisa array langsung atau { data: [...] } */
export function asArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload;
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data: unknown }).data)
  ) {
    return (payload as { data: T[] }).data;
  }
  return [];
}

async function parseError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string; message?: string };
    return data.error ?? data.message ?? fallback;
  } catch {
    return fallback;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(getApiUrl(path));
  if (!res.ok) {
    throw new Error(await parseError(res, `Gagal memuat ${path} (${res.status})`));
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(getApiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(await parseError(res, `Gagal menyimpan ${path} (${res.status})`));
  }
  return res.json() as Promise<T>;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(getApiUrl(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(await parseError(res, `Gagal mengubah ${path} (${res.status})`));
  }
  return res.json() as Promise<T>;
}

export async function apiDelete(path: string): Promise<void> {
  const res = await fetch(getApiUrl(path), { method: "DELETE" });
  if (!res.ok) {
    throw new Error(await parseError(res, `Gagal menghapus ${path} (${res.status})`));
  }
}
