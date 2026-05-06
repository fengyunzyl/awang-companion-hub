import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Link2, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/onboarding/shop")({
  component: Shop,
  head: () => ({ meta: [{ title: "粘贴店铺链接" }] }),
});

function Shop() {
  const nav = useNavigate();
  const [link, setLink] = useState("");
  const submit = () => {
    if (link) localStorage.setItem("aw_shop_link", link);
    nav({ to: "/onboarding/reward" });
  };
  return (
    <div className="min-h-screen flex flex-col bg-background px-6 pt-14 pb-10">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-text-primary mb-3">
          粘贴店铺链接
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-8">
          我创作的内容会更贴合你的店铺哦
        </p>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="text-xs text-text-tertiary mb-3">
            支持 大众点评 / 美团 / 高德
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
          <button className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-text-secondary bg-secondary rounded-xl py-3">
            <ImageIcon className="w-4 h-4" />
            上传店铺页截图
          </button>
        </div>

        <div className="text-xs text-text-tertiary leading-relaxed">
          右上角分享 · 复制链接,
          <span className="text-info">查看示例图</span>
        </div>
      </div>

      <button
        onClick={submit}
        className="bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button mb-3"
        style={{ height: 52 }}
      >
        领取见面礼
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
