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
  import { staticData } from '@/store';
  import { storeToRefs } from 'pinia';
  import useUser from '@/hooks/user';

  export default defineComponent({
    components: {
      GlobalSetting,
    },
    setup() {
      const comStore = staticData();
      const { userAddress } = storeToRefs(comStore);
      const { logout } = useUser();

      onMounted(() => {
        const { ethereum } = window as any;
        // eslint-disable-next-line no-empty
        if (ethereum) {
          ethereum.on('accountsChanged', (accounts: any) => {
            console.log(accounts[0]); // 一旦切换账号这里就会执行
            localStorage.setItem('address', accounts[0]);
            // eslint-disable-next-line prefer-destructuring
            userAddress.value = accounts[0];
            logout();
          });
        }
      });
      return {
        locale: enUS,
      };
    },
  });
</script>
