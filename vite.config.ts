import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server:{
        host: '0.0.0.0',
        proxy: {
            '/api': {
              target: 'https://data.cyberpop.online/',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            },
        }
    },
    define: {
        'process.env': {},
    },
    resolve: {
        alias: {
            '@': '/src/',
            // '@': path.resolve(__dirname, 'src'),
            // process: 'process/browser',
            // stream: 'stream-browserify',
            // zlib: 'browserify-zlib',
            // util: 'util',
        },
    },
})
