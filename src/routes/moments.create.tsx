import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ImageIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MomentsConfig, ModelPicker, ModelChip } from "@/components/aw/MomentsConfig";
import {
  COST,
  DEFAULT_PARAMS,
  type MomentsParams,
  type MomentsRecord,
  fileToDataURL,
  genCopy,
  getPoints,
  saveHistory,
  setCurrent,
} from "@/lib/moments";

export const Route = createFileRoute("/moments/create")({
  component: Create,
  head: () => ({ meta: [{ title: "朋友圈创作" }] }),
});

function Create() {
  const nav = useNavigate();
  const router = useRouter();
  const [imageDataURL, setImageDataURL] = useState<string>("");
  const [params, setParams] = useState<MomentsParams>(DEFAULT_PARAMS);
  const [modelOpen, setModelOpen] = useState(false);
  const [points, setPts] = useState<number>(() => getPoints());

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 3 * 1024 * 1024) {
      toast.error("图片需小于 3MB");
      return;
    }
    const url = await fileToDataURL(f);
    setImageDataURL(url);
  };

  const onSubmit = () => {
    if (!imageDataURL) {
      toast.error("请先上传图片");
      return;
    }
    if (points < COST) {
      toast.error("积分不足，请先获取积分");
      setTimeout(() => nav({ to: "/points" }), 600);
      return;
    }
    const rec: MomentsRecord = {
      id: String(Date.now()),
      imageDataURL,
      params,
      createdAt: Date.now(),
    };
    setCurrent(rec);
    saveHistory(rec);
    const next = points - COST;
    localStorage.setItem("aw_points_avail", String(next));
    setPts(next);
    nav({ to: "/moments/result" });
  };

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
        <Link
          to="/moments/history"
          className="ml-auto flex items-center gap-1 text-text-secondary text-sm pr-3"
        >
          <Clock className="w-4 h-4" />
          记录
        </Link>
      </div>

      <div className="px-4 pt-2 pb-4">
        <div className="text-sm font-semibold text-text-primary mb-2.5">上传图片</div>
        <div className="bg-card rounded-2xl p-3 shadow-card mb-4">
          {imageDataURL ? (
            <div className="relative">
              <img
                src={imageDataURL}
                alt="uploaded"
                className="w-full aspect-[5/3] object-cover rounded-xl"
              />
              <label className="absolute right-2 bottom-2 bg-black/55 text-white text-xs rounded-full px-3 py-1.5 cursor-pointer">
                重新上传
                <input type="file" accept="image/*" className="hidden" onChange={onPick} />
              </label>
            </div>
          ) : (
            <label className="block cursor-pointer">
              <div className="w-full aspect-[5/3] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-text-tertiary">
                <ImageIcon className="w-7 h-7" />
                <span className="text-sm">上传图片</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={onPick} />
            </label>
          )}
        </div>

        <MomentsConfig value={params} onChange={setParams} />
      </div>

      {/* bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-[430px] mx-auto px-4 pt-3 pb-5">
          <div className="flex items-center gap-3">
            <ModelChip value={params.model} onClick={() => setModelOpen(true)} />
            <button
              onClick={onSubmit}
              disabled={!imageDataURL}
              className="flex-1 bg-gradient-points text-text-primary rounded-full font-semibold text-base shadow-button disabled:opacity-50"
              style={{ height: 48 }}
            >
              开始创作
            </button>
          </div>
          <div className="text-center text-[11px] text-text-tertiary mt-2">
            本次预计消耗 <span className="text-primary">{COST}</span> 积分，还剩 {points} 积分{" "}
            <Link to="/points" className="text-primary">获取更多积分</Link>
          </div>
        </div>
      </div>

      <Sheet open={modelOpen} onOpenChange={setModelOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl max-w-[430px] mx-auto">
          <SheetHeader>
            <SheetTitle>选择生成模型</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <ModelPicker
              value={params.model}
              onChange={(m) => {
                setParams({ ...params, model: m });
                setModelOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}