/**
 * Babel configuration.
 *
 * @param {any} api The API.
 * @returns {Object} The Babel configuration.
 */
module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@constants': './constants',
            '@contexts': './contexts',
            '@hooks': './hooks',
            '@screens': './screens',
            '@styles': './styles',
            '@util': './util',
          },
        },
      ]
    ],
  };
};
