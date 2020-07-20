class TryAnalytics {
  performAnalytics() {
    window.addEventListener("load", () => {
      console.log("getMetrics:", this.getTimingAndMetrics());
    });
  }

  getTimingAndMetrics() {
    const performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;

    if (typeof performance === "undefined") {
      return {};
    }

    // Time to first byte
    // https://developer.mozilla.org/en-US/docs/Glossary/time_to_first_byte
    const ttfb = performance.timing.domInteractive - performance.timing.fetchStart;

    // First contentful paint
    // https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming
    let performanceEntries = performance.getEntriesByType("paint");
    const fcpEntry = performanceEntries.find((item) => item.name === "first-contentful-paint");
    const fcp = fcpEntry.startTime;

    // Resources
    const resourceEntries = performance.getEntriesByType("resource");
    const resources = resourceEntries.map((item) => {
      return {
        name: item.name,
        duration: item.duration,
        size: item.transferSize,
        type: item.initiatorType,
      };
    });

    // DOM Load Time
    const DOMLoadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

    return { ttfb, fcp, resources, DOMLoadTime };
  }
}

const tryAnalytics = new TryAnalytics();
tryAnalytics.performAnalytics();
