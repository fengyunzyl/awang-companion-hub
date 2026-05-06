# 阿旺 H5 移动端原型 · 实施计划

## 目标

做一个**可点击的移动端 H5 高保真原型**，等比还原微信小程序「阿旺」的核心交互与视觉，方便后续转小程序开发。本轮**只做 UI/交互**，不接 AI、不启用 Cloud，全部用本地 mock 数据。

## 视觉与设计系统

将《设计规则.md》中的 token 移植到 `src/styles.css`：

- 主色 `#fc9730` 橙色系（primary / primary-light `#ffedcc` / primary-dark `#ff8b16`）
- 主渐变 `linear-gradient(90deg, #ffeda7, #ffe3cd)`
- 文字三级灰：`#333 / #666 / #999`，背景 `#f5f5f5` / 卡片白
- 圆角 sm/md/lg/xl = 4/8/12/16 px，按钮多用 xl 与 full（胶囊）
- 字号体系 22→48 rpx，移动端按 1rpx ≈ 0.5px 折算
- 阴影：button `0 0 12px rgba(0,0,0,.15)`、卡片 md/lg
- 字体：系统字体（PingFang / 苹方），标题加粗

整体调性：明亮、温暖、商家友好，避免泛 AI 紫色渐变。

## 页面结构（路由）

```
src/routes/
  __root.tsx          ← html shell + meta
  index.tsx           ← 启动判断：未引导→/onboarding/welcome；已引导→/home
  onboarding.welcome.tsx        Step 0 欢迎页
  onboarding.features.tsx       Step 1 三张能力卡片（左右滑）
  onboarding.shop.tsx           Step 2 店铺链接
  onboarding.reward.tsx         Step 3 100 积分见面礼
  _tabs.tsx                     带底部 TabBar 的布局
  _tabs.home.tsx                /home  首页
  _tabs.assets.tsx              /assets 资产（创作结果 / 历史上传 切换）
  _tabs.mine.tsx                /mine  我的
  feature.$key.tsx              六大功能详情占位页（朋友圈图文/商品头图/小红书封面/创意海报/去水印/防折叠）
  invite.tsx                    邀请有礼
  shop-profile.tsx              店铺档案
  points.tsx                    积分明细 & 获取入口
```

引导是否完成、积分、店铺信息、资产九宫格 mock，全部存 `localStorage`。

## 关键页面设计

**首页 /home**

- 顶部条：左「阿旺」logo 文字 ；右侧积分胶囊（icon + 数字 + "获取" 入口）
- 主 banner：橙色渐变卡片 + 阿旺吉祥物占位（用 emoji/SVG 占位，可后期替换）
- 功能宫格：2 列 × 3 行 6 个功能，圆角卡片 + 彩色图标 + 标题 + 一句副标
- 加群入口卡片（带二维码占位）
- 邀请入口卡片（带"再邀 1 人 +50 积分"提示）

**资产 /assets**

- 顶部 Tab：创作结果 / 历史上传
- 九宫格：3 列正方形图片卡，右下角彩色场景标签（朋友圈/小红书/商品头图/创意海报/去水印）
- 空态：插画 + "去创作"按钮

**我的 /mine**

- 头像 + 脱敏手机号 138****1234
- 积分卡片（橙色渐变）：总积分 / 可用 / 每日 + 明细入口 + 获取按钮
- 列表项：邀请有礼 / 店铺档案 / 用户协议 / 隐私政策

**新用户引导 4 步**

- 全屏卡片化、底部主按钮（橙色胶囊带阴影）
- 这里是不是缺了欢迎页？
  ```Plain
  嗨，我是阿旺 👋

  帮你做海报、写文案的小帮手
  给我一张照片，30秒就能出内容

  [ 看看我能做什么 → ]
  ```
- Step 1 三卡片用横向 swiper（embla-carousel）
- Step 2 输入框 + "上传截图" + 主按钮"领取见面礼"，弱按钮"以后再填"
- Step 3 完成动画 + "开始创作"

**底部 TabBar**

- 三 Tab：首页 / 资产 / 我的
- 选中态橙色 + 顶部细线高亮，未选中灰

## 技术细节

- TanStack Router 文件路由；`_tabs.tsx` 作为带 TabBar 的 layout，children 走 `<Outlet />`
- 视口包裹：在 `__root.tsx` body 加 `mx-auto max-w-[430px]` 居中模拟手机宽度，灰色背景两侧
- `<meta viewport>` 已在 root；增加 PWA 友好 theme-color = #fc9730
- 复用 shadcn `button / card / dialog / sheet / tabs`，但所有颜色走橙色主题 token
- 图标用 `lucide-react`（Sparkles / ShoppingBag / Image / Layout / Eraser / FileText / Gift / Users / Store）
- 占位图片：用 CSS 渐变方块 + emoji，避免外部依赖
- 路由守卫：`index.tsx` 读取 `localStorage.aw_onboarded`，未完成跳引导，已完成跳 `/home`

## 不在本轮范围

- AI 真实生成（功能详情页只做表单 + "生成中" loading + 假结果）
- 微信授权、登录、后端、积分实时变动
- 微信小程序源代码（Lovable 不支持）

## 验收

- 在 430px 宽视口下浏览全部 4 个引导页 + 3 个 Tab + 6 个功能详情入口，无样式错乱、路由可达、回退正常