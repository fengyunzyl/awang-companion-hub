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
    <div
      className="min-h-screen flex flex-col px-8 pt-20 pb-10 text-center"
      style={{ background: "linear-gradient(180deg, #fff7e8 0%, #fffaf0 100%)" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="w-32 h-32 rounded-3xl flex items-center justify-center mb-8 shadow-button"
          style={{ background: "var(--gradient-points)" }}
        >
          <div className="text-center text-primary-foreground">
            <div className="text-4xl font-bold leading-none">100</div>
            <div className="text-xs mt-1 opacity-90">创作积分</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          送你 100 创作积分
        </h1>
        <p className="text-base text-text-secondary">开始创作吧～</p>
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
