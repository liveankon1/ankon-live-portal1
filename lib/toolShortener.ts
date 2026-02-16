export type ShortMapping = Record<string, { url: string; createdAt: number }>;

export type ShortHistoryItem = {
  code: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: number;
};

export const SHORTENER_MAP_KEY = "ankon_tools_shortener_map_v1";
export const SHORTENER_HISTORY_KEY = "ankon_tools_shortener_history_v1";

export const loadMapping = (): ShortMapping => {
  try {
    const raw = localStorage.getItem(SHORTENER_MAP_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ShortMapping;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
};

export const saveMapping = (next: ShortMapping) => {
  localStorage.setItem(SHORTENER_MAP_KEY, JSON.stringify(next));
};

export const loadHistory = (): ShortHistoryItem[] => {
  try {
    const raw = localStorage.getItem(SHORTENER_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ShortHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

export const saveHistory = (next: ShortHistoryItem[]) => {
  localStorage.setItem(SHORTENER_HISTORY_KEY, JSON.stringify(next.slice(0, 10)));
};
