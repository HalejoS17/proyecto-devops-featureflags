export default {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.[jt]sx?$": [
      "babel-jest",
      {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }
    ],

    // 👇 transformador para import.meta
    "\\.(js|jsx)$": "<rootDir>/tests/transformers/importMetaFix.cjs"
  },

  transformIgnorePatterns: ["/node_modules/"],

  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "<rootDir>/tests/setupEnv.js"
  ],

  moduleNameMapper: {
    "launchdarkly-react-client-sdk": "<rootDir>/tests/__mocks__/launchdarkly.js"
  }
};
