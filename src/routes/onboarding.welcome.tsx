import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/welcome")({
  component: Welcome,
  head: () => ({ meta: [{ title: "欢迎使用阿旺" }] }),
});

function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-primary px-8 py-16">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-7xl mb-8">👋</div>
        <h1 className="text-3xl font-bold text-text-primary leading-tight mb-4">
          嗨,我是阿旺
        </h1>
        <p className="text-base text-text-secondary leading-relaxed mb-2">
          帮你做海报、写文案的小帮手
        </p>
        <p className="text-base text-text-secondary leading-relaxed">
          给我一张照片,30 秒就能出内容
        </p>
      </div>
      <Link
        to="/onboarding/features"
        className="bg-primary text-primary-foreground rounded-full h-13 flex items-center justify-center gap-2 font-semibold text-base shadow-button"
        style={{ height: 52 }}
      >
        看看我能做什么
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
