import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      host: '0.0.0.0',
      proxy: {
          '/data': {
            target: 'https://api.cyberpop.online/', // 实际请求地址
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/data/, '')
          },
          '/api': {
              target: 'https://invitecode.cyberpop.online/', // http://1.14.201.147:8612/
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
          }
          // '/email': {
          //   target: 'http://192.168.0.134/', // 实际请求地址
          //   changeOrigin: true,
          //   rewrite: (path) => path.replace(/^\/email/, '')
          // },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConig
);
