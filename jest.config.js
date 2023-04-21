const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  // moduleNameMapper: {
  //   // Handle module aliases (this will be automatically configured for you soon)
  //   "^@/components/(.*)$": "<rootDir>/src/components/$1",
  //   "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
  //   "^@firebase$": "<rootDir>/src/firebase",
  //   "^@redux/slices/$": "<rootDir>/src/redux/slices/$1",
  // },
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
