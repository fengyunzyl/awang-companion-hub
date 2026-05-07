import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import demoBefore from "@/assets/demo-before.jpg";
import demoAfter from "@/assets/demo-after.jpg";

export const Route = createFileRoute("/onboarding/demo")({
  component: Demo,
  head: () => ({ meta: [{ title: "阿旺试做一条" }] }),
});

const steps = ["收到图片啦", "正在修图", "正在配文案", "已经帮你做好了"];

function Demo() {
  const [step, setStep] = useState(0);
  const done = step >= steps.length - 1;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [step, done]);

  return (
    <div
      className="min-h-screen flex flex-col px-6 py-10"
      style={{ background: "linear-gradient(180deg, #fff7e8 0%, #fffaf0 100%)" }}
    >
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          我先做一条给你看
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          修图、配文案,我来一起搞定
        </p>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <div className="text-xs text-text-tertiary mb-2 text-center">原图</div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary shadow-card">
              <img
                src={demoBefore}
                alt="原图"
                className="w-full h-full object-cover"
                width={768}
                height={768}
              />
            </div>
          </div>
          <div>
            <div className="text-xs text-primary-dark font-medium mb-2 text-center">
              成品
            </div>
            <div
              className={`aspect-square rounded-2xl overflow-hidden bg-secondary shadow-card relative transition-opacity duration-500 ${
                done ? "opacity-100" : "opacity-40"
              }`}
            >
              <img
                src={demoAfter}
                alt="成品"
                className="w-full h-full object-cover"
                width={768}
                height={768}
                loading="lazy"
              />
              {!done && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/40 backdrop-blur-[2px]">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="space-y-2.5">
            {steps.map((s, i) => {
              const active = i === step && !done;
              const finished = i < step || done;
              return (
                <div
                  key={s}
                  className={`flex items-center gap-2.5 text-sm transition-colors ${
                    finished
                      ? "text-text-primary"
                      : active
                        ? "text-primary-dark"
                        : "text-text-tertiary"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {finished ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : active ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    )}
                  </span>
                  {s}
                </div>
              );
            })}
          </div>
        </div>

        {done && (
          <div className="bg-primary-light rounded-2xl p-4 text-sm text-text-primary leading-relaxed">
            <div className="font-semibold text-primary-dark mb-1.5">
              图和文案都配好了
            </div>
            <p className="text-text-secondary">
              今天来店里的姐妹有口福啦~ 这杯奶茶颜值在线、味道更绝,
              坐在窗边来一杯,阳光都变甜了 ☕✨ 发朋友圈直接就能用。
            </p>
          </div>
        )}
      </div>

      <Link
        to="/onboarding/abilities"
        className={`mt-5 rounded-full flex items-center justify-center gap-2 font-semibold text-base transition-all ${
          done
            ? "bg-primary text-primary-foreground shadow-button"
            : "bg-border text-text-tertiary pointer-events-none"
        }`}
        style={{ height: 52 }}
      >
        继续看看
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}