import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import demoBefore from "@/assets/demo-before.jpg";
import demoAfter from "@/assets/demo-after.jpg";

export const Route = createFileRoute("/onboarding/abilities")({
  component: Abilities,
  head: () => ({ meta: [{ title: "我还能做什么" }] }),
});

function Abilities() {
  return (
    <div
      className="min-h-screen flex flex-col px-6 py-12"
      style={{ background: "linear-gradient(180deg, #fff7e8 0%, #fffaf0 100%)" }}
    >
      <div className="flex-1">
        <h1 className="text-xl font-bold text-text-primary mb-2">
          这些我也能帮你
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          除了图文内容,这些小事也可以交给我
        </p>

        <div className="space-y-4">
          <AbilityCard
            title="海报也能做"
            desc="上传实拍图,我帮你自动排成海报"
            before={demoBefore}
            after={demoAfter}
          />
          <AbilityCard
            title="水印也能去"
            desc="图上的小水印,点一下就干净了"
            before={demoBefore}
            after={demoAfter}
          />
        </div>
      </div>

      <Link
        to="/onboarding/shop"
        className="mt-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2 font-semibold text-base shadow-button"
        style={{ height: 52 }}
      >
        继续
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function AbilityCard({
  title,
  desc,
  before,
  after,
}: {
  title: string;
  desc: string;
  before: string;
  after: string;
}) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card">
      <div className="text-base font-semibold text-text-primary mb-1">
        {title}
      </div>
      <p className="text-sm text-text-secondary mb-3">{desc}</p>
      <div className="grid grid-cols-2 gap-2">
        <Thumb src={before} label="原图" />
        <Thumb src={after} label="成品" highlight />
      </div>
    </div>
  );
}

function Thumb({
  src,
  label,
  highlight,
}: {
  src: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
        <img src={src} alt={label} className="w-full h-full object-cover" />
      </div>
      <div
        className={`text-xs mt-1.5 text-center ${
          highlight ? "text-primary-dark font-medium" : "text-text-tertiary"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
