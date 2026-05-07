import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, ImageOff } from "lucide-react";
import { PageHeader } from "@/components/aw/PageHeader";
import { THEME_LABEL, getHistory, type MomentsRecord } from "@/lib/moments";

export const Route = createFileRoute("/moments/history")({
  component: History,
  head: () => ({ meta: [{ title: "生成记录" }] }),
});

function fmt(ts: number) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes(),
  ).padStart(2, "0")}`;
}

function History() {
  const [list, setList] = useState<MomentsRecord[]>([]);
  useEffect(() => {
    setList(getHistory());
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#fafafa" }}>
      <PageHeader title="生成记录" />
      <div className="px-4 py-4">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-tertiary">
            <ImageOff className="w-10 h-10 mb-3" />
            <div className="text-sm">暂无生成记录</div>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((r) => (
              <Link
                key={r.id}
                to="/moments/result"
                search={{ id: r.id }}
                className="bg-card rounded-2xl p-3 shadow-card flex items-center gap-3"
              >
                <img
                  src={r.imageDataURL}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text-primary truncate">
                    {THEME_LABEL[r.params.theme]} · {fmt(r.createdAt)}
                  </div>
                  <div className="text-xs text-text-tertiary mt-1 truncate">
                    {r.params.resultType === "text_image" ? "图+文案" : "仅图片"} ·{" "}
                    {r.params.mode === "smart" ? "智能模式" : "自定义"}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-text-tertiary shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}