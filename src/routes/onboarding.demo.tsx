import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, ImagePlus } from "lucide-react";
import demoBefore from "@/assets/demo-before.jpg";
import demoAfter from "@/assets/demo-after.jpg";
import mascot from "@/assets/awang-mascot.png";

export const Route = createFileRoute("/onboarding/demo")({
  component: Demo,
  head: () => ({ meta: [{ title: "阿旺试做一条" }] }),
});

type Msg =
  | { from: "user"; type: "text"; text: string }
  | { from: "user"; type: "image"; src: string }
  | { from: "awang"; type: "text"; text: string }
  | { from: "awang"; type: "typing" }
  | { from: "awang"; type: "result"; src: string; text: string };

const script: Msg[] = [
  { from: "user", type: "image", src: demoBefore },
  { from: "awang", type: "typing" },
  { from: "awang", type: "text", text: "收到啦,我先帮你修一下图 ✨" },
  { from: "awang", type: "typing" },
  { from: "awang", type: "text", text: "再配一段适合发朋友圈的文案~" },
  { from: "awang", type: "typing" },
  {
    from: "awang",
    type: "result",
    src: demoAfter,
    text: "今天来店里的姐妹有口福啦~ 这杯奶茶颜值在线、味道更绝,坐在窗边来一杯,阳光都变甜了 ☕✨",
  },
];

function Demo() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const done = count >= script.length;

  useEffect(() => {
    if (!started) return;
    if (done) return;
    const next = script[count];
    const delay = next?.type === "typing" ? 300 : 400;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count, done, started]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [count, started]);

  // Collapse: hide a typing bubble once the next message after it has appeared
  const visible = (started ? script.slice(0, count) : []).filter((m, i, arr) => {
    if (m.type === "typing") return i === arr.length - 1;
    return true;
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(180deg, #fff7e8 0%, #fffaf0 100%)" }}
    >
      <div className="px-6 pt-10 pb-3">
        <h1 className="text-xl font-bold text-text-primary">先看个使用示例</h1>
        <p className="text-sm text-text-secondary mt-1">修图、配文案,我来一起搞定</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {visible.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        {!started && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="w-full flex flex-col items-center justify-center gap-2 py-10 rounded-2xl border-2 border-dashed border-primary/40 bg-card/60 text-text-secondary hover:bg-card transition-colors"
          >
            <ImagePlus className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">使用示例图</span>
          </button>
        )}
      </div>

      <div className="px-6 pb-8 pt-2">
        <Link
          to="/onboarding/abilities"
          className={`rounded-full flex items-center justify-center gap-2 font-semibold text-base transition-all ${
            done
              ? "bg-primary text-primary-foreground shadow-button"
              : "bg-border text-text-tertiary pointer-events-none"
          }`}
          style={{ height: 52 }}
        >
          继续
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.from === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <img
          src={mascot}
          alt="阿旺"
          className="w-8 h-8 rounded-full object-contain bg-card shrink-0 mt-0.5"
        />
      )}
      <div
        className={`max-w-[75%] ${
          msg.type === "image" || msg.type === "result" ? "p-1.5" : "px-3.5 py-2.5"
        } rounded-2xl shadow-card text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card text-text-primary rounded-tl-sm"
        }`}
      >
        {msg.type === "text" && <span>{msg.text}</span>}
        {msg.type === "image" && (
          <img
            src={msg.src}
            alt=""
            className="w-44 h-44 object-cover rounded-xl"
            width={512}
            height={512}
          />
        )}
        {msg.type === "result" && (
          <div>
            <img
              src={msg.src}
              alt=""
              className="w-44 h-44 object-cover rounded-xl"
              width={512}
              height={512}
            />
            <p className="text-text-secondary px-2 py-2">{msg.text}</p>
          </div>
        )}
        {msg.type === "typing" && (
          <span className="flex items-center gap-1.5 text-text-tertiary">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            正在打字...
          </span>
        )}
      </div>
    </div>
  );
}
