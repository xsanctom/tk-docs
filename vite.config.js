import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const isPagesBuild = mode === 'pages'
  
  // GitHub Pages base path
  const base = isPagesBuild ? '/tk-docs/' : '/'
  
  return {
    base,
    plugins: [react()],
    ...(isBuild && {
      build: isPagesBuild ? {
        // Demo app build for GitHub Pages
        outDir: 'dist',
        emptyOutDir: true,
      } : {
        // Library build
        lib: {
          entry: resolve(__dirname, 'src/lib/index.js'),
          name: 'ComponentLibrary',
          fileName: (format) => `component-library.${format}.js`,
          formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        },
        cssCodeSplit: false,
        sourcemap: true
      }
    }),
    server: {
      port: 3002,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      }
    },
  }
})

