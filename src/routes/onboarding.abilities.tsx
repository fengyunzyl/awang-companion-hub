import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layout, Eraser } from "lucide-react";

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
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          这些我也能帮你
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          除了图文内容,这些小事也可以交给我
        </p>

        <div className="space-y-5">
          <div className="flex items-start gap-4 py-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
              <Layout className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-text-primary mb-1">
                海报也能做
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                上传实拍图,我帮你自动排成海报
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 py-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
              <Eraser className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-text-primary mb-1">
                水印也能去
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                图上的小水印,点一下就干净了
              </p>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/onboarding/shop"
        className="bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2 font-semibold text-base shadow-button"
        style={{ height: 52 }}
      >
        继续
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}