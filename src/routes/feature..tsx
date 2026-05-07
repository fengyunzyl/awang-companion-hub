import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/aw/PageHeader";

export const Route = createFileRoute("/feature/")({
  component: Feature,
});

const meta: Record<string, { title: string; tip: string }> = {
  moments: { title: "朋友圈图文", tip: "上传商品图,自动生成图+文案" },
  product: { title: "商品头图", tip: "突出主体,生成 1:1 商品头图" },
  xhs: { title: "小红书封面", tip: "高点击率封面 + 标题" },
  poster: { title: "创意海报", tip: "上传素材,自动排版海报" },
  watermark: { title: "去水印", tip: "一键擦除图片水印" },
  antifold: { title: "朋友圈防折叠", tip: "自动加格式,文案不被折叠" },
};

function Feature() {
  const { key } = Route.useParams();
  const m = meta[key] ?? { title: "功能", tip: "" };
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const gen = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={m.title} />
      <div className="px-4 py-5">
        <div className="bg-primary-light text-primary-dark text-xs rounded-xl px-3 py-2.5 mb-4">
          💡 {m.tip}
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="text-sm font-semibold text-text-primary mb-3">上传素材</div>
          <button className="w-full aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-text-tertiary">
            <Upload className="w-7 h-7" />
            <span className="text-sm">点击上传图片</span>
          </button>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="text-sm font-semibold text-text-primary mb-3">补充信息(可选)</div>
          <textarea
            placeholder="店铺名、商品名、想表达的卖点..."
            className="w-full bg-secondary rounded-xl p-3 text-sm outline-none placeholder:text-text-tertiary resize-none"
            rows={3}
          />
        </div>

        {done && (
          <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
            <div className="text-sm font-semibold text-text-primary mb-3">生成结果</div>
            <div className="grid grid-cols-2 gap-2">
              {["🌸", "✨", "🎀", "💫"].map((e, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl flex items-center justify-center text-5xl bg-gradient-primary"
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={gen}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button flex items-center justify-center gap-2 disabled:opacity-70"
          style={{ height: 52 }}
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "生成中..." : done ? "再来一组(消耗 10 积分)" : "立即生成(消耗 10 积分)"}
        </button>
      </div>
    </div>
  );
}
