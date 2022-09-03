import { Config } from "jest";

import jestConfig from "../jest.config";

const config: Config = {
  ...jestConfig,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};

export default config;
