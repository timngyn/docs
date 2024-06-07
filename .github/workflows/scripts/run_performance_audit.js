module.exports = {
  runPerformanceAudit: async (pages) => {
    console.log(pages);
    // const core = require('@actions/core');
    // const fs = require('fs');
    // const { default: lighthouse } = await import('lighthouse');
    // const chromeLauncher = await import('chrome-launcher');
    // const { default: lighthouseConfig}  = await import('../lighthouse_configs/performance.mjs');

    // const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});

    // const scores = [];

    // for (const page of pages) {
    //   const options = {
    //     output: 'html',
    //     port: chrome.port
    //   };

    //   const runnerResult = await lighthouse(`http://localhost:3000${page}/`, options, lighthouseConfig);
  
    //   // `.report` is the HTML report as a string
    //   const reportHtml = runnerResult.report;
    //   fs.writeFileSync(`LH_performance${page.replaceAll('/', '_')}.html`, reportHtml);
  
    //   // `.lhr` is the Lighthouse Result as a JS object
    //   console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);

    //   const score = runnerResult.lhr.categories.performance.score * 100;
    //   scores.push(score);
    //   console.log('Performance score was', score);
    // }

    // chrome.kill();

    // if (scores.some((score) => score < 50)) {
    //   core.setFailed('Pages have performance score less than 50.');
    // }
  }
};
