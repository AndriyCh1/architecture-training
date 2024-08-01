import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { getDefaultConfig } from '#packages/jest.default'
// FIXME: import tsConfigFile from 'tsconfig.json'

const defaultConfig = getDefaultConfig()

const config: Config = {
  ...defaultConfig,
  testPathIgnorePatterns: [
    ...(defaultConfig.testPathIgnorePatterns || []),
    '@browser',
  ],
  moduleNameMapper: {
    ...(defaultConfig.moduleNameMapper || {}),
    // FIXME: tsConfigFile
    ...pathsToModuleNameMapper(
      {
        '#libraries/*': ['./*'],
        '#packages/*': ['../js-packages/*'],
        '#libraries/@core/*': ['../js-libraries/@core/*'],
        '#libraries/@node/*': ['../js-libraries/@node/*'],
        '#libraries/@web/*': ['../js-libraries/@web/*'],
      },
      {
        prefix: '<rootDir>/Andrii/',
      },
    ),
  },
}

export default config
