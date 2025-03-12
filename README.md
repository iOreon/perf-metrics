# 🚀 perf-metrics (网页性能指标分析)

## 1️⃣ 安装插件

发布到 NPM 后，可以使用以下命令安装：

```sh
npm install perf-metrics
# 或者
yarn add perf-metrics
# 或者
pnpm add perf-metrics

```

## 2️⃣ 在项目中使用

#### 方式 1：自动监听页面加载

在 `main.ts` 或 `index.ts` 入口文件中引入：

```ts
import "perf-metrics" // 监听 window.load 自动打印日志
```

#### 方式 2：手动调用 API

如果你希望 **在特定时机手动触发** 日志打印：

```ts
import { logPerformance } from "perf-metrics"

logPerformance() // 立即打印页面性能数据
```

#### 方式 3：获取性能数据用于自定义展示

你也可以 **获取数据并存入数据库、发送到日志系统：**

```ts
import { getNavigationTiming } from "perf-metrics"

const perfData = getNavigationTiming()
console.log("🚀 页面性能数据:", perfData)

// 例如：上报到后端
fetch("/api/logPerformance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(perfData)
})
```

## 3️⃣ 使用示例

#### 控制台输出

当你在页面中使用 `logPerformance()`，控制台会打印：

```plaintext
🚀 页面加载总耗时  ⏳ Load  1023.45ms
```

并输出详细性能数据表格：

| 🚀 **性能指标** | 📖 **描述** | ⏱️ **时间** |
|---------------|------------|-------------|
| **FP (First Paint)** | 🎨 首次绘制 | 23.10ms |
| **FCP (First Contentful Paint)** | 🎨 首次内容绘制 | 552.00ms |
| **LCP (Largest Contentful Paint)** | 🏆 最大内容绘制 | 0.00ms |
| **TTI (Time to Interactive)** | ⚡ 可交互时间 | 338.80ms |
| **DomReady (DOM Ready)** | 📄 DOM 就绪时间 | 499.40ms |
| **Load (Page Load)** | ⏳ 页面加载时间 | 1180.00ms |
| **FirstByte (First Byte Time)** | 📡 首字节时间 | 21.70ms |
| **DNS (DNS Lookup)** | 🌐 DNS 查询时间 | 0.00ms |
| **TCP (TCP Connection)** | 🔗 TCP 连接时间 | 0.80ms |
| **SSL (SSL Handshake)** | 🔒 SSL 握手时间 | 0.00ms |
| **TTFB (Time To First Byte)** | ⏱️ 服务器响应时间 | 5.20ms |
| **Trans (Content Transfer Time)** | 📤 内容传输时间 | 1.40ms |
| **DomParse (DOM Parsing)** | 🛠️ DOM 解析时间 | 315.70ms |
| **Res (Resource Loading)** | 📦 资源加载时间 | 680.60ms |
| **CLS (Cumulative Layout Shift)** | ⚠️ 累积布局偏移 | 0.00ms |
| **TBT (Total Blocking Time)** | ⏳ 总阻塞时间 | 0.00ms |
| **FID (First Input Delay)** | 🖱️ 首次输入延迟 | 0.00ms |

### 📌 说明
- **FP（首次绘制）**：页面首次有像素绘制的时间点。
- **FCP（首次内容绘制）**：页面首次渲染文本、图片或 SVG 内容的时间点。
- **LCP（最大内容绘制）**：页面中最大可见元素（如图片、H1 文字）渲染完成的时间。
- **TTI（可交互时间）**：页面能够响应用户输入的时间点。
- **DomReady（DOM 就绪时间）**：`DOMContentLoaded` 事件触发的时间。
- **Load（页面加载时间）**：`load` 事件触发的时间，页面资源加载完成。
- **FirstByte（首字节时间）**：浏览器收到服务器响应的第一个字节所需的时间。
- **DNS（DNS 查询时间）**：解析域名到 IP 地址所花费的时间。
- **TCP（TCP 连接时间）**：建立 TCP 连接所需的时间。
- **SSL（SSL 握手时间）**：HTTPS 连接时，SSL/TLS 握手所需时间。
- **TTFB（服务器响应时间）**：服务器接收请求到开始返回数据的时间。
- **Trans（内容传输时间）**：服务器返回的 HTML 传输到客户端所需时间。
- **DomParse（DOM 解析时间）**：HTML 解析并构建 DOM 树的时间。
- **Res（资源加载时间）**：加载所有样式表、脚本和图片的时间。
- **CLS（累积布局偏移）**：页面元素意外移动的情况，影响用户体验。
- **TBT（总阻塞时间）**：影响主线程阻塞的时间，影响交互流畅度。
- **FID（首次输入延迟）**：用户首次交互（如点击按钮）到浏览器响应的时间。

---

📊 以上数据可以帮助开发者分析页面性能，优化用户体验 🚀
