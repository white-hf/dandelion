# Dandelion 官网产品设计与 UI 原型

**文档版本:** 1.0
**编写日期:** 2026-05-20
**对象:** Dandelion Growth Systems 官网客户方案
**角色假设:** 你是客户，我作为产品经理、网站架构师、UI/UX 设计师交付方案供 review。
**相关文档:** [Product Strategy](Product_Strategy.md), [Company Website PRD](Company_Website_PRD.md), [Customer Website Experience Standard](Customer_Website_Experience_Standard.md)

---

## 1. 方案目标

Dandelion 官网不应像一个功能很多的软件官网，而应像一个能让 SMB owner 立刻信任、愿意提交需求的专业服务网站。

本方案的核心目标：

- 5 秒内让访客感觉专业、可信、不是模板站。
- 30 秒内说明我们解决什么问题：网站无法带来可跟进的线索。
- 让客户理解我们不是重型 SaaS，而是“更好的网站 + 简单跟进闭环”。
- 把 `Get a Free Growth Audit` 作为最重要的转化动作。
- 用 HVAC 页面作为第一个可销售行业样板。
- 后台只作为 Lead Inbox 预览出现，不抢走客户网站主角地位。

## 2. 客户画像与购买心理

目标客户不是软件采购经理，而是忙碌的本地 SMB owner。

他们关心：

- 我的网站看起来是否专业？
- 能不能带来更多电话、预约、报价？
- 我有没有时间学一个新系统？
- 这个供应商是否懂我的行业？
- 线索来了以后我是否能及时看到并跟进？

他们不关心：

- 系统有多少功能。
- 后台是否像完整 CRM。
- 是否有复杂报表。
- 是否能配置所有字段和权限。

所以官网必须用客户语言表达：更多询价、更快跟进、更专业的网站、更少操作负担。

## 3. 推荐视觉方向

### 3.1 设计概念

推荐方向：**Warm Operator Studio**

关键词：

- 专业但不冷冰冰。
- 有本地服务行业的真实感。
- 像一家认真做增长系统的精品工作室，不像通用 SaaS 模板。
- 温暖、可信、清楚、有行动力。

### 3.2 视觉系统

颜色：

| Token | 用途 | 色值建议 |
| --- | --- | --- |
| Ink | 标题、主按钮、深色卡片 | `#17211B` |
| Cream | 页面底色 | `#F7F1E4` |
| Wheat | 柔和区块背景 | `#E9D6B7` |
| Moss | 信任、稳定、辅助按钮 | `#5F7D5F` |
| Ember | CTA、强调、转化动作 | `#C46A3B` |
| Porcelain | 表单和内容卡片 | `#FFF9EF` |

字体方向：

- 标题：编辑感、温暖、有品牌感的 display serif 或 rounded display。
- 正文：易读的人文无衬线。
- 避免默认 SaaS 字体栈造成“模板感”。

视觉元素：

- 背景使用柔和纸张质感、暖色径向光、细微网格或地图线条。
- 卡片圆角可以保留，但要减少“全站都是同一种卡片”的重复感。
- 使用业务流程图、lead card、通知卡片作为产品插画，而不是抽象 3D 图。
- 行业页要加入行业视觉符号，例如 HVAC 的服务车、冷暖气流线、服务区域、紧急响应。

## 4. 信息架构

主导航建议：

```text
Dandelion
Services | Industries | Demo | Pricing
Primary CTA: Free Growth Audit
```

页面结构：

| 页面 | 主要任务 | Primary CTA |
| --- | --- | --- |
| Home | 建立定位、信任和主转化 | Get a Free Growth Audit |
| Services | 解释我们交付什么，不是堆功能 | See What We Build |
| Industries | 展示行业化能力 | Choose Your Industry |
| HVAC | 第一个行业网站样板 | Request an HVAC Quote Demo |
| Demo | 展示访客到 owner 跟进闭环 | Walk Through the Loop |
| Pricing | 降低购买不确定性 | Start With an Audit |
| Privacy | 建立数据使用信任 | Contact Us |

## 5. 首页 UI 原型

### 5.1 Desktop Wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Dandelion Growth Systems         Services Industries Demo Pricing [Audit]  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  [More practical than a template. Lighter than enterprise software.]        │
│                                                                            │
│  A better website for local businesses                                      │
│  that need more calls, quotes, and faster follow-up.                        │
│                                                                            │
│  We design professional websites with the simple lead loop behind them:     │
│  forms, notifications, source tracking, and a small Lead Inbox.             │
│                                                                            │
│  [Get a Free Growth Audit] [See a Live Demo]                                │
│                                                                            │
│                                            ┌────────────────────────────┐  │
│                                            │ Today’s lead loop          │  │
│                                            │ New audit request          │  │
│                                            │ Source: Google / HVAC      │  │
│                                            │ Next step: call today      │  │
│                                            │ [View Lead Inbox Preview]  │  │
│                                            └────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────┤
│ Proof strip: Built for SMBs | 7-10 day launch | No heavy CRM | Mobile-first│
├────────────────────────────────────────────────────────────────────────────┤
│ Problem: Your website may look fine, but follow-up is leaking revenue.      │
│ Three cards: unclear CTA | weak forms | buried leads                        │
├────────────────────────────────────────────────────────────────────────────┤
│ The simple loop: Website -> Quote/Booking -> Notification -> Lead Inbox     │
├────────────────────────────────────────────────────────────────────────────┤
│ What we build: Website / Quote path / Booking path / Review path / Snapshot│
├────────────────────────────────────────────────────────────────────────────┤
│ Industry samples: HVAC featured large, Dental/Immigration smaller          │
├────────────────────────────────────────────────────────────────────────────┤
│ Demo preview: Visitor view on left, owner view on right                     │
├────────────────────────────────────────────────────────────────────────────┤
│ Pricing: Launch / Growth / Managed Ops                                     │
├────────────────────────────────────────────────────────────────────────────┤
│ Audit form: short, guided, next-step success message                        │
└────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Mobile Wireframe

```text
┌────────────────────────────┐
│ Dandelion          [Audit] │
├────────────────────────────┤
│ A better website for local │
│ businesses that need more  │
│ calls, quotes, follow-up.  │
│                            │
│ [Free Growth Audit]        │
│ [See Demo]                 │
├────────────────────────────┤
│ Lead loop card             │
│ New lead -> Call today     │
├────────────────────────────┤
│ Proof strip, horizontal    │
├────────────────────────────┤
│ Problem cards stacked      │
├────────────────────────────┤
│ Simple loop, 4 steps       │
├────────────────────────────┤
│ HVAC sample                │
├────────────────────────────┤
│ Audit form                 │
└────────────────────────────┘
Sticky bottom: [Get Audit]
```

### 5.3 首页关键文案

Hero headline:

> A better website for local businesses that need more calls, quotes, and faster follow-up.

Hero subheadline:

> We design professional websites with the simple lead loop behind them: focused pages, quote and booking forms, owner notifications, source tracking, and a small Lead Inbox.

Primary CTA:

> Get a Free Growth Audit

Secondary CTA:

> See a Live Demo

Trust strip:

- Built for local service businesses
- Launch-ready in 7-10 days
- No heavy CRM to learn
- Mobile-first by default

## 6. 核心区块设计

### 6.1 Problem Section

目标：让客户感觉“这说的是我”。

布局：

```text
Section title: Your website may look fine, but follow-up is leaking revenue.

[Unclear next action]
Visitors do not know whether to call, book, request a quote, or wait.

[Weak intake]
Generic forms miss the details owners need before calling back.

[Buried leads]
New opportunities disappear inside email, voicemail, or spreadsheets.
```

交互：

- 桌面端三卡横排。
- 手机端堆叠，第一张卡默认高亮。
- 每张卡底部有小型 “Fix: ...” 提示，例如 `Fix: One clear CTA per page`。

### 6.2 Business Loop Section

目标：解释我们真正卖的是闭环，而不是“网页”。

```text
1. Professional website
   A page that explains the offer and earns trust.

2. Quote or booking path
   A short form that matches the actual sales conversation.

3. Owner notification
   The business receives a clear next action quickly.

4. Lead Inbox
   Status, notes, source, and follow-up stay visible.
```

设计：

- 使用横向流程线或阶梯式布局。
- 第 4 步不要叫 CRM，叫 Lead Inbox。
- 每一步旁边用小 UI 卡片展示真实系统片段。

### 6.3 Services Section

目标：把服务讲成客户能买的结果，不讲模块清单。

建议卡片：

| 服务 | 客户理解方式 |
| --- | --- |
| Professional Website | A site that makes you look credible and easy to contact |
| Quote Request Flow | A form that collects the details you need to call back |
| Booking Path | A simple way for serious visitors to schedule |
| Lead Inbox Lite | A small place to see and follow up with new leads |
| Conversion Snapshot | A monthly view of where leads came from |
| Managed Updates | Ongoing improvement without hiring a marketer |

### 6.4 Demo Preview

目标：让客户不需要销售解释也理解产品。

布局：

```text
Left: Visitor View
- HVAC landing page
- Request a quote CTA
- Quote form

Right: Owner View
- New lead notification
- Lead Inbox card
- Suggested next action
```

标记：

- `Real today`: form submit, lead capture, event tracking, protected admin.
- `Configurable`: industry fields, CTA copy, service pages.
- `Optional later`: SMS, calendar webhook, review automation.

## 7. HVAC 行业页 UI 原型

HVAC 页面不应像“功能 demo”，而应像真实 HVAC 客户网站样板。

### 7.1 页面目标

- 让 HVAC owner 看到“这就是我的客户需要的网站”。
- 展示紧急维修、安装、维护、报价请求等具体场景。
- 表单收集报价必需信息。
- 手机端突出 call 和 quote 两个动作。

### 7.2 Desktop Wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Dandelion / HVAC Sample                                     [Build Mine]   │
├────────────────────────────────────────────────────────────────────────────┤
│ HVAC websites that turn service searches into quote-ready leads.           │
│                                                                            │
│ For repair, installation, maintenance, and emergency service teams.         │
│ [Request Quote Demo] [See Owner View]                                      │
│                                            Emergency? Quote card           │
├────────────────────────────────────────────────────────────────────────────┤
│ Trust strip: Licensed-ready | Service area | Fast response | Review-ready  │
├────────────────────────────────────────────────────────────────────────────┤
│ Services: Repair | Installation | Maintenance | Emergency                  │
├────────────────────────────────────────────────────────────────────────────┤
│ Quote flow: Problem -> Equipment -> Urgency -> Contact -> Owner follow-up  │
├────────────────────────────────────────────────────────────────────────────┤
│ Quote form with HVAC-specific fields                                       │
└────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 HVAC Hero Copy

Headline:

> HVAC websites that turn service searches into quote-ready leads.

Subheadline:

> Built for repair, installation, maintenance, and emergency service teams that need clear quote requests and faster follow-up without heavy field-service software.

CTA:

> Request a Quote Demo

Secondary:

> See the Owner View

### 7.4 HVAC Form Fields

Keep the form short:

- Name
- Email
- Phone
- Service type: repair / installation / maintenance / emergency
- Urgency: today / this week / planning ahead
- Property type
- Short description
- Consent checkbox

Success message:

> Thanks. In a real customer site, this request would notify the owner and appear in the Lead Inbox with the service type, urgency, source, and next action.

## 8. Form UX 原型

表单是转化核心，不应只是字段列表。

### 8.1 Form Layout

```text
┌────────────────────────────────────────────┐
│ Get a Free Growth Audit                    │
│ Tell us enough to understand your current  │
│ website and follow-up gap.                 │
│                                            │
│ Business name *                            │
│ [________________________________]         │
│                                            │
│ Your name *        Email *                 │
│ [____________]     [____________]          │
│                                            │
│ Website URL        Industry                │
│ [____________]     [select_____]           │
│                                            │
│ What is not working today? *               │
│ [________________________________]         │
│                                            │
│ [ ] I agree to be contacted about my audit │
│                                            │
│ [Request My Free Audit]                    │
└────────────────────────────────────────────┘
```

### 8.2 States

Loading:

- Button text: `Sending your audit request...`
- Disable fields only during submit.

Success:

- Title: `Audit request received.`
- Body: `We will review your website, lead path, and follow-up gap. If it looks like a fit, we will reply with the next step.`
- Secondary action: `See the demo while you wait`

Validation:

- Field-level errors, not only top banner.
- Backend 422 errors translated to plain language.
- Checkbox errors must explain consent is required before contact.

## 9. Lead Inbox Preview

后台只能作为支撑，不作为首页主角。

### 9.1 Owner View Prototype

```text
┌──────────────────────────────────────────────────────┐
│ Lead Inbox                                           │
├──────────────────────────────────────────────────────┤
│ New lead                                             │
│ Halifax HVAC Co.                                     │
│ Needs: emergency repair                              │
│ Source: Google Ads / HVAC page                       │
│ Next step: call today                                │
│ [Mark Contacted] [Add Note]                          │
├──────────────────────────────────────────────────────┤
│ Timeline                                             │
│ 10:42 Form submitted                                 │
│ 10:42 Owner notification sent                        │
│ 10:44 Status changed to contacted                    │
└──────────────────────────────────────────────────────┘
```

### 9.2 UX 边界

必须避免：

- Pipeline 拖拽。
- 多角色权限。
- 自定义字段管理界面。
- 复杂报表。
- 自动化规则编辑器。

R0.x 只做 owner 每天会用的 5 件事：

- 看新线索。
- 看需求和联系方式。
- 标记状态。
- 写备注。
- 导出 CSV。

## 10. 交互动效建议

动效要克制，只服务理解：

- 首页首屏：hero 文案和 lead card 轻微错位进入。
- Business loop：滚动到区域时 4 个步骤依次出现。
- 表单：成功状态用温和转场替换表单。
- 移动端 sticky CTA：滚动超过首屏后出现。
- 不做大面积视差和复杂动画，避免影响性能和专业感。

## 11. 开发实现建议

### 11.1 组件拆分

建议新增或重构：

```text
components/site/Header.tsx
components/site/HeroLeadLoop.tsx
components/site/ProofStrip.tsx
components/site/ProblemCards.tsx
components/site/BusinessLoop.tsx
components/site/ServiceOutcomeGrid.tsx
components/site/IndustryShowcase.tsx
components/site/DemoPreview.tsx
components/site/PricingSnapshot.tsx
components/site/StickyMobileCta.tsx
components/forms/FormRenderer.tsx
components/inbox/LeadInboxPreview.tsx
```

### 11.2 CSS 与设计 token

建议把现有全局样式升级为明确 token：

```text
--color-ink
--color-cream
--color-wheat
--color-moss
--color-ember
--color-porcelain
--shadow-soft
--radius-card
--radius-panel
--section-space
```

### 11.3 页面优先级

开发顺序：

1. Home visual and narrative redesign。
2. Audit form UX polish。
3. HVAC page as sellable industry sample。
4. Demo page real/mock/roadmap clarity。
5. Services and Pricing copy simplification。
6. Mobile sticky CTA and QA。

## 12. Review 清单

请你作为客户 review 以下问题：

- 首页 headline 是否清楚表达了我们卖什么？
- 视觉方向是否足够专业，是否不像模板站？
- 你是否接受“Lead Inbox”替代“CRM”的表达？
- HVAC 行业样板是否足够具体，能否拿去给 HVAC 客户演示？
- 表单字段是否太多，哪些可以删除？
- Pricing 是否应该更偏服务套餐，还是更偏产品化模块？
- 是否需要加入创始人/本地可信元素，例如 Halifax / North America / founder note？

## 13. 我的推荐决策

我建议采用此方案作为 R0.7 Website Experience System 的设计基线。

关键取舍：

- 官网主叙事从“运营系统功能”改为“更专业的网站带来更多可跟进线索”。
- 首页减少 dashboard/CRM 语言，增强网站专业度、行业化和转化路径。
- HVAC 页面从 demo 升级为第一个真实行业网站样板。
- 后台只作为 Lead Inbox 轻量支撑，避免客户误以为要学习复杂 SaaS。
- R0.7 开发验收必须包含桌面和手机端视觉 review，而不只是 build/test。
