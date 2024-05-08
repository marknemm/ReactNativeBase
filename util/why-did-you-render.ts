/* eslint-disable global-require */

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // @ts-ignore
  whyDidYouRender(require('react'), {});
}
