<template>
  <div class="login-form-wrapper">
    <ul v-if="data.length > 0" class="login-form-badge">
        <li v-for="(item, index) in data" :key="index">
          <a-image
            :src="item.data.image"
            :title='item.data.name'
            width="100"
            footer-position="outer"
            :preview-visible="false"
          >
            <!-- <template #extra>
              <div>{{ item.number }}</div>
            </template> -->
          </a-image>
        </li>
    </ul>
    <div v-if="!isregist" class="login-form-title">{{ $t('login.form.title') }}</div>
    <div v-if="isregist" class="login-form-title">{{ $t('login.form.title2') }}, {{ $t(userLevel) }} {{nickna}}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <!-- <div class="login-form-change">
      <span>登录</span>
      <span>注册</span>
    </div> -->
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
        <div v-if="data.length > 0 && !isregist">
          <a-button
            v-if="disa1"
            type="primary"
            class="login-form-connect"
            long
            @click="addInfo(1)"
          >
            {{ $t('login.form.reg.btn3') }}
          </a-button>
          <a-button
            v-if="disa2"
            type="primary"
            class="login-form-connect"
            long
            @click="addInfo(2)"
          >
            {{ $t('login.form.reg.btn2') }}
          </a-button>
          <a-button
            v-if="disa3"
            type="primary"
            class="login-form-connect"
            long
            @click="addInfo(3)"
          >
            {{ $t('login.form.reg.btn1') }}
          </a-button>
        </div>
        <a-button
            :loading="logDisable"
            type="primary"
            class="login-form-connect"
            long
            @click="fetchLogin"
          >
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
      <!-- <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long>
          {{ $t('login.form.login') }}
        </a-button>
      </a-space> -->
    </a-form>

    <!-- install metamask -->
    <a-modal
      v-model:visible="noInVisible"
      simple
      modal-class="inModal"
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

    <!-- register -->
    <a-modal
      v-model:visible="addVisible"
      :title="$t('login.modal.title2')"
      class="addModal"
    >
      <a-form 
        ref="ruleform" 
        :model="addForm.val"
      >
        <a-form-item 
            field="email" 
            :rules="[{ required: true, message: $t('login.form.email.errMsg') }, { match: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: $t('login.form.email.ruleMsg') }]"
            :validate-trigger="['change', 'blur']"
            :label="$t('login.modal.email')">
          <a-input v-model="addForm.val.email" />
        </a-form-item>
        <a-form-item 
          field="name" 
          :rules="[{ required: true, message: $t('login.form.name.errMsg') },{maxLength: 50, message: $t('login.form.name.errMsg2')}]"
          :validate-trigger="['change', 'blur']"
          :label="$t('login.modal.name')">
          <a-input v-model="addForm.val.name" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="addCancel">{{ $t('login.modal.cancel') }}</a-button>
        <a-button type="primary" @click="register">{{ $t('login.modal.ok') }}</a-button>
      </template>
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
import { log } from 'console';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const comStore = staticData();
  const { badgeData, userAddress } = storeToRefs(comStore);
  const noInVisible = ref(false);
  const data: any = ref([]);
  const isReady: any = ref(0);
  const disa1: any = ref(false);
  const disa2: any = ref(false);
  const disa3: any = ref(false);
  const addVisible = ref(false);
  const alltype: any = ref(0);
  const userLevel: any = ref('workplace.level')
  const nickna: any = ref('');
  const isregist: any = ref(false);
  const ruleform: any = ref(null)
  const logDisable: any = ref(false);
  const dobadge: any = ref('-1');
  const level: any = ref('1');
  const userInfo = reactive({
    address: '',
  });
  const addForm = reactive({
    val: {
      email: '',
      name: ''
    },
  });
  

  // get NFT
  const getNft = async () => {
    const ids = [0, 1, 2, 3, 4];
    const result: any = await web3J.balanceOfBatch(contracts.nft_fuji.abi, contracts.nft_fuji.address, ids);
    const len = result.length;
    // let hasNft = false;
    console.log(result);
    (function loop(i){
        if(result[i] === 0 || i === 0) { // 为了减少不必要的请求
            // eslint-disable-next-line no-plusplus
            if (++i<len) {
                loop(i);
            }
            return;
        }
        axios.get(`/data/badge/${ids[i]}`).then((res: any) => {
            if(result[i] > 0 || i === 101101){
                if ( i === 1 || i === 2 ){
                  disa3.value = true;
                }else if( i === 3 ){
                  disa2.value = true;
                }else if( i === 4 ){
                  disa1.value = true;
                }
                data.value.push({
                    id: ids[i],
                    number: result[i],
                    data: res.data || { name: result[i], image: 'https://d2cimmz3cflrbm.cloudfront.net/nwhome/ba5fcf2b4854eebdc64dc80089f2cc26.png' },
                })
                
            }
            // eslint-disable-next-line no-plusplus
            if (++i<len) {
                loop(i);
            } else {
                // eslint-disable-next-line eqeqeq
                if( dobadge.value == '1' ){
                  // eslint-disable-next-line eqeqeq
                  const tempData = data.value.filter((item: any) => {
                    // eslint-disable-next-line eqeqeq
                    if( level.value == 2 ){
                      // eslint-disable-next-line eqeqeq
                      return item.id == 1 || item.id == 2
                    }
                    // eslint-disable-next-line eqeqeq
                    return item.id == level.value
                  })
                  if( !tempData.length ){
                    isReady.value = 9;
                    Message.error(t('dobadge.error'));
                    logDisable.value = false; // 查询结束，按钮的loading结束
                    return
                  }
                }
                isReady.value = 2; // 查询nft结束的标准
                logDisable.value = false; // 查询结束，按钮的loading结束
                badgeData.value = data.value; // pinia 存储 nft信息（可省）
                localStorage.setItem('bImg',JSON.stringify(data.value)); // localStorage 存储 nft信息
            }
        }).catch((err:any) => {
            console.log(err); 
        })
    })(0)
  }

  // axios
  const dologin = () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject)=>{
      const res = await axios.get(`https://invitecode.cyberpop.online/user/doLogin?address=${userInfo.address}`)
      resolve(res);
    }) 
  }

  const connect = async () => {
    isReady.value = 1;
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
          await dologin().then((xres: any)=>{
            if ( xres.data.code === 200 && xres.data.data[1] ) {
              isregist.value = true
              dobadge.value = xres.data.data[0].dobadge;
              nickna.value = xres.data.data[0].nikename;
              level.value = xres.data.data[0].level;
              // eslint-disable-next-line eqeqeq
              if( xres.data.data[0].level == '4' ){
                userLevel.value = 'agent.level1'
              // eslint-disable-next-line eqeqeq
              }else if( xres.data.data[0].level == '3' ){
                userLevel.value = 'agent.level2'
              // eslint-disable-next-line eqeqeq
              }else if( xres.data.data[0].level == '2' ){
                userLevel.value = 'agent.level3'
              }else{
                userLevel.value = 'agent.level4'
              }
            }
          })
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

  // into workplace
  const goWorkplace = async () => {
    await dologin().then((res: any)=>{
      console.log(res);
      logDisable.value = false;
      if ( res.data.code === 200 && res.data.data[1] ) {
        localStorage.setItem('isLogin', 'true');
        const { redirect } = router.currentRoute.value.query;
        router.push({name: (redirect as string) || 'Workplace'});
        Message.success(t('login.success'));
        localStorage.setItem('satoken', res.data.data[0].satoken);
        localStorage.setItem('userLl', res.data.data[0].level);
        // isAssetsAllow.value = true;
        // localStorage.setItem('isAssetsAllow', 'true');
      } else {
        Message.error(t('login.error'));
      }
    })
  }

  // login btn
  const fetchLogin = () => {
    const { ethereum } = window as any; // 获取小狐狸实例
    if (!ethereum) {
      noInVisible.value = true;
      return
    }

    // 没有身份对应徽章
    if( isReady.value === 9 ){
      Message.error(t('dobadge.error'));
      return
    } 
    
    if ( isReady.value === 2 ){
      logDisable.value = true;
      goWorkplace();
    // eslint-disable-next-line no-empty
    } else if ( isReady.value === 0 ){
      connect();
    } else {
      logDisable.value = true;
      // Message.loading(t('login.loading'))
      Message.loading({
        content: t('login.loading'),
        duration: 1500
      })
    }
  };

  const toMetaMask = () => {
    window.open('https://metamask.io/');
  };

  // register 
  const addInfo = (types: any) => {
    addVisible.value = true;
    alltype.value = types;
  };
  const addCancel = () => {
    addVisible.value = false;
    addForm.val = {
      email: '',
      name: ''
    };
  };
  const into = (url: any, type: any) => {
      axios
      .post(
        `https://invitecode.cyberpop.online/business/${url}?address=${userInfo.address}&nickname=${addForm.val.name}&email=${addForm.val.email}&level=${type}`,
        { 
          headers: {
            satoken: String(localStorage.getItem('satoken'))
          }
        }
      )
      .then((res: any) => {
        console.log(res);
        if ( res.data.code === 200 && res.data.data.id) {
          addVisible.value = false;
          addForm.val = {
            email: '',
            name: ''
          };
          Message.success(t('reg.success'));
          goWorkplace();
        } else {
          Message.error(t('reg.error'));
        }
      })
  } 
  const register = () => {
    ruleform.value.validate((res: any) => {
      // eslint-disable-next-line eqeqeq
      if( res == undefined ) {

        // 提前校验 userInfo.address addForm.val.email

        if( alltype.value === 1 ){ // 注册国家代理
          into('nationallevel', 4)
        }else if( alltype.value === 2 ){ // 注册区域代理
          into('arealevel', 3)
        }else {  // 注册伙伴代理
          into('partnerlevel',2)
        }

      }
    })
  };



  onMounted(() => {
    localStorage.clear();
    connect();
  });
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
      margin-bottom: 140px;
    }
    &-badge {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      padding: 0;
      text-align: center;
      margin-bottom: 20px;
      list-style: none;
    }
    &-title {
      width: 400px;
      margin-left: -40px;
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

    // &-change {
    //   margin-bottom: 6px;
    //   font-size: 12px;
    //   span {
    //     cursor: pointer;
    //   }
    // }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }

    &-connect {
      border: none;
      margin-bottom: 10px;
    }
  }
  :deep(.arco-image-footer-caption-title) {
    font-size: 14px !important;
    font-weight: bold;
  }
  .disable {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .login-form {
      &-wrapper {
        margin-bottom: 0;
      }
    }
  }
</style>
