/* eslint-disable max-len */
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/.expo/**/*',
    '!**/android/**/*',
    '!**/coverage/**',
    '!**/ios/**/*',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.config.ts',
    '!**/jest.setup.ts',
    '!functions/**/*',
    '!test/**/*',
    '!**/__mocks__/**/*',
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text-summary',
  ],
  fakeTimers: {
    enableGlobally: true,
  },
  setupFilesAfterEnv: [
    './jest.setup.ts',
    './node_modules/@react-native-google-signin/google-signin/jest/build/setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(color-json|delay|(jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@rneui/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
};

export default config;
