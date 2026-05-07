export type ResultType = "text_image" | "only_image";
export type GenMode = "smart" | "custom";
export type Theme = "daily" | "new" | "festival" | "review";
export type ModelKey = "standard" | "pro" | "lite";

export type MomentsParams = {
  resultType: ResultType;
  mode: GenMode;
  customPrompt: string;
  theme: Theme;
  noTextOnImage: boolean;
  model: ModelKey;
};

export type MomentsRecord = {
  id: string;
  imageDataURL: string;
  params: MomentsParams;
  createdAt: number;
};

export const THEME_LABEL: Record<Theme, string> = {
  daily: "日常宣传",
  new: "新品上市",
  festival: "节日促销",
  review: "顾客好评",
};

export const MODEL_LABEL: Record<ModelKey, string> = {
  standard: "标准版",
  pro: "专业版",
  lite: "轻量版",
};

export const DEFAULT_PARAMS: MomentsParams = {
  resultType: "text_image",
  mode: "smart",
  customPrompt: "",
  theme: "daily",
  noTextOnImage: false,
  model: "standard",
};

export const COST = 10;

const HISTORY_KEY = "aw_moments_history";
const CURRENT_KEY = "aw_moments_current";

export function getHistory(): MomentsRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveHistory(rec: MomentsRecord) {
  const list = getHistory();
  list.unshift(rec);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 20)));
}

export function getCurrent(): MomentsRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrent(rec: MomentsRecord) {
  sessionStorage.setItem(CURRENT_KEY, JSON.stringify(rec));
}

export function getRecordById(id: string): MomentsRecord | null {
  return getHistory().find((r) => r.id === id) ?? null;
}

export function getPoints(): number {
  if (typeof window === "undefined") return 100;
  return Number(localStorage.getItem("aw_points_avail") ?? "100");
}

export function setPoints(n: number) {
  localStorage.setItem("aw_points_avail", String(n));
}

export function genCopy(theme: Theme, custom: string): string {
  const base: Record<Theme, string> = {
    daily: "新的一天，门店准时上线 ☀️\n用心做好每一杯，等你来 ✨\n#日常营业 #欢迎光临",
    new: "上新啦！全新口味首发登场 🎉\n限时尝鲜价，错过等一年\n#新品上市 #尝鲜必备",
    festival: "节日特惠仅此三天 🎁\n买二送一，闺蜜组队更划算\n#节日促销 #手慢无",
    review: "又被顾客夸啦 💛\n“真的好吃，下次还来！”\n感谢每一位老朋友的支持\n#顾客好评 #真实反馈",
  };
  return custom ? `${base[theme]}\n\n📝 ${custom}` : base[theme];
}

export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}