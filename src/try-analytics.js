class TryAnalytics {
  performAnalytics() {
    window.addEventListener("load", () => {
      console.log("getMetrics:", this.getTimingAndMetrics()); // eslint-disable-line
    });
  }

  getTimingAndMetrics() {
    return {};
  }
}

const tryAnalytics = new TryAnalytics();
tryAnalytics.performAnalytics();
