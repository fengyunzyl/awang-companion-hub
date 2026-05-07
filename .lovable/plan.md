## 目标

为「朋友圈图文」入口构建完整创作链路：创作配置页 → 生成结果页 → 生成记录页，替换现有通用 `/feature/moments` 占位逻辑。

## 路由结构

```text
src/routes/
  moments.create.tsx     -> /moments/create   朋友圈创作（配置页）
  moments.result.tsx     -> /moments/result   生成结果页
  moments.history.tsx    -> /moments/history  生成记录列表
```

`_tabs.home.tsx` 中「朋友圈图文」入口由 `/feature/$key` 改为 `/moments/create`，其它 5 个功能保持原 `/feature/$key` 不变。

## 页面 1：/moments/create 朋友圈创作

顶部 PageHeader：标题"朋友圈创作"，右侧「记录」按钮（跳 `/moments/history`）。

模块（自上而下）：

1. **图片上传卡**：单图，支持点击选择/重新选择；预览缩略图 + 「重新上传」按钮。本地用 `URL.createObjectURL` 预览即可（无后端）。
2. **创作结果类型**（单选 chips）：`图+朋友圈文案`(默认) / `只需要图`
3. **生成模式**（单选 chips）：`智能模式`(默认) / `自定义`；选中自定义时下方展开 textarea，placeholder：`请简单输入对图片的要求,如风格、标题、副标题等内容`
4. **创作主题**（单选 chips，可横向滚动）：`日常宣传`(默认) / `新品上市` / `节日促销` / `顾客好评`
5. **图片加字开关**：`不在图片上添加文字` + Switch，独立布尔
6. **模型信息**：行项「生成模型 · 标准版 ›」，点击弹 Sheet（底部弹层）展示 3 个模型单选：
  - 标准版 — 均衡了速度和生成质量
  - 专业版（推荐 badge）— 速度稍慢,但细节更丰富
  - 轻量版 — 生成速度更快,适合快速预览
7. **底部固定 CTA 栏**：
  - 左侧文字：`预计消耗 10 积分 · 剩余 {points}`，下方小字「获取更多积分」链接 → `/points`
  - 右侧主按钮：`开始创作`

交互：

- 未上传图片：按钮禁用 + toast「请先上传图片」
- 积分不足（剩余 < 消耗）：toast「积分不足」+ 跳 `/points`
- 校验通过：将参数序列化存 `sessionStorage.aw_moments_params`（含 imageDataURL）+ 写入 history（`localStorage.aw_moments_history` 数组），跳 `/moments/result`

默认值：resultType=`text_image`，mode=`smart`，theme=`daily`，noTextOnImage=`false`，model=`standard`。

## 页面 2：/moments/history 生成记录

PageHeader：「生成记录」。

列表卡片（一行一张）：左侧上传原图缩略 + 右侧标题（取主题名 + 时间，如「日常宣传 · 5/7 14:30」）+ 右箭头。点击进入 `/moments/result?id=xxx`（从 history 中读取参数恢复）。

空态：「暂无生成记录」。

数据来源：`localStorage.aw_moments_history`，结构 `[{id, imageDataURL, params, createdAt}]`，最多保留 20 条。

## 技术细节

- 全部前端 mock，不依赖后端；积分读 `localStorage.aw_points_avail`，消耗后 `setItem` 减 10。
- 图片用 FileReader 转 dataURL 存入 sessionStorage/localStorage（单图 < 2MB 限制 + 提示）。
- 弹层用现有 `@/components/ui/sheet`；toast 用现有 sonner（`src/components/ui/sonner.tsx` 已存在）。
- 单选 chips、Switch、textarea 全部使用 `src/styles.css` 设计 token，沿用 onboarding/shop 与 _tabs.home 的卡片风格（`rounded-2xl bg-card shadow-card`）。
- 修改 `_tabs.home.tsx`：`features[0]` 直接渲染为 `<Link to="/moments/create">`，其余仍走 `/feature/$key`。

## 不在本次范围

- 真实 AI 生成接口
- 图片上传到云存储
- 朋友圈一键分享