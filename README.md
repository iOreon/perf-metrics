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

| 索引 | 🚀 性能指标 | 📖 描述                                   | ⏱️ 时间     |
| ---- | ----------- | ----------------------------------------- | ----------- |
| 0    | 'FP'        | '🎨 首次绘制 (First Paint)'               | '14.80ms'   |
| 1    | 'TTI'       | '⚡ 可交互时间 (Time to Interactive)'     | '393.70ms'  |
| 2    | 'DomReady'  | '📄 DOM 就绪时间 (DOM Ready)'             | '560.00ms'  |
| 3    | 'Load'      | '⏳ 页面加载时间 (Page Load)'             | '1237.90ms' |
| 4    | 'FirstByte' | '📡 首字节时间 (First Byte Time)'         | '10.60ms'   |
| 5    | 'DNS'       | '🌐 DNS 查询时间 (DNS Lookup)'            | '0.00ms'    |
| 6    | 'TCP'       | '🔗 TCP 连接时间 (TCP Connection)'        | '0.00ms'    |
| 7    | 'SSL'       | '🔒 SSL 握手时间 (SSL Handshake)'         | '0.00ms'    |
| 8    | 'TTFB'      | '⏱️ 服务器响应时间 (Time To First Byte)'  | '4.60ms'    |
| 9    | 'Trans'     | '📤 内容传输时间 (Content Transfer Time)' | '4.20ms'    |
| 10   | 'DomParse'  | '🛠️ DOM 解析时间 (DOM Parsing)'           | '378.90ms'  |
| 11   | 'Res'       | '📦 资源加载时间 (Resource Loading)'      | '677.90ms'  |
