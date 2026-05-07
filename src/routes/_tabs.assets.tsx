import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import coffee from "@/assets/asset-coffee.jpg";
import cake from "@/assets/asset-cake.jpg";
import bag from "@/assets/asset-bag.jpg";
import party from "@/assets/asset-party.jpg";
import flower from "@/assets/asset-flower.jpg";
import matcha from "@/assets/asset-matcha.jpg";
import lipstick from "@/assets/asset-lipstick.jpg";
import sneaker from "@/assets/asset-sneaker.jpg";
import gift from "@/assets/asset-gift.jpg";
import salad from "@/assets/upload-salad.jpg";
import ramen from "@/assets/upload-ramen.jpg";
import burger from "@/assets/upload-burger.jpg";
import shop from "@/assets/upload-shop.jpg";
import milktea from "@/assets/upload-milktea.jpg";
import icecream from "@/assets/upload-icecream.jpg";

export const Route = createFileRoute("/_tabs/assets")({
  component: Assets,
  head: () => ({ meta: [{ title: "我的作品" }] }),
});

const tagColor: Record<string, string> = {
  朋友圈: "bg-primary",
  小红书: "bg-[#ff5470]",
  商品头图: "bg-info",
  创意海报: "bg-[#7c5cff]",
  去水印: "bg-success",
};

const results = [
  { tag: "朋友圈", img: coffee },
  { tag: "小红书", img: cake },
  { tag: "商品头图", img: bag },
  { tag: "创意海报", img: party },
  { tag: "去水印", img: flower },
  { tag: "朋友圈", img: matcha },
  { tag: "小红书", img: lipstick },
  { tag: "商品头图", img: sneaker },
  { tag: "创意海报", img: gift },
];
const uploads = [salad, ramen, burger, shop, milktea, icecream];

function Assets() {
  const [tab, setTab] = useState<"r" | "u">("r");
  return (
    <div className="px-4 pt-3 pb-6">
      <div className="flex items-center gap-6 py-3 mb-3">
        {[
          { k: "r" as const, label: "创作作品" },
          { k: "u" as const, label: "历史上传" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`relative pb-1.5 text-base ${
              tab === t.k ? "text-text-primary font-bold" : "text-text-tertiary"
            }`}
          >
            {t.label}
            {tab === t.k && (
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-6 h-1 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {tab === "r" ? (
        <div className="grid grid-cols-3 gap-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl relative overflow-hidden bg-secondary"
            >
              <img
                src={r.img}
                alt={r.tag}
                loading="lazy"
                width={512}
                height={512}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute right-1 bottom-1 text-[10px] text-white px-1.5 py-0.5 rounded-md ${tagColor[r.tag]}`}
              >
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {uploads.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden bg-secondary"
            >
              <img
                src={src}
                alt="上传"
                loading="lazy"
                width={512}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/home"
          className="inline-block text-sm text-primary font-semibold"
        >
          去创作 →
        </Link>
      </div>
    </div>
  );
}
