import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Link2, Pencil, Share2, Copy, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REGION, PROVINCES } from "@/lib/region";

export const Route = createFileRoute("/onboarding/shop")({
  component: Shop,
  head: () => ({ meta: [{ title: "粘贴店铺链接" }] }),
});

type ManualInfo = {
  name: string;
  category: string;
  province: string;
  city: string;
  district: string;
  address: string;
};

function Shop() {
  const nav = useNavigate();
  const [link, setLink] = useState("");
  const [manual, setManual] = useState<ManualInfo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [skipOpen, setSkipOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // dialog form state
  const [form, setForm] = useState<ManualInfo>({
    name: "",
    category: "",
    province: "",
    city: "",
    district: "",
    address: "",
  });

  const platforms = [
    { name: "大众点评", color: "#ffb000", letter: "点" },
    { name: "美团", color: "#ffc300", letter: "美" },
    { name: "高德", color: "#3eb6ff", letter: "高" },
  ];

  const openManual = () => {
    if (manual) setForm(manual);
    setDialogOpen(true);
  };

  const cities = form.province ? Object.keys(REGION[form.province] ?? {}) : [];
  const districts =
    form.province && form.city ? REGION[form.province]?.[form.city] ?? [] : [];

  const canSave =
    form.name.trim() &&
    form.category.trim() &&
    form.province &&
    form.city &&
    form.district;

  const saveManual = () => {
    if (!canSave) return;
    setManual(form);
    localStorage.setItem("aw_shop_manual", JSON.stringify(form));
    setDialogOpen(false);
  };

  const submit = () => {
    if (link) localStorage.setItem("aw_shop_link", link);
    nav({ to: "/onboarding/reward" });
  };

  const canSubmit = !!link.trim() || !!manual;

  return (
    <div
      className="min-h-screen flex flex-col px-6 pt-14 pb-10"
      style={{ background: "linear-gradient(180deg, #fff7e8 0%, #fffaf0 100%)" }}
    >
      <div className="flex-1">
        <h1 className="text-xl font-bold text-text-primary mb-2">帮我更懂你</h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          告诉我你的店铺是哪个,我创作的内容会更贴合你的需要
        </p>

        {manual ? (
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div className="text-base font-semibold text-text-primary">
                {manual.name}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={openManual}
                  className="flex items-center gap-1 text-xs text-info"
                >
                  <Pencil className="w-3.5 h-3.5" /> 编辑
                </button>
                <button
                  onClick={() => setDeleteOpen(true)}
                  className="flex items-center gap-1 text-xs text-text-tertiary"
                >
                  <Trash2 className="w-3.5 h-3.5" /> 删除
                </button>
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-text-secondary">
              <div>类目:{manual.category}</div>
              <div>
                地区:{manual.province} / {manual.city} / {manual.district}
              </div>
              {manual.address && <div>地址:{manual.address}</div>}
            </div>
          </div>
        ) : (
          <>
            <div className="bg-card rounded-2xl p-4 shadow-card mb-3">
              <div className="flex items-center justify-start gap-4 mb-3 px-1">
                {platforms.map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ background: p.color }}
                    >
                      {p.letter}
                    </span>
                    <span className="text-xs text-text-secondary">{p.name}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-text-tertiary leading-relaxed mb-3 px-1">
                打开店铺页 → 右上角分享 → 复制链接
              </div>

              {/* 示意图 */}
              <div className="rounded-xl bg-secondary/60 p-4 mb-3 flex items-center justify-around">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-sm">
                    <Share2 className="w-5 h-5 text-text-secondary" />
                  </div>
                  <span className="text-[11px] text-text-tertiary">分享</span>
                </div>
                <div className="text-text-tertiary text-xs">→</div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-sm">
                    <Copy className="w-5 h-5 text-text-secondary" />
                  </div>
                  <span className="text-[11px] text-text-tertiary">复制链接</span>
                </div>
                <div className="text-text-tertiary text-xs">→</div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[11px] text-text-tertiary">粘贴到此</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-secondary rounded-xl px-3 py-3 min-h-[96px]">
                <Link2 className="w-4 h-4 text-text-tertiary shrink-0 mt-1" />
                <textarea
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="粘贴店铺链接"
                  rows={3}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-tertiary resize-none"
                />
              </div>
            </div>

            <button
              onClick={openManual}
              className="w-full text-sm text-info py-3"
            >
              没有店铺链接？手动填写店铺信息
            </button>
          </>
        )}
      </div>

      <button
        onClick={submit}
        disabled={!canSubmit}
        className="bg-primary text-primary-foreground rounded-full font-semibold text-base shadow-button mb-3 mt-6 disabled:opacity-50"
        style={{ height: 52 }}
      >
        领取 100 创作积分
      </button>
      <button
        onClick={() => setSkipOpen(true)}
        className="text-sm text-text-tertiary py-2"
      >
        以后再填
      </button>

      {/* Manual info dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[340px] rounded-2xl !slide-in-from-left-0 !slide-in-from-top-0 !slide-out-to-left-0 !slide-out-to-top-0">
          <DialogHeader>
            <DialogTitle>填写店铺信息</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-text-tertiary mb-1.5">店铺名称</div>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="如:阿旺奶茶店"
              />
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1.5">店铺类目</div>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="如:奶茶 / 餐饮 / 美甲"
              />
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1.5">所在地区</div>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={form.province}
                  onValueChange={(v) =>
                    setForm({ ...form, province: v, city: "", district: "" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="省" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={form.city}
                  onValueChange={(v) =>
                    setForm({ ...form, city: v, district: "" })
                  }
                  disabled={!form.province}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="市" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={form.district}
                  onValueChange={(v) => setForm({ ...form, district: v })}
                  disabled={!form.city}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="区" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1.5">详细地址</div>
              <Textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="街道、门牌号等"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              className="flex-1"
              onClick={saveManual}
              disabled={!canSave}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Skip confirm */}
      <AlertDialog open={skipOpen} onOpenChange={setSkipOpen}>
        <AlertDialogContent className="max-w-[320px] rounded-2xl !slide-in-from-left-0 !slide-in-from-top-0 !slide-out-to-left-0 !slide-out-to-top-0">
          <AlertDialogHeader>
            <AlertDialogTitle>确认跳过？</AlertDialogTitle>
            <AlertDialogDescription>生成的内容可能无法贴合店铺，确认跳过？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2">
            <AlertDialogCancel className="flex-1 mt-0">取消</AlertDialogCancel>
            <AlertDialogAction
              className="flex-1"
              onClick={() => nav({ to: "/onboarding/reward" })}
            >
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirm */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="max-w-[320px] rounded-2xl !slide-in-from-left-0 !slide-in-from-top-0 !slide-out-to-left-0 !slide-out-to-top-0">
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除？</AlertDialogTitle>
            <AlertDialogDescription>删除后店铺信息将被清空，需要重新填写。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2">
            <AlertDialogCancel className="flex-1 mt-0">取消</AlertDialogCancel>
            <AlertDialogAction
              className="flex-1"
              onClick={() => {
                setManual(null);
                localStorage.removeItem("aw_shop_manual");
                setForm({
                  name: "",
                  category: "",
                  province: "",
                  city: "",
                  district: "",
                  address: "",
                });
                setDeleteOpen(false);
              }}
            >
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
