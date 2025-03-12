"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNavigationTiming = exports.logPerformance = void 0;
var metricNames = {
    FP: "🎨 首次绘制 (First Paint)",
    FCP: "🎨 首次内容绘制 (First Contentful Paint)",
    LCP: "🏆 最大内容绘制 (Largest Contentful Paint)",
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
    Res: "📦 资源加载时间 (Resource Loading)",
    CLS: "⚠️ 累积布局偏移 (Cumulative Layout Shift)",
    TBT: "⏳ 总阻塞时间 (Total Blocking Time)",
    FID: "🖱️ 首次输入延迟 (First Input Delay)"
};
// 通用性能解析函数
var resolvePerformanceMetrics = function () {
    var _a;
    var navigation = performance.getEntriesByType("navigation")[0];
    // 获取 FCP 和 LCP
    var fcp = performance
        .getEntriesByType("paint")
        .find(function (entry) { return entry.name === "first-contentful-paint"; });
    var lcp = performance
        .getEntriesByType("paint")
        .find(function (entry) { return entry.name === "largest-contentful-paint"; });
    // 获取 CLS
    var cls = performance
        .getEntriesByType("layout-shift")
        .reduce(function (total, entry) { return total + entry.value; }, 0);
    // 获取 TBT
    var tbt = performance
        .getEntriesByType("longtask")
        .reduce(function (total, entry) { return total + entry.duration; }, 0);
    // 获取 FID
    var fid = ((_a = performance.getEntriesByType("event").find(function (entry) { return entry.name === "first-input"; })) === null || _a === void 0 ? void 0 : _a.startTime) || 0;
    var domainLookupStart = navigation.domainLookupStart, domainLookupEnd = navigation.domainLookupEnd, connectStart = navigation.connectStart, connectEnd = navigation.connectEnd, secureConnectionStart = navigation.secureConnectionStart, requestStart = navigation.requestStart, responseStart = navigation.responseStart, responseEnd = navigation.responseEnd, domInteractive = navigation.domInteractive, domContentLoadedEventEnd = navigation.domContentLoadedEventEnd, loadEventStart = navigation.loadEventStart, fetchStart = navigation.fetchStart;
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
    };
};
// 输出性能日志
var logMetrics = function (metrics) {
    var tableData = Object.keys(metrics).map(function (key) {
        var name = metricNames[key];
        return {
            "🚀 性能指标": "".concat(name.split(" ")[0], " (").concat(key, ")"),
            "📖 描述": name.split(" ").slice(1).join(" "),
            "⏱️ 时间": "".concat(metrics[key].toFixed(2), "ms")
        };
    });
    console.log("%c \uD83D\uDE80 \u9875\u9762\u52A0\u8F7D\u603B\u8017\u65F6 %c \u23F3 Load %c ".concat(metrics.Load.toFixed(2), "ms"), "background:#222; padding: 4px; border-radius: 4px; color: #fff; font-weight: bold;", "background:#41b883; padding: 4px; border-radius: 4px; color: #fff; font-weight: bold;", "color:#41b883; font-weight: bold;");
    console.table(tableData);
};
// 手动触发性能日志
var logPerformance = function () {
    var metrics = resolvePerformanceMetrics();
    logMetrics(metrics);
};
exports.logPerformance = logPerformance;
// 获取性能数据
var getNavigationTiming = function () {
    return resolvePerformanceMetrics();
};
exports.getNavigationTiming = getNavigationTiming;
// 自动记录性能（可选）
var autoLogPerformance = function () {
    if (typeof window !== "undefined") {
        window.addEventListener("load", function () {
            var metrics = resolvePerformanceMetrics();
            logMetrics(metrics);
        });
    }
};
// 自动监听页面加载（如果需要）
autoLogPerformance();
