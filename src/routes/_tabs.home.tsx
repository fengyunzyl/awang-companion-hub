import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShoppingBag, BookOpen, Layout, Eraser, FileText, Coins, ChevronRight, Users, Gift } from "lucide-react";

export const Route = createFileRoute("/_tabs/home")({
  component: Home,
  head: () => ({ meta: [{ title: "阿旺 - 首页" }] }),
});

const features = [
  { key: "moments", title: "朋友圈图文", desc: "图+文一起出", icon: Sparkles, bg: "linear-gradient(135deg,#fff1d6,#ffd693)" },
  { key: "product", title: "商品头图", desc: "突出卖点", icon: ShoppingBag, bg: "linear-gradient(135deg,#ffe5d6,#ffc098)" },
  { key: "xhs", title: "小红书封面", desc: "高点击标题", icon: BookOpen, bg: "linear-gradient(135deg,#ffd9e4,#ffb0c8)" },
  { key: "poster", title: "创意海报", desc: "一键排版", icon: Layout, bg: "linear-gradient(135deg,#e0e6ff,#b8c4ff)" },
  { key: "watermark", title: "去水印", desc: "干干净净", icon: Eraser, bg: "linear-gradient(135deg,#d6f5e5,#9be3bf)" },
  { key: "antifold", title: "朋友圈防折叠", desc: "全文露出", icon: FileText, bg: "linear-gradient(135deg,#f0e1ff,#c9a8ff)" },
];

function Home() {
  const points = typeof window !== "undefined" ? localStorage.getItem("aw_points_avail") ?? "100" : "100";
  return (
    <div className="px-4 pt-3 pb-6 min-h-screen" style={{ background: "#fafafa" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-text-primary leading-tight text-lg">阿旺</div>
        <Link
          to="/points"
          className="flex items-center gap-1.5 bg-gradient-points rounded-full pl-3 pr-1 py-1 shadow-button"
        >
          <Coins className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">{points}</span>
          <span className="bg-white/90 text-primary text-xs font-semibold rounded-full px-2 py-0.5">获取</span>
        </Link>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.key}
              to="/feature/$key"
              params={{ key: f.key }}
              className="bg-card rounded-2xl p-4 shadow-card active:scale-[0.98] transition"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: f.bg }}
              >
                <Icon className="w-5 h-5 text-text-primary" />
              </div>
              <div className="text-sm font-semibold text-text-primary">{f.title}</div>
              <div className="text-xs text-text-tertiary mt-0.5">{f.desc}</div>
            </Link>
          );
        })}
      </div>

      {/* Group + invite */}
      <div className="space-y-3">
        <div className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-dark" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-text-primary">加入商家交流群</div>
            <div className="text-xs text-text-tertiary mt-0.5">每周同行实战分享</div>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary" />
        </div>
        <Link
          to="/invite"
          className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center">
            <Gift className="w-5 h-5 text-primary-dark" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-text-primary">邀请好友 +50 积分</div>
            <div className="text-xs text-text-tertiary mt-0.5">已邀请 0 人</div>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary" />
        </Link>
      </div>
    </div>
  );
}
