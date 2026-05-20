# Dandelion 多页面高保真原型

**版本:** 1.0
**日期:** 2026-05-20
**用途:** 按真实信息架构 review 官网产品设计与 UI 方向。

## 打开入口

从 [index.html](index.html) 开始 review。

## 页面结构

| 文件 | 页面 | 主要任务 |
| --- | --- | --- |
| `index.html` | Home | 定位、信任、主 CTA、核心闭环、行业入口 |
| `services.html` | Services | 解释服务交付内容和 Own/Integrate/Avoid 边界 |
| `industries.html` | Industries | 行业入口和行业化复用逻辑 |
| `hvac.html` | HVAC | 第一个可销售行业网站样板 |
| `demo.html` | Demo | 展示 visitor view 到 owner follow-up 的闭环 |
| `pricing.html` | Pricing | 简化套餐选择，引导 audit |
| `audit.html` | Audit | 独立 audit 转化流程 |
| `styles.css` | Shared UI | 高保真视觉 token、响应式布局、组件样式 |

## Review 顺序

1. 先看 `index.html`，确认首页是否只承担首页职责，没有堆叠所有子页面。
2. 再看 `hvac.html`，确认行业样板是否足够具体、可销售。
3. 再看 `audit.html`，确认表单字段是否足够短、清楚、可转化。
4. 最后看 `services.html`、`industries.html`、`demo.html`、`pricing.html` 的叙事是否清楚。

## 当前设计决策

- 首页不再集成全部子页面内容，只保留关键入口和预览。
- HVAC 是独立行业样板页，不只是首页区块。
- Audit 是独立转化页，同时可由全站 CTA 进入。
- Demo 独立解释 real/configurable/later，避免销售误导。
- 后台表达统一为 `Lead Inbox Lite`，不使用复杂 CRM 语言。

## 后续开发用途

R0.7 Website Experience System 开发时，可以把这些页面作为 UI 与信息架构基线。
