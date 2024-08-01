// FIXME: Circular definition, renamed the file to jest.default.ts
import { Config } from 'jest'

export const getDefaultConfig = (): Config => {
  return {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['tmp', 'node_modules'],
  }
}
