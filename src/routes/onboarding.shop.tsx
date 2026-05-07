import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Link2, ImagePlus, X } from "lucide-react";

export const Route = createFileRoute("/onboarding/shop")({
  component: Shop,
  head: () => ({ meta: [{ title: "粘贴店铺链接" }] }),
});

function Shop() {
  const nav = useNavigate();
  const [link, setLink] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (link) localStorage.setItem("aw_shop_link", link);
    nav({ to: "/onboarding/reward" });
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setScreenshot(reader.result as string);
    reader.readAsDataURL(f);
  };

  const platforms = [
    { name: "大众点评", color: "#ffb000", letter: "点" },
    { name: "美团", color: "#ffc300", letter: "美" },
    { name: "高德", color: "#3eb6ff", letter: "高" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col px-6 pt-14 pb-10"
      style={{ background: "linear-gradient(180deg, #fff7e8 0%, #fffaf0 100%)" }}
    >
      <div className="flex-1">
        <h1 className="text-xl font-bold text-text-primary mb-2">
          粘贴店铺链接
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          我创作的内容会更贴合你的店铺哦
        </p>

        {/* Link input */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-3">
          <div className="flex items-center justify-start gap-4 mb-3 px-1">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ background: p.color }}
                >
                  {p.letter}
                </span>
                <span className="text-xs text-text-secondary">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-3">
            <Link2 className="w-4 h-4 text-text-tertiary shrink-0" />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="粘贴店铺链接"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-tertiary"
            />
          </div>
          <div className="text-xs text-text-tertiary leading-relaxed mt-3 px-1">
            右上角分享 · 复制链接,
            <span className="text-info">查看示例图</span>
          </div>
        </div>

        {/* Or upload screenshot */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-tertiary">或</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
          />
          {screenshot ? (
            <div className="relative">
              <img
                src={screenshot}
                alt="店铺截图"
                className="w-full max-h-56 object-contain rounded-xl bg-secondary"
              />
              <button
                onClick={() => setScreenshot(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center"
                aria-label="移除"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-2 py-6 rounded-xl border border-dashed border-border bg-secondary/50"
            >
              <ImagePlus className="w-6 h-6 text-text-tertiary" />
              <span className="text-sm text-text-secondary">上传店铺截图</span>
              <span className="text-xs text-text-tertiary">
                没有链接也可以,截一张店铺主页就行
              </span>
            </button>
          )}
        </div>
      </div>

      <button
        onClick={submit}
        className="bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button mb-3 mt-6"
        style={{ height: 52 }}
      >
        领取 100 创作积分
      </button>
      <button
        onClick={() => nav({ to: "/onboarding/reward" })}
        className="text-sm text-text-tertiary py-2"
      >
        以后再填
      </button>
    </div>
  );
}
