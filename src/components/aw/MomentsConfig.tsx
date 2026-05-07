import { Textarea } from "@/components/ui/textarea";
import { Check, Sparkles } from "lucide-react";
import {
  type MomentsParams,
  type ResultType,
  type GenMode,
  type Theme,
  type ModelKey,
  THEME_LABEL,
  MODEL_LABEL,
} from "@/lib/moments";

function Tile({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "h-12 rounded-xl text-sm font-medium transition-colors border flex items-center justify-center gap-1.5 " +
        (active
          ? "bg-primary-light/60 border-primary text-primary-dark"
          : "bg-card border-border text-text-primary")
      }
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold text-text-primary mb-2.5 mt-1">{children}</div>;
}

export function MomentsConfig({
  value,
  onChange,
}: {
  value: MomentsParams;
  onChange: (v: MomentsParams) => void;
}) {
  const set = <K extends keyof MomentsParams>(k: K, v: MomentsParams[K]) =>
    onChange({ ...value, [k]: v });

  const themes: Theme[] = ["daily", "new", "festival", "review"];

  return (
    <div className="space-y-1">
      <SectionLabel>想要什么？</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["text_image", "图+文"],
            ["only_image", "只需要图"],
          ] as [ResultType, string][]
        ).map(([k, l]) => (
          <Tile key={k} active={value.resultType === k} onClick={() => set("resultType", k)}>
            {l}
          </Tile>
        ))}
      </div>

      <SectionLabel>生成模式</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["smart", "智能模式"],
            ["custom", "自定义"],
          ] as [GenMode, string][]
        ).map(([k, l]) => (
          <Tile key={k} active={value.mode === k} onClick={() => set("mode", k)}>
            {k === "smart" && (
              <Sparkles className={"w-3.5 h-3.5 " + (value.mode === "smart" ? "text-primary" : "text-text-tertiary")} />
            )}
            {l}
          </Tile>
        ))}
      </div>
      {value.mode === "custom" && (
        <Textarea
          value={value.customPrompt}
          onChange={(e) => set("customPrompt", e.target.value)}
          placeholder="请简单输入对图片的要求,如风格、标题、副标题等内容"
          className="mt-3 bg-card border-border text-sm rounded-xl"
          rows={3}
        />
      )}

      <SectionLabel>选择创作主题</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((t) => (
          <Tile key={t} active={value.theme === t} onClick={() => set("theme", t)}>
            {THEME_LABEL[t]}
          </Tile>
        ))}
      </div>

      <button
        type="button"
        onClick={() => set("noTextOnImage", !value.noTextOnImage)}
        className="mt-5 flex items-center gap-2 text-sm text-text-primary"
      >
        <span
          className={
            "w-[18px] h-[18px] rounded-full border flex items-center justify-center " +
            (value.noTextOnImage ? "bg-primary border-primary" : "border-text-tertiary")
          }
        >
          {value.noTextOnImage && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
        </span>
        我不想在图片上添加文字
      </button>
    </div>
  );
}

const MODEL_BADGE: Record<ModelKey, { letter: string; bg: string }> = {
  standard: { letter: "S", bg: "bg-[#7c6cf0]" },
  pro: { letter: "P", bg: "bg-[#22b07d]" },
  lite: { letter: "L", bg: "bg-[#ff7849]" },
};

export function ModelChip({
  value,
  onClick,
}: {
  value: ModelKey;
  onClick: () => void;
}) {
  const b = MODEL_BADGE[value];
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 bg-card rounded-full pl-1 pr-3 py-1 border border-border"
    >
      <span className={"w-7 h-7 rounded-full text-white text-xs font-semibold flex items-center justify-center " + b.bg}>
        {b.letter}
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-text-tertiary">当前模型</span>
        <span className="block text-xs font-semibold text-text-primary">{MODEL_LABEL[value]}</span>
      </span>
    </button>
  );
}

export function ModelPicker({
  value,
  onChange,
}: {
  value: ModelKey;
  onChange: (m: ModelKey) => void;
}) {
  const items: { key: ModelKey; desc: string; recommended?: boolean }[] = [
    { key: "standard", desc: "均衡了速度和生成质量" },
    { key: "pro", desc: "速度稍慢,但细节更丰富", recommended: true },
    { key: "lite", desc: "生成速度更快,适合快速预览" },
  ];
  return (
    <div className="space-y-1">
      {items.map((it) => {
        const active = value === it.key;
        const b = MODEL_BADGE[it.key];
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={
              "w-full text-left rounded-2xl p-3 flex items-center gap-3 transition-colors " +
              (active ? "bg-primary-light/40" : "bg-transparent")
            }
          >
            <span className={"w-11 h-11 rounded-xl text-white text-base font-semibold flex items-center justify-center shrink-0 " + b.bg}>
              {b.letter}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">{MODEL_LABEL[it.key]}</span>
                {it.recommended && (
                  <span className="text-[10px] font-medium text-primary-dark bg-primary-light rounded-full px-2 py-0.5">
                    推荐
                  </span>
                )}
              </div>
              <div className="text-xs text-text-tertiary mt-0.5">{it.desc}</div>
            </div>
            {active && <Check className="w-5 h-5 text-primary" strokeWidth={3} />}
          </button>
        );
      })}
    </div>
  );
}
