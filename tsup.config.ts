import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'], // Your entry point(s)
  format: ['esm'],
  target : "esnext",
  outDir: 'dist',           // Output directory
  splitting: false,         // Disable code splitting (useful for small libs)
  sourcemap: true,          // Create source maps
  clean: true,              // Clean dist folder before each build
  bundle : true,             // Bundle all dependencies into the output file
  banner :{
    js:`
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    `,
  },
});
