import { createFileRoute, useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, MoreHorizontal, Copy, RefreshCw, Wand2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MomentsConfig, ModelPicker, ModelChip } from "@/components/aw/MomentsConfig";
import {
  COST,
  type MomentsParams,
  type MomentsRecord,
  genCopy,
  getCurrent,
  getPoints,
  getRecordById,
  saveHistory,
  setCurrent,
  setPoints,
} from "@/lib/moments";

type Search = { id?: string };

export const Route = createFileRoute("/moments/result")({
  component: Result,
  validateSearch: (s: Record<string, unknown>): Search => ({ id: s.id as string | undefined }),
  head: () => ({ meta: [{ title: "朋友圈创作 - 结果" }] }),
});

function Result() {
  const router = useRouter();
  const nav = useNavigate();
  const { id } = useSearch({ from: "/moments/result" });

  const [rec, setRec] = useState<MomentsRecord | null>(null);
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [draftParams, setDraftParams] = useState<MomentsParams | null>(null);

  useEffect(() => {
    const r = id ? getRecordById(id) : getCurrent();
    setRec(r);
  }, [id]);

  const copyText = useMemo(() => {
    if (!rec) return "";
    if (rec.params.resultType === "only_image") return "";
    return genCopy(rec.params.theme, rec.params.customPrompt + (extra ? "\n" + extra : ""));
  }, [rec, extra]);

  const onCopy = async () => {
    if (!copyText) {
      toast.error("当前无可复制文案");
      return;
    }
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("已复制文案");
    } catch {
      toast.error("复制失败,请手动复制");
    }
  };

  const regenerate = (paramsOverride?: MomentsParams) => {
    if (!rec) return;
    if (loading) return;
    const points = getPoints();
    if (points < COST) {
      toast.error("积分不足");
      setTimeout(() => nav({ to: "/points" }), 600);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const nextParams: MomentsParams = paramsOverride ?? {
        ...rec.params,
        customPrompt: rec.params.customPrompt + (extra ? "\n" + extra : ""),
      };
      const next: MomentsRecord = {
        id: String(Date.now()),
        imageDataURL: rec.imageDataURL,
        params: nextParams,
        createdAt: Date.now(),
      };
      setCurrent(next);
      saveHistory(next);
      setPoints(points - COST);
      setRec(next);
      setExtra("");
      setLoading(false);
      toast.success("已重新生成");
    }, 1200);
  };

  if (!rec) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="text-base font-semibold text-text-primary mb-2">暂无生成结果</div>
        <div className="text-sm text-text-tertiary mb-6">请先回到创作页发起一次生成</div>
        <button
          onClick={() => nav({ to: "/moments/create" })}
          className="bg-primary text-primary-foreground rounded-full px-6 h-10 text-sm font-semibold"
        >
          去创作
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32" style={{ background: "#fafafa" }}>
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur h-12 flex items-center px-2">
        <button
          onClick={() => router.history.back()}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-text-primary">
          朋友圈创作
        </div>
        <button className="ml-auto w-10 h-10 flex items-center justify-center">
          <MoreHorizontal className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      <div className="px-4 py-4 space-y-3">
        <div className="bg-card rounded-2xl p-3 shadow-card">
          <div className="relative">
            <img
              src={rec.imageDataURL}
              alt="result"
              className={
                "w-full aspect-square object-cover rounded-xl " +
                (loading ? "opacity-50" : "")
              }
            />
            <div className="absolute top-2 left-2 bg-black/55 text-white text-[10px] rounded-full px-2 py-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI 生成
            </div>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-sm">
                生成中...
              </div>
            )}
          </div>

          {rec.params.resultType === "text_image" && (
            <div className="mt-3 bg-secondary rounded-xl p-3 text-sm text-text-primary whitespace-pre-line leading-relaxed">
              {copyText}
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <button
              onClick={onCopy}
              className="flex-1 h-10 rounded-full bg-secondary text-text-primary text-sm font-medium flex items-center justify-center gap-1.5"
            >
              <Copy className="w-4 h-4" />
              一键复制
            </button>
            <button
              onClick={() => regenerate()}
              disabled={loading}
              className="flex-1 h-10 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <RefreshCw className={"w-4 h-4 " + (loading ? "animate-spin" : "")} />
              重新生成
            </button>
          </div>
        </div>

        <div className="text-[11px] text-text-tertiary px-2">内容由 AI 生成，仅供参考</div>
      </div>

      {/* bottom input */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-[430px] mx-auto bg-card border-t border-border px-3 pt-2.5 pb-5 flex items-end gap-2">
          <textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            rows={1}
            placeholder="告诉我，你想怎么改"
            className="flex-1 bg-secondary rounded-2xl px-3.5 py-2.5 text-sm outline-none placeholder:text-text-tertiary resize-none max-h-24"
          />
          <button
            onClick={() => {
              setDraftParams(rec.params);
              setConfigOpen(true);
            }}
            className="w-10 h-10 rounded-full bg-primary-light text-primary-dark flex items-center justify-center shrink-0"
          >
            <Wand2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Sheet open={configOpen} onOpenChange={setConfigOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl max-w-[430px] mx-auto max-h-[85vh] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>调整生成配置</SheetTitle>
          </SheetHeader>
          {draftParams && (
            <div className="mt-4">
              <MomentsConfig
                value={draftParams}
                onChange={(v) => setDraftParams(v)}
              />
              <div className="mt-3">
                <ModelChip value={draftParams.model} onClick={() => setModelOpen(true)} />
              </div>
              <button
                onClick={() => {
                  setConfigOpen(false);
                  regenerate(draftParams);
                }}
                className="mt-4 w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
              >
                确认并重新生成
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={modelOpen} onOpenChange={setModelOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl max-w-[430px] mx-auto">
          <SheetHeader>
            <SheetTitle>选择生成模型</SheetTitle>
          </SheetHeader>
          {draftParams && (
            <div className="mt-4">
              <ModelPicker
                value={draftParams.model}
                onChange={(m) => {
                  setDraftParams({ ...draftParams, model: m });
                  setModelOpen(false);
                }}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}