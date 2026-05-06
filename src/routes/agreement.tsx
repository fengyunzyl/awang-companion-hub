import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aw/PageHeader";

export const Route = createFileRoute("/agreement")({
  component: Page,
  head: () => ({ meta: [{ title: "用户协议" }] }),
});

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="用户协议" />
      <div className="px-5 py-4 text-sm text-text-secondary leading-relaxed space-y-3">
        <p>欢迎使用阿旺。本协议为您与阿旺之间就使用本服务订立的协议。</p>
        <p>1. 您应当为完全民事行为能力人,或在监护人陪同下使用本服务。</p>
        <p>2. 您理解并同意,我们提供的内容生成服务为辅助工具,生成结果仅供参考。</p>
        <p>3. 您应保证上传素材的合法合规,不得侵犯他人著作权、肖像权等。</p>
        <p>4. 我们保留在必要时调整积分体系、功能模块的权利。</p>
        <p className="text-text-tertiary text-xs pt-4">本协议为示例文本</p>
      </div>
    </div>
  );
}
