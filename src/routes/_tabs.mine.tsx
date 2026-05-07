import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Gift, Store, FileText, Shield } from "lucide-react";

export const Route = createFileRoute("/_tabs/mine")({
  component: Mine,
  head: () => ({ meta: [{ title: "我的" }] }),
});

function Mine() {
  return (
    <div className="pt-12 pb-6">
      <div className="px-5 flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-3xl shadow-card">
          🐶
        </div>
      </div>

      <div className="px-4">
        <div className="bg-gradient-points rounded-2xl p-5 text-white shadow-card mb-4">
          <div className="flex items-center justify-between mb-4 py-[12px]">
            <span className="text-sm opacity-95">我的积分</span>
            <Link to="/points" className="text-xs bg-white/25 rounded-full px-3 py-1">
              明细 ›
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { k: "总积分", v: "100" },
              { k: "可用积分", v: "100" },
              { k: "每日积分", v: "0" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-2xl font-bold">{s.v}</div>
                <div className="text-xs opacity-90 mt-0.5">{s.k}</div>
              </div>
            ))}
          </div>
          <button className="w-full bg-white text-primary text-sm font-semibold rounded-full py-2.5">
            去赚积分
          </button>
        </div>

        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {[
            { to: "/invite" as const, icon: Gift, label: "邀请有礼", sub: "+50 积分/人" },
            { to: "/shop-profile" as const, icon: Store, label: "店铺档案", sub: "未完善" },
            { to: "/agreement" as const, icon: FileText, label: "用户协议", sub: "" },
            { to: "/privacy" as const, icon: Shield, label: "隐私政策", sub: "" },
          ].map((it, i, arr) => {
            const Icon = it.icon;
            return (
              <Link
                key={it.label}
                to={it.to}
                className={`flex items-center gap-3 px-4 border-b border-border border-none py-[20px]`}
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="flex-1 text-sm text-text-primary">{it.label}</span>
                {it.sub && <span className="text-xs text-text-tertiary">{it.sub}</span>}
                <ChevronRight className="w-4 h-4 text-text-tertiary" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
