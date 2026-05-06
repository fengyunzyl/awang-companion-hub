import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aw/PageHeader";

export const Route = createFileRoute("/privacy")({
  component: Page,
  head: () => ({ meta: [{ title: "隐私政策" }] }),
});

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="隐私政策" />
      <div className="px-5 py-4 text-sm text-text-secondary leading-relaxed space-y-3">
        <p>阿旺尊重并保护用户的个人隐私。</p>
        <p>1. 我们仅收集为提供服务所必需的信息(手机号、头像、店铺链接等)。</p>
        <p>2. 您上传的素材仅用于为您生成内容,不会用于其他商业用途。</p>
        <p>3. 我们采取行业标准的安全措施保护您的数据。</p>
        <p>4. 您有权随时查阅、更正、删除您的个人信息。</p>
        <p className="text-text-tertiary text-xs pt-4">本政策为示例文本</p>
      </div>
    </div>
  );
}
