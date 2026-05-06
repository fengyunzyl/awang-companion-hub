import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/reward")({
  component: Reward,
  head: () => ({ meta: [{ title: "见面礼" }] }),
});

function Reward() {
  const nav = useNavigate();
  const start = () => {
    localStorage.setItem("aw_onboarded", "1");
    localStorage.setItem("aw_points_total", "100");
    localStorage.setItem("aw_points_avail", "100");
    nav({ to: "/home" });
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-primary px-8 pt-20 pb-10 text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-7xl mb-6 animate-bounce">🎁</div>
        <h1 className="text-2xl font-bold text-text-primary mb-3">
          阿旺准备好了!
        </h1>
        <p className="text-base text-text-secondary mb-8">
          送你 <span className="text-primary font-bold text-xl">100</span> 积分当见面礼
        </p>
        <div className="bg-card/80 backdrop-blur rounded-2xl px-6 py-5 text-sm text-text-secondary leading-relaxed">
          以后想做图、写文案,<br />随时来找我
        </div>
      </div>
      <button
        onClick={start}
        className="bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button"
        style={{ height: 52 }}
      >
        开始创作
      </button>
    </div>
  );
}
