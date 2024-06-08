/* eslint-disable max-len */

export default {
  preset: 'jest-expo',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/.expo/**/*',
    '!**/android/**/*',
    '!**/coverage/**',
    '!**/ios/**/*',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
    '!functions/**/*',
    '!test/**/*',
    '!**/__mocks__/**/*',
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text-summary',
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(color-json|delay|(jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@rneui/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
};
