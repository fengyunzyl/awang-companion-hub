import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import mascot from "@/assets/awang-mascot.png";

export const Route = createFileRoute("/onboarding/welcome")({
  component: Welcome,
  head: () => ({ meta: [{ title: "欢迎使用阿旺" }] }),
});

function Welcome() {
  return (
    <div
      className="min-h-screen flex flex-col px-8 py-16"
      style={{ background: "linear-gradient(180deg, #fff7e8 0%, #fffaf0 100%)" }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <img src={mascot} alt="阿旺" className="w-28 h-28 object-contain mb-6 -ml-2" />
        <h1 className="font-bold text-text-primary leading-tight mb-4 text-xl">
          嗨,我是阿旺
        </h1>
        <p className="text-base text-text-secondary leading-relaxed mb-1">
          只需要给我一张照片
        </p>
        <p className="text-base text-text-secondary leading-relaxed">
          我就可以帮你
          <span className="text-text-primary font-semibold">修图、写文案、做海报</span>
        </p>
      </div>
      <Link
        to="/onboarding/demo"
        className="bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2 font-semibold text-base shadow-button"
        style={{ height: 52 }}
      >
        先看看我能帮你什么
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
