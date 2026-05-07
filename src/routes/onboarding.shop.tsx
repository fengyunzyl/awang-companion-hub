import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Link2 } from "lucide-react";

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
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          粘贴店铺链接
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          我创作的内容会更贴合你的店铺哦
        </p>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-3">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-3">
            <Link2 className="w-4 h-4 text-text-tertiary shrink-0" />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="粘贴店铺链接"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-tertiary"
            />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-xs text-text-tertiary">支持</span>
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5">
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: p.color }}
                >
                  {p.letter}
                </span>
                <span className="text-xs text-text-secondary">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-text-tertiary leading-relaxed px-1">
          右上角分享 · 复制链接,
          <span className="text-info">查看示例图</span>
        </div>
      </div>

      <button
        onClick={submit}
        className="bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button mb-3"
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
