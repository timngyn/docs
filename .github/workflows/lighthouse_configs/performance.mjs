/**
 * @typedef {import('lighthouse').Config} LH.Config
 */

/** @type {LH.Config} */
const config = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false
    },
    onlyCategories: ['performance']
  }
};

export default config;
