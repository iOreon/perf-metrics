// src/index.ts
export interface PerformanceMetrics {
    FP: number
    TTI: number
    DomReady: number
    Load: number
    FirstByte: number
    DNS: number
    TCP: number
    SSL: number
    TTFB: number
    Trans: number
    DomParse: number
    Res: number
}

const metricNames: Record<keyof PerformanceMetrics, string> = {
    FP: "🎨 首次绘制 (First Paint)",
    TTI: "⚡ 可交互时间 (Time to Interactive)",
    DomReady: "📄 DOM 就绪时间 (DOM Ready)",
    Load: "⏳ 页面加载时间 (Page Load)",
    FirstByte: "📡 首字节时间 (First Byte Time)",
    DNS: "🌐 DNS 查询时间 (DNS Lookup)",
    TCP: "🔗 TCP 连接时间 (TCP Connection)",
    SSL: "🔒 SSL 握手时间 (SSL Handshake)",
    TTFB: "⏱️ 服务器响应时间 (Time To First Byte)",
    Trans: "📤 内容传输时间 (Content Transfer Time)",
    DomParse: "🛠️ DOM 解析时间 (DOM Parsing)",
    Res: "📦 资源加载时间 (Resource Loading)"
}

const resolveNavigationTiming = (
    entry: PerformanceNavigationTiming | PerformanceTiming
): PerformanceMetrics => {
    const {
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        connectEnd,
        secureConnectionStart,
        requestStart,
        responseStart,
        responseEnd,
        domInteractive,
        domContentLoadedEventEnd,
        loadEventStart,
        fetchStart
    } = entry as PerformanceNavigationTiming

    return {
        FP: responseEnd - fetchStart,
        TTI: domInteractive - fetchStart,
        DomReady: domContentLoadedEventEnd - fetchStart,
        Load: loadEventStart - fetchStart,
        FirstByte: responseStart - domainLookupStart,
        DNS: domainLookupEnd - domainLookupStart,
        TCP: connectEnd - connectStart,
        SSL: secureConnectionStart ? connectEnd - secureConnectionStart : 0,
        TTFB: responseStart - requestStart,
        Trans: responseEnd - responseStart,
        DomParse: domInteractive - responseEnd,
        Res: loadEventStart - domContentLoadedEventEnd
    }
}

export const getNavigationTiming = (): PerformanceMetrics => {
    const navigation = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined
    return resolveNavigationTiming(navigation || performance.timing)
}

export const logPerformance = (): void => {
    const metrics = getNavigationTiming()
    const tableData = Object.keys(metrics).map((key) => ({
        "🚀 性能指标": `${key}`,
        "📖 描述": `${metricNames[key as keyof PerformanceMetrics]}`,
        "⏱️ 时间": `${metrics[key as keyof PerformanceMetrics].toFixed(2)}ms`
    }))

    console.log(
        `%c 🚀 页面加载总耗时 %c ⏳ Load %c ${metrics.Load.toFixed(2)}ms`,
        "background:#222; padding: 4px; border-radius: 4px; color: #fff; font-weight: bold;",
        "background:#41b883; padding: 4px; border-radius: 4px; color: #fff; font-weight: bold;",
        "color:#41b883; font-weight: bold;"
    )
    console.table(tableData)
}

// 自动记录性能（可选）
if (typeof window !== "undefined") {
    window.addEventListener("load", logPerformance)
}
