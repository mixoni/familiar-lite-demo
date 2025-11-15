const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // koren Next app-a
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@features/(.*)$': '<rootDir>/features/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
  },

  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
};

module.exports = createJestConfig(customJestConfig);
