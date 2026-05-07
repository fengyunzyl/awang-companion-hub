import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import {
  type MomentsParams,
  type ResultType,
  type GenMode,
  type Theme,
  type ModelKey,
  THEME_LABEL,
  MODEL_LABEL,
} from "@/lib/moments";

function Chip({
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
        "px-3.5 h-8 rounded-full text-xs font-medium transition-colors border " +
        (active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-secondary text-text-secondary border-transparent")
      }
    >
      {children}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card">
      <div className="text-sm font-semibold text-text-primary mb-3">{title}</div>
      {children}
    </div>
  );
}

export function MomentsConfig({
  value,
  onChange,
  onPickModel,
}: {
  value: MomentsParams;
  onChange: (v: MomentsParams) => void;
  onPickModel: () => void;
}) {
  const set = <K extends keyof MomentsParams>(k: K, v: MomentsParams[K]) =>
    onChange({ ...value, [k]: v });

  const themes: Theme[] = ["daily", "new", "festival", "review"];

  return (
    <div className="space-y-3">
      <Section title="创作结果">
        <div className="flex gap-2">
          {(
            [
              ["text_image", "图+朋友圈文案"],
              ["only_image", "只需要图"],
            ] as [ResultType, string][]
          ).map(([k, l]) => (
            <Chip key={k} active={value.resultType === k} onClick={() => set("resultType", k)}>
              {l}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="生成模式">
        <div className="flex gap-2">
          {(
            [
              ["smart", "智能模式"],
              ["custom", "自定义"],
            ] as [GenMode, string][]
          ).map(([k, l]) => (
            <Chip key={k} active={value.mode === k} onClick={() => set("mode", k)}>
              {l}
            </Chip>
          ))}
        </div>
        {value.mode === "custom" && (
          <Textarea
            value={value.customPrompt}
            onChange={(e) => set("customPrompt", e.target.value)}
            placeholder="请简单输入对图片的要求,如风格、标题、副标题等内容"
            className="mt-3 bg-secondary border-0 text-sm"
            rows={3}
          />
        )}
      </Section>

      <Section title="创作主题">
        <div className="flex gap-2 flex-wrap">
          {themes.map((t) => (
            <Chip key={t} active={value.theme === t} onClick={() => set("theme", t)}>
              {THEME_LABEL[t]}
            </Chip>
          ))}
        </div>
      </Section>

      <div className="bg-card rounded-2xl px-4 py-3.5 shadow-card flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-text-primary">不在图片上添加文字</div>
          <div className="text-xs text-text-tertiary mt-0.5">开启后图片上不叠加文案</div>
        </div>
        <Switch
          checked={value.noTextOnImage}
          onCheckedChange={(v) => set("noTextOnImage", v)}
        />
      </div>

      <button
        type="button"
        onClick={onPickModel}
        className="w-full bg-card rounded-2xl px-4 py-3.5 shadow-card flex items-center justify-between"
      >
        <div className="text-sm font-medium text-text-primary">生成模型</div>
        <div className="flex items-center gap-1 text-text-tertiary">
          <span className="text-sm">{MODEL_LABEL[value.model]}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
    </div>
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
    <div className="space-y-2">
      {items.map((it) => {
        const active = value === it.key;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={
              "w-full text-left rounded-2xl p-4 border transition-colors " +
              (active
                ? "border-primary bg-primary-light/40"
                : "border-border bg-card")
            }
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">
                {MODEL_LABEL[it.key]}
              </span>
              {it.recommended && (
                <span className="text-[10px] font-medium text-primary-dark bg-primary-light rounded-full px-2 py-0.5">
                  推荐
                </span>
              )}
            </div>
            <div className="text-xs text-text-tertiary mt-1">{it.desc}</div>
          </button>
        );
      })}
    </div>
  );
}