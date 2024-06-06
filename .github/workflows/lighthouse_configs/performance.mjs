export default {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'cumulative-layout-shift',
      'largest-contentful-paint'
    ],
  }
};
