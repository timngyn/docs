module.exports = {
  runPerformanceAudit: async (pages) => {
    // This represents the "performance" score we get when we run the
    // Lighthouse performance audit. Anything below 50 is considered "poor" by Google.
    const PERFORMANCE_SCORE_FAILURE_THRESHOLD = 50;

    const core = require('@actions/core');
    const { DefaultArtifactClient } = require('@actions/artifact');
    const artifact = new DefaultArtifactClient();
    const fs = require('fs');
    const { default: lighthouse } = await import('lighthouse');
    const chromeLauncher = await import('chrome-launcher');

    const { default: lighthouseConfig } = await import(
      '../lighthouse_configs/performance.mjs'
    );

    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    const scores = [];
    const reports = [];

    console.log('Running report on these pages:', pages.join(', '));
    console.log('\n');

    for (const page of pages) {
      const options = {
        output: 'html',
        port: chrome.port
      };

      const runnerResult = await lighthouse(
        `http://localhost:3000${page}/`,
        options,
        lighthouseConfig
      );

      const reportHtml = runnerResult.report;
      const reportTitle = `LH_performance${page.replaceAll('/', '_')}.html`;
      fs.writeFileSync(reportTitle, reportHtml);
      reports.push(reportTitle);

      console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);

      const score = runnerResult.lhr.categories.performance.score * 100;
      scores.push(score);
      console.log('Performance score was', score);
      console.log('\n');
    }

    chrome.kill();

    await artifact.uploadArtifact(
      'lighthouse-performance-results',
      reports.map((report) => `./${report}`)
    );

    if (scores.some((score) => score < PERFORMANCE_SCORE_FAILURE_THRESHOLD)) {
      core.setFailed(
        `Pages have performance score less than ${PERFORMANCE_SCORE_FAILURE_THRESHOLD}. 
View the workflow Summary on Github to download the full HTML report from the artifacts section.`
      );
    }
  }
};
