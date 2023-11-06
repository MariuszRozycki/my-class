/* eslint-env node */
module.exports = {
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/?(*.)+(spec|test).mjs"
  ],
  testEnvironment: "jest-environment-jsdom",
  transform: { '^.+\\.(mjs|js|jsx)$': 'babel-jest', },
  moduleNameMapper: {
    '^\\.(css|less|scss)$': 'identity-obj-proxy',
  }
};
