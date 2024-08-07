import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { getDefaultConfig } from '#packages/jest.default';
import tsConfigFile from 'tsconfig.json';

const defaultConfig = getDefaultConfig();

const config: Config = {
  ...defaultConfig,
  testPathIgnorePatterns: [
    ...(defaultConfig.testPathIgnorePatterns || []),
    '@browser',
  ],
  moduleNameMapper: {
    ...(defaultConfig.moduleNameMapper || {}),
    ...pathsToModuleNameMapper(tsConfigFile.compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
};

export default config;
