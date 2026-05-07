import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Sparkles, ImagePlus, ChevronDown, Check } from "lucide-react";
import { PageHeader } from "@/components/aw/PageHeader";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/feature/$key")({
  component: Feature,
});

const meta: Record<string, { title: string; tip: string }> = {
  moments: { title: "朋友圈创作", tip: "上传商品图,自动生成图+文案" },
  product: { title: "商品头图", tip: "突出主体,生成 1:1 商品头图" },
  xhs: { title: "小红书封面", tip: "高点击率封面 + 标题" },
  poster: { title: "创意海报", tip: "上传素材,自动排版海报" },
  watermark: { title: "去水印", tip: "一键擦除图片水印" },
  antifold: { title: "朋友圈防折叠", tip: "自动加格式,文案不被折叠" },
};

const OUTPUT_OPTIONS = [
  { key: "both", label: "图+文" },
  { key: "image", label: "只需要图" },
] as const;

const MODE_OPTIONS = [
  { key: "smart", label: "智能模式", icon: true },
  { key: "custom", label: "自定义" },
] as const;

const TOPIC_OPTIONS = ["日常宣传", "新品上市", "节日促销", "顾客好评"];

const MODELS = [
  { key: "std", label: "标准版", desc: "均衡了速度和生成质量", letter: "S", color: "linear-gradient(135deg,#a78bfa,#7c5cff)", recommended: false },
  { key: "pro", label: "专业版", desc: "速度稍慢,但细节更丰富", letter: "P", color: "linear-gradient(135deg,#34d399,#0fb47a)", recommended: true },
  { key: "lite", label: "轻量版", desc: "生成速度更快,适合快速预览", letter: "L", color: "linear-gradient(135deg,#fb923c,#f97316)", recommended: false },
];

function Feature() {
  const { key } = Route.useParams();
  const m = meta[key] ?? { title: "功能", tip: "" };

  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState<(typeof OUTPUT_OPTIONS)[number]["key"]>("both");
  const [mode, setMode] = useState<(typeof MODE_OPTIONS)[number]["key"]>("smart");
  const [topic, setTopic] = useState<string>("日常宣传");
  const [noText, setNoText] = useState(false);
  const [model, setModel] = useState<(typeof MODELS)[number]["key"]>("std");
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result as string);
    r.readAsDataURL(f);
  };

  const cost = 10;
  const remain = 150;
  const canSubmit = !!image;

  const gen = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader title={m.title} />
      <div className="px-4 py-4 space-y-5">
        {/* 上传图片 */}
        <section>
          <div className="text-sm font-semibold text-text-primary mb-2.5">上传图片</div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full bg-card rounded-2xl p-3 shadow-card"
          >
            <div className="aspect-[16/9] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-text-tertiary overflow-hidden">
              {image ? (
                <img src={image} alt="" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImagePlus className="w-7 h-7" />
                  <span className="text-sm">上传图片</span>
                </>
              )}
            </div>
          </button>
        </section>

        {/* 想要什么 */}
        <Section title="想要什么?">
          <Pills
            options={OUTPUT_OPTIONS.map((o) => ({ key: o.key, label: o.label }))}
            value={output}
            onChange={(v) => setOutput(v as typeof output)}
          />
        </Section>

        {/* 生成模式 */}
        <Section title="生成模式">
          <Pills
            options={MODE_OPTIONS.map((o) => ({
              key: o.key,
              label: o.label,
              icon: o.key === "smart" ? <Sparkles className="w-3.5 h-3.5" /> : undefined,
            }))}
            value={mode}
            onChange={(v) => setMode(v as typeof mode)}
          />
        </Section>

        {/* 选择创作主题 */}
        <Section title="选择创作主题">
          <div className="grid grid-cols-2 gap-2.5">
            {TOPIC_OPTIONS.map((t) => {
              const active = topic === t;
              return (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={cn(
                    "h-11 rounded-xl text-sm font-medium transition border",
                    active
                      ? "bg-primary-light text-primary-dark border-primary"
                      : "bg-card text-text-primary border-border",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Section>

        {/* 不加字 */}
        <button
          onClick={() => setNoText((v) => !v)}
          className="flex items-center gap-2 text-sm text-text-secondary"
        >
          <span
            className={cn(
              "w-4 h-4 rounded-full border flex items-center justify-center",
              noText ? "bg-primary border-primary" : "border-text-tertiary",
            )}
          >
            {noText && <Check className="w-3 h-3 text-primary-foreground" />}
          </span>
          我不想在图片上添加文字
        </button>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 inset-x-0 max-w-[430px] mx-auto bg-card/95 backdrop-blur border-t border-border px-4 pt-3 pb-4">
        <div className="flex items-center gap-3">
          {/* 模型选择 */}
          <div className="relative">
            <button
              onClick={() => setModelOpen((v) => !v)}
              className="flex items-center gap-1.5 bg-secondary rounded-xl px-2.5 py-2"
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-brand text-white text-xs font-bold flex items-center justify-center">
                {model === "pro" ? "P" : "S"}
              </span>
              <div className="text-left">
                <div className="text-[10px] text-text-tertiary leading-none mb-0.5">当前模型</div>
                <div className="text-xs font-semibold text-text-primary leading-none">
                  {MODELS.find((x) => x.key === model)?.label}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-text-tertiary" />
            </button>
            {modelOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-44 bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                {MODELS.map((mm) => (
                  <button
                    key={mm.key}
                    onClick={() => {
                      setModel(mm.key as typeof model);
                      setModelOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2.5 text-left flex items-center justify-between",
                      model === mm.key ? "bg-primary-light" : "",
                    )}
                  >
                    <div>
                      <div className="text-sm font-semibold text-text-primary">{mm.label}</div>
                      <div className="text-xs text-text-tertiary">{mm.desc}</div>
                    </div>
                    {model === mm.key && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 主按钮 */}
          <button
            onClick={gen}
            disabled={!canSubmit || loading}
            className="flex-1 h-12 rounded-full bg-gradient-brand text-white font-semibold shadow-button disabled:opacity-50"
          >
            {loading ? "生成中..." : "开始创作"}
          </button>
        </div>
        <div className="text-xs text-text-tertiary mt-2 text-center">
          本次预计消耗 {cost} 积分,还剩 {remain} 积分{" "}
          <span className="text-primary-dark font-medium">获取更多积分</span>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-sm font-semibold text-text-primary mb-2.5">{title}</div>
      {children}
    </section>
  );
}

function Pills({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={cn(
              "h-11 rounded-xl text-sm font-medium transition border flex items-center justify-center gap-1.5",
              active
                ? "bg-primary-light text-primary-dark border-primary"
                : "bg-card text-text-primary border-border",
            )}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
