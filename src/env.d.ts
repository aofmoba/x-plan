/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue';
declare module '@arco-design/web-vue';
declare module '@arco-design/web-vue/es/icon';
declare module 'dayjs';
declare module 'dayjs/plugin/relativeTime';
declare module 'dayjs/locale/en';
declare module 'echarts/core';
declare module 'echarts/renderers';
declare module 'echarts/charts';
declare module 'echarts/components';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}
