import { request } from "../utils/fetch";

class TryAnalytics {
  constructor() {
    this.token = null;
  }

  set setToken(token) {
    this.token = token;
  }

  register(token) {
    this.setToken = token;
  }

  performAnalytics() {
    window.addEventListener("load", () => {
      const result = this.getTimingAndMetrics();
      const body = {
        token: this.token,
        url: window.location.hostname,
        data: result,
      };

      const lastRequestDate = localStorage.getItem("lastRequestDate");
      const now = new Date();
      let allowRequest = false;
      if (lastRequestDate) {
        try {
          // Restrict multiple post request. One request can be sent per minute
          const diff = now.getTime() - lastRequestDate > 60000;
          if (diff || isNaN(diff)) {
            allowRequest = true;
          }
        } catch (e) {
          allowRequest = true;
        }
      } else {
        allowRequest = true;
      }

      // TODO restriction mechanism must be activated in future.
      allowRequest = true;
      if (allowRequest) {
        request({ url: `${process.env.API_URL}/api/saveResult`, body });
        localStorage.setItem("lastRequestDate", now.getTime());
      }
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

window.tryAnalytics = function (token) {
  const tryAnalytics = new TryAnalytics();
  tryAnalytics.register(token);
  if (token) {
    tryAnalytics.performAnalytics();
  } else {
    console.warn("TryAnalytics Token does not found. Registration does not successful!"); // eslint-disable-line
  }
};
