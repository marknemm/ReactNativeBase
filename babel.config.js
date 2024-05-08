/**
 * Babel configuration.
 *
 * @param {any} api The API.
 * @returns {Object} The Babel configuration.
 */
module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        jsxRuntime: 'automatic',
        jsxImportSource: '@welldone-software/why-did-you-render',
      }],
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@assets': './assets',
          '@components': './components',
          '@constants': './constants',
          '@contexts': './contexts',
          '@env': './util/env',
          '@hooks': './hooks',
          '@interfaces': './interfaces',
          '@navigation': './navigation',
          '@screens': './screens',
          '@styles': './styles',
          '@util': './util',
        },
      }],
      '@babel/plugin-transform-class-static-block',
      'react-native-reanimated/plugin',
    ],
  };
};
