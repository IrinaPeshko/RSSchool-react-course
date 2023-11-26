import '@testing-library/jest-dom/vitest';
import tsConfigPaths from 'tsconfig-paths';
import tsConfig from './tsconfig.json';

tsConfigPaths.register({
  baseUrl: './',
  paths: tsConfig.compilerOptions.paths,
});