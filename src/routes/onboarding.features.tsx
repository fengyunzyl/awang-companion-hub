import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/features")({
  component: Features,
  head: () => ({ meta: [{ title: "阿旺能做什么" }] }),
});

const cards = [
  {
    emoji: "📸",
    title: "图 + 文案一起出",
    desc: "只需要传张图,我帮你精修配图、写好文案,朋友圈直接就能发",
    bg: "linear-gradient(135deg,#ffe5b8,#ffd28a)",
  },
  {
    emoji: "🎨",
    title: "海报也能一键搞定",
    desc: "不用学设计,上传实拍图,海报自动排版",
    bg: "linear-gradient(135deg,#ffd9b8,#ffb98a)",
  },
  {
    emoji: "✨",
    title: "水印一键清除",
    desc: "网图上的水印太碍眼?点一下,干干净净",
    bg: "linear-gradient(135deg,#ffe9d2,#ffcfa1)",
  },
];

function Features() {
  const [i, setI] = useState(0);
  const last = i === cards.length - 1;
  const c = cards[i];
  return (
    <div className="min-h-screen flex flex-col bg-background px-6 pt-12 pb-10">
      <div className="text-center text-sm text-text-tertiary mb-8">
        {i + 1} / {cards.length}
      </div>
      <div
        className="flex-1 rounded-3xl p-8 flex flex-col justify-end shadow-card"
        style={{ background: c.bg, minHeight: 400 }}
      >
        <div className="text-7xl mb-6">{c.emoji}</div>
        <h2 className="text-2xl font-bold text-text-primary mb-3">{c.title}</h2>
        <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
      </div>
      <div className="flex justify-center gap-2 my-6">
        {cards.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
      {last ? (
        <Link
          to="/onboarding/shop"
          className="bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2 font-semibold text-base shadow-button"
          style={{ height: 52 }}
        >
          开始使用吧
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <button
          onClick={() => setI(i + 1)}
          className="bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2 font-semibold text-base shadow-button"
          style={{ height: 52 }}
        >
          {i === 0 ? "继续" : "还有一个"}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
