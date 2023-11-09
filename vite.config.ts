/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  base: '/RSSchool-react-course',
  test: {
    globals: true,
    environment: 'jsdom',
    // coverage:{
    //   reporter:['text', 'json', 'html'] // change this property to the desired output
    // }
  },
});
