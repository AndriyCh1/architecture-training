import { relative } from 'node:path';
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { multiPathAliasPlugin } from '#libraries/@node/vite/plugins/multiPathAliasPlugin';
import tsConfigFile from './tsconfig.json';

const aliases = Object.fromEntries(
    normalizePathes(
        tsConfigFile.compilerOptions.paths,
      __dirname,
    ),
  );

export default defineConfig({
    plugins: [
        multiPathAliasPlugin(aliases),
        react(),
    ]
} as UserConfig);