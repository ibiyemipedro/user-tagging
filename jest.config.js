require("jest-config");

module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended", "./setup.js"],
  testMatch: [
    "<rootDir>/tests/**/*.test.js",
  ],
};