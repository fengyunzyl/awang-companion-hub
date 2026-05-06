import { createFileRoute } from "@tanstack/react-router";
import { Copy, Share2 } from "lucide-react";
import { PageHeader } from "@/components/aw/PageHeader";

export const Route = createFileRoute("/invite")({
  component: Invite,
  head: () => ({ meta: [{ title: "邀请有礼" }] }),
});

function Invite() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="邀请有礼" />
      <div className="bg-gradient-brand px-6 py-10 text-white text-center">
        <div className="text-5xl mb-3">🎁</div>
        <div className="text-2xl font-bold mb-2">邀好友 拿积分</div>
        <div className="text-sm opacity-95">每邀请 1 位商家朋友,双方各得 50 积分</div>
      </div>

      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="text-sm text-text-secondary mb-3">我的邀请码</div>
          <div className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 mb-4">
            <span className="text-xl font-bold tracking-widest text-primary">AW8K2L</span>
            <button className="text-xs text-primary font-semibold flex items-center gap-1">
              <Copy className="w-3.5 h-3.5" /> 复制
            </button>
          </div>
          <button className="w-full bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button flex items-center justify-center gap-2 h-12">
            <Share2 className="w-4 h-4" />
            分享给好友
          </button>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mt-4">
          <div className="text-sm font-semibold mb-3">邀请记录</div>
          <div className="text-sm text-text-tertiary text-center py-8">
            还没有邀请记录,快去邀请吧
          </div>
        </div>
      </div>
    </div>
  );
}
