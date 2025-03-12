interface PerformanceMetrics {
    [key: string]: number
}

const metricData: Record<string, { name: string; describe: string }> = {
    FP: { name: "(First Paint)", describe: "🎨 首次绘制" },
    FCP: { name: "(First Contentful Paint)", describe: "🎨 首次内容绘制" },
    LCP: { name: "(Largest Contentful Paint)", describe: "🏆 最大内容绘制" },
    TTI: { name: "(Time to Interactive)", describe: "⚡ 可交互时间" },
    DomReady: { name: "(DOM Ready)", describe: "📄 DOM 就绪时间" },
    Load: { name: "(Page Load)", describe: "⏳ 页面加载时间" },
    FirstByte: { name: "(First Byte Time)", describe: "📡 首字节时间" },
    DNS: { name: "(DNS Lookup)", describe: "🌐 DNS 查询时间" },
    TCP: { name: "(TCP Connection)", describe: "🔗 TCP 连接时间" },
    SSL: { name: "(SSL Handshake)", describe: "🔒 SSL 握手时间" },
    TTFB: { name: "(Time To First Byte)", describe: "⏱️ 服务器响应时间" },
    Trans: { name: "(Content Transfer Time)", describe: "📤 内容传输时间" },
    DomParse: { name: "(DOM Parsing)", describe: "🛠️ DOM 解析时间" },
    Res: { name: "(Resource Loading)", describe: "📦 资源加载时间" },
    CLS: { name: "(Cumulative Layout Shift)", describe: "⚠️ 累积布局偏移" },
    TBT: { name: "(Total Blocking Time)", describe: "⏳ 总阻塞时间" },
    FID: { name: "(First Input Delay)", describe: "🖱️ 首次输入延迟" }
}

const resolvePerformanceMetrics = (): PerformanceMetrics => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

    const fcp = performance
        .getEntriesByType("paint")
        .find((entry) => entry.name === "first-contentful-paint")
    const lcp = performance
        .getEntriesByType("paint")
        .find((entry) => entry.name === "largest-contentful-paint")

    const cls = performance
        .getEntriesByType("layout-shift")
        .reduce((total, entry) => total + (entry as PerformanceEntry & { value: number }).value, 0)

    const tbt = performance
        .getEntriesByType("longtask")
        .reduce((total, entry) => total + entry.duration, 0)

    const fid =
        performance.getEntriesByType("event").find((entry) => entry.name === "first-input")
            ?.startTime || 0

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
    } = navigation

    return {
        FP: responseEnd - fetchStart,
        FCP: fcp ? fcp.startTime : 0,
        LCP: lcp ? lcp.startTime : 0,
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
        Res: loadEventStart - domContentLoadedEventEnd,
        CLS: cls,
        TBT: tbt,
        FID: fid
    }
}

const logMetrics = (metrics: PerformanceMetrics): void => {
    const tableData = Object.entries(metrics).map(([key, value]) => ({
        "🚀 性能指标": `${key}  ${metricData[key].name}`,
        "📖 描述": `${metricData[key].describe}`,
        "⏱️ 时间": `${value.toFixed(2)}ms`
    }))

    console.log(
        `%c 🚀 页面加载总耗时 %c ⏳ Load %c ${metrics.Load.toFixed(2)}ms`,
        "background:#222; padding: 4px; border-radius: 4px; color: #fff; font-weight: bold;",
        "background:#41b883; padding: 4px; border-radius: 4px; color: #fff; font-weight: bold;",
        "color:#41b883; font-weight: bold;"
    )

    console.table(tableData)
}

export const logPerformance = (): void => {
    const metrics = resolvePerformanceMetrics()
    logMetrics(metrics)
}

export const getNavigationTiming = (): PerformanceMetrics => {
    return resolvePerformanceMetrics()
}

const autoLogPerformance = (): void => {
    if (typeof window !== "undefined") {
        window.addEventListener("load", () => {
            const metrics = resolvePerformanceMetrics()
            logMetrics(metrics)
        })
    }
}

autoLogPerformance()
