import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/aw/PageHeader";

export const Route = createFileRoute("/shop-profile")({
  component: ShopProfile,
  head: () => ({ meta: [{ title: "店铺档案" }] }),
});

function ShopProfile() {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [link, setLink] = useState(typeof window !== "undefined" ? localStorage.getItem("aw_shop_link") ?? "" : "");
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="店铺档案" />
      <div className="px-4 py-4 space-y-3">
        {[
          { label: "店铺名称", v: name, set: setName, ph: "如:阿旺奶茶店" },
          { label: "经营品类", v: cat, set: setCat, ph: "如:奶茶 / 餐饮 / 美甲" },
          { label: "店铺链接", v: link, set: setLink, ph: "美团/点评链接" },
        ].map((f) => (
          <div key={f.label} className="bg-card rounded-2xl p-4 shadow-card">
            <div className="text-xs text-text-tertiary mb-2">{f.label}</div>
            <input
              value={f.v}
              onChange={(e) => f.set(e.target.value)}
              placeholder={f.ph}
              className="w-full bg-transparent text-sm outline-none placeholder:text-text-tertiary"
            />
          </div>
        ))}
        <button className="w-full bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button mt-4 h-12">
          保存
        </button>
      </div>
    </div>
  );
}
