import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aw/PageHeader";

export const Route = createFileRoute("/points")({
  component: Points,
  head: () => ({ meta: [{ title: "积分明细" }] }),
});

const earn = [
  { t: "邀请好友注册", p: "+50", k: "go" },
  { t: "完善店铺档案", p: "+20", k: "go" },
  { t: "每日签到", p: "+5", k: "go" },
  { t: "分享创作结果", p: "+10", k: "go" },
];
const records = [
  { t: "新人见面礼", time: "今天 14:20", p: "+100" },
  { t: "生成朋友圈图文", time: "今天 14:25", p: "-10" },
];

function Points() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="积分中心" />
      <div className="bg-gradient-points px-6 py-8 text-white text-center">
        <div className="text-xs opacity-90 mb-1">可用积分</div>
        <div className="text-5xl font-bold">100</div>
      </div>

      <div className="px-4 py-4">
        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="text-sm font-semibold mb-3">赚积分</div>
          {earn.map((e, i) => (
            <div
              key={e.t}
              className={`flex items-center justify-between py-3 ${
                i < earn.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div>
                <div className="text-sm text-text-primary">{e.t}</div>
                <div className="text-xs text-primary mt-0.5">{e.p} 积分</div>
              </div>
              <button className="text-xs bg-primary-light text-primary-dark font-semibold rounded-full px-4 py-1.5">
                去完成
              </button>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="text-sm font-semibold mb-3">最近明细</div>
          {records.map((r) => (
            <div key={r.t + r.time} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <div>
                <div className="text-sm text-text-primary">{r.t}</div>
                <div className="text-xs text-text-tertiary mt-0.5">{r.time}</div>
              </div>
              <div className={`text-sm font-semibold ${r.p.startsWith("+") ? "text-success" : "text-text-secondary"}`}>
                {r.p}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
