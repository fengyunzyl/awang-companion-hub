import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Link2, ImagePlus, X } from "lucide-react";
import { PageHeader } from "@/components/aw/PageHeader";

export const Route = createFileRoute("/shop-link")({
  component: ShopLink,
  head: () => ({ meta: [{ title: "店铺档案" }] }),
});

function ShopLink() {
  const router = useRouter();
  const [link, setLink] = useState(
    typeof window !== "undefined" ? localStorage.getItem("aw_shop_link") ?? "" : ""
  );
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    if (link) localStorage.setItem("aw_shop_link", link);
    router.history.back();
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
    <div className="min-h-screen flex flex-col" style={{ background: "#fafafa" }}>
      <PageHeader title="店铺档案" />
      <div className="flex-1 flex flex-col px-6 pt-6 pb-10">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-text-primary mb-2">帮我更懂你</h1>
          <p className="text-sm text-text-secondary leading-relaxed mb-5">
            告诉我你的店铺是哪个,我创作的内容会更贴合你的需要
          </p>

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

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-tertiary">不方便复制？</span>
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
          onClick={save}
          className="bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button mt-6"
          style={{ height: 52 }}
        >
          保存
        </button>
      </div>
    </div>
  );
}