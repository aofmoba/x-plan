<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import GlobalSetting from '@/components/global-setting/index.vue';

  export default defineComponent({
    components: {
      GlobalSetting,
    },
    setup() {
      onMounted(() => {
        // const { ethereum } = window as any;
        // ethereum.on('accountsChanged', (accounts: any) => {
        //   // console.log(accounts[0]);
        //   localStorage.setItem('address', accounts[0]);
        // });
      });
      return {
        locale: enUS,
      };
    },
  });
</script>
