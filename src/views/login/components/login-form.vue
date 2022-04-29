<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
    >
      <!-- <a-form-item
        field="address"
        :rules="[{ required: true, message: $t('login.form.address.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.address"
          :placeholder="$t('login.form.address.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item> -->
      <a-space :size="16" direction="vertical">
        <a-button
          type="primary"
          class="login-form-connect"
          long
          @click="connect"
        >
          {{ $t('login.form.connect') }}
        </a-button>
      </a-space>
      <!-- <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long>
          {{ $t('login.form.login') }}
        </a-button>
      </a-space> -->
    </a-form>

    <a-modal
      v-model:visible="noInVisible"
      simple
      :cancel-text="$t('login.modal.cancel')"
      :ok-text="$t('login.modal.open')"
      @ok="toMetaMask"
    >
      <template #title>
        <img
          src="https://d2cimmz3cflrbm.cloudfront.net/nwhome/metaMask.svg"
          style="width: 38px; margin-right: 10px"
        />
        {{ $t('login.modal.title') }}
      </template>
      <div>{{ $t('login.modal.msg') }}</div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { staticData } from '@/store';
  import axios from 'axios';
  import { storeToRefs } from 'pinia';
  import web3J from '@/utils/web3';
  import contracts from '@/utils/contracts';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const comStore = staticData();
  const { isAssetsAllow, userAddress } = storeToRefs(comStore);
  const noInVisible = ref(false);
  const userInfo = reactive({
    address: '',
  });

  const fetchLogin = () => {
    axios
      .get(
        `https://invitecode.cyberpop.online/user/doLogin?address=${userInfo.address}`
      )
      .then((res: any) => {
        console.log(res);
        if ( res.data.code === 200 && res.data.data[1] ) {
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          router.push({
            name: (redirect as string) || 'Workplace',
            query: {
              ...othersQuery,
            },
          });
          Message.success(t('login.success'));
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('satoken', res.data.data[0].satoken)
          localStorage.setItem('userLl', res.data.data[0].level);
          // isAssetsAllow.value = true;
          // localStorage.setItem('isAssetsAllow', 'true');
        } else {
          Message.error(t('login.error'));
        }
      })
  };


  // get NFT
  const getNft = async () => {
    const result: any = await web3J.balanceOfBatch(contracts.nft_fuji.abi, contracts.nft_fuji.address);
    const len = result.length;
    let hasNft = false;
    console.log(result);
    for (let i = 0; i < len; i += 1) {
      if ( Number(result[i]) ) {
        hasNft = true;
        fetchLogin();
        // const { redirect, ...othersQuery } = router.currentRoute.value.query;
        // router.push({
        //   name: (redirect as string) || 'Workplace',
        //   query: {
        //     ...othersQuery,
        //   },
        // });
        // localStorage.setItem('isLogin', 'true');
        return;
      }
    }
    if (!hasNft) {
      Message.error(t('login.havNft.error'));
    }
  }


  const connect = async () => {
    const { ethereum } = window as any; // 获取小狐狸实例
    if (!ethereum) {
      noInVisible.value = true;
    } else {
      await ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (res: any) => {
          // eslint-disable-next-line prefer-destructuring
          userInfo.address = res[0];
          localStorage.setItem('address', res[0]);
          // eslint-disable-next-line prefer-destructuring
          userAddress.value = res[0];
          const {Web3} = window as any;
          const web3obj = new Web3((Web3 as any).givenProvider);
          await web3obj.eth.net.getId().then(async (chainId: any) => {
              console.log(chainId);
              // eslint-disable-next-line eqeqeq
              if(chainId != 43113) {
                const a: any = await web3J.addChain(43113);
                if (a) {
                  getNft();
                } else {
                  Message.error(t('switch.error'));
                }
              }else{
                getNft();
              }
          })
        });
    }
  };
  const toMetaMask = () => {
    window.open('https://metamask.io/');
  };

  onMounted(() => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('isAssetsAllow');
    localStorage.removeItem('address');
    localStorage.removeItem('satoken')
  });
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }

    &-connect {
      margin-bottom: 18px;
      border: none;
    }
  }
</style>
