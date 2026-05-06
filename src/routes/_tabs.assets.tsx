import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_tabs/assets")({
  component: Assets,
  head: () => ({ meta: [{ title: "我的资产" }] }),
});

const tagColor: Record<string, string> = {
  朋友圈: "bg-primary",
  小红书: "bg-[#ff5470]",
  商品头图: "bg-info",
  创意海报: "bg-[#7c5cff]",
  去水印: "bg-success",
};

const results = [
  { tag: "朋友圈", emoji: "☕" },
  { tag: "小红书", emoji: "🍰" },
  { tag: "商品头图", emoji: "👜" },
  { tag: "创意海报", emoji: "🎉" },
  { tag: "去水印", emoji: "🌺" },
  { tag: "朋友圈", emoji: "🍵" },
  { tag: "小红书", emoji: "💄" },
  { tag: "商品头图", emoji: "👟" },
  { tag: "创意海报", emoji: "🎁" },
];
const uploads = ["📷", "🖼️", "🌆", "🥗", "🍜", "🍔"];

function Assets() {
  const [tab, setTab] = useState<"r" | "u">("r");
  return (
    <div className="px-4 pt-3 pb-6">
      <div className="flex items-center justify-center gap-6 py-3 mb-3">
        {[
          { k: "r" as const, label: "创作结果" },
          { k: "u" as const, label: "历史上传" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`relative pb-1.5 text-base ${
              tab === t.k ? "text-text-primary font-bold" : "text-text-tertiary"
            }`}
          >
            {t.label}
            {tab === t.k && (
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-6 h-1 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {tab === "r" ? (
        <div className="grid grid-cols-3 gap-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl relative overflow-hidden flex items-center justify-center text-5xl"
              style={{ background: "linear-gradient(135deg,#fff1d6,#ffe0b8)" }}
            >
              {r.emoji}
              <span
                className={`absolute right-1 bottom-1 text-[10px] text-white px-1.5 py-0.5 rounded-md ${tagColor[r.tag]}`}
              >
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {uploads.map((e, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center text-5xl bg-secondary"
            >
              {e}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/home"
          className="inline-block text-sm text-primary font-semibold"
        >
          去创作 →
        </Link>
      </div>
    </div>
  );
}
