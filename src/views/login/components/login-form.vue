<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="methods">
      <div :class="!choose ? 'choose' : ''" @click="exEmail">{{ $t('login.methods.email') }}</div>
      <div :class="choose ? 'choose' : ''" @click="exWallet">{{ $t('login.methods.wallet') }}</div>
    </div>

    <div v-show="choose" class="metamask">
      <ul v-if="data.length > 0" class="login-form-badge">
          <li v-for="(item, index) in data" :key="index">
            <a-image
              :src="item.data.image"
              :title='item.data.name'
              width="100"
              footer-position="outer"
              :preview-visible="false"
            >
            </a-image>
          </li>
      </ul>
      <!-- <div v-if="!isregist" class="login-form-title">{{ $t('login.form.title') }}</div> -->
      <div v-if="isregist" class="login-form-title">{{ $t(userLevel) }} {{nickna}}</div>
      <div class="login-form-error-msg">{{ errorMessage }}</div>
      <a-form
        ref="loginForm"
        :model="userInfo"
        class="login-form"
        layout="vertical"
      >
        <a-space :size="16" direction="vertical">
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
      </a-form>
    </div>

    <div v-show="!choose" class="emailPwd">
      <a-form
        ref="emailForm"
        :model="emailInfo"
        class="email-form"
        layout="vertical"
      >
        <a-form-item
          field="email"
          :rules="[{ required: true, message: $t('login.form.email.errMsg') },{ match: /@/, message: $t('login.form.email.ruleMsg') }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input
            v-model="emailInfo.email"
            :placeholder="$t('login.form.email.placeholder')"
          >
            <template #prefix>
              <icon-email />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input-password
            v-model="emailInfo.password"
            :placeholder="$t('login.form.password.placeholder')"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-space :size="16" direction="vertical">
          <a-button
              :loading="pwdDisable"
              type="primary"
              class="login-form-email"
              long
              @click="emailLogin"
            >
            {{ $t('login.form.login') }}
          </a-button>
        </a-space>
      </a-form>
    </div>

    <!-- delete userInfo -->
    <a-modal
      v-model:visible="delVisible"
      simple
      :mask-closable="false"
      modal-class="delModal"
    >
      <template #title>
        <icon-exclamation-circle-fill />
        {{ $t('agent.delModal.title') }}
      </template>
      <div>{{ $t('login.delUser.msg') }}</div>
      <template #footer>
        <a-button @click="delVisible = false">{{ $t('login.modal.cancel') }}</a-button>
        <a-button :loading="delLoading" type="primary" @click="deleteUser">{{ $t('login.modal.ok') }}</a-button>
      </template>
    </a-modal>

    <!-- install metamask -->
    <a-modal
      v-model:visible="noInVisible"
      :mask-closable="false"
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
      :mask-closable="false"
      :title="$t('login.modal.title2')"
      class="addModal"
      :closable="false"
    >
      <a-form 
        ref="ruleform" 
        :model="addForm.val"
      >
        <a-form-item 
          field="name" 
          :rules="[{ required: true, message: $t('login.form.name.errMsg') },{maxLength: 50, message: $t('login.form.name.errMsg2')}]"
          :validate-trigger="['change', 'blur']"
          :label="$t('login.modal.name')">
          <a-input v-model="addForm.val.name" />
        </a-form-item>
        <a-form-item 
            field="email" 
            :rules="[{ required: true, message: $t('login.form.email.errMsg') }, { match: /@/, message: $t('login.form.email.ruleMsg') }]"
            :validate-trigger="['change', 'blur']"
            :label="$t('login.modal.email')">
          <a-input v-model="addForm.val.email" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="addCancel">{{ $t('login.modal.cancel') }}</a-button>
        <a-button :loading="regDisable" type="primary" @click="register">{{ $t('login.modal.ok') }}</a-button>
      </template>
    </a-modal>
  </div>

  <bindWallet :show="showbind"></bindWallet>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { staticData } from '@/store';
  import axios from 'axios';
  import { storeToRefs } from 'pinia';
  import web3J from '@/utils/web3';
  import contracts from '@/utils/contracts';
  import bindWallet from '@/components/bind-wallet/index.vue';


  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const comStore = staticData();
  const { badgeData, userAddress, isRefresh, showbind } = storeToRefs(comStore);
  const delVisible = ref(false); // 删除C端用户弹框确认
  const noInVisible = ref(false); // metamask下载弹框
  const data: any = ref([]); // 徽章图片信息存储
  const isReady: any = ref(0); // 自动查询状态
  const registerLevel: any = ref(0); // 根据徽章判断注册最高级等级
  const addVisible = ref(false); // 注册弹框
  const alltype: any = ref(0);
  const userLevel: any = ref('workplace.level') // 显示用户等级名称
  const level: any = ref('0'); // 存储用户等级
  const nickna: any = ref('');
  const isregist: any = ref(false); // 标识是否已注册为经销商
  const isregistUser: any = ref(false); // 标识是否已经注册为C端用户
  const ruleform: any = ref(null)
  const logDisable: any = ref(false);
  const regDisable: any = ref(false);
  const delLoading: any = ref(false); // 删除注册用户信息放重复点击
  const dobadge: any = ref('-1'); // 标识是否被邀请成为经销商 1:自己注册(校验注册徽章等级)，0:被邀请(不校验徽章)
  const UniqVer: any = ref(0); // 注册地址、邮箱唯一性验证
  const { Web3 } = window as any
  const web3obj = new Web3((Web3 as any).givenProvider);
  const { ethereum } = window as any; // 获取小狐狸实例
  const userInfo = reactive({
    address: '',
  });
   const emailInfo = reactive({
    email: '',
    password: ''
  });
  const addForm = reactive({
    val: {
      email: '',
      name: '',
      code: ''
    },
  });
  

  // get NFT
  const getNft = async () => {
    data.value = [];
    const ids = [0, 1, 2, 3, 4];
    const result: any = await web3J.balanceOfBatch(contracts.nft_fuji.abi, contracts.nft_fuji.address, ids);
    if( result === 'error' ){
      isReady.value = 0;
      isRefresh.value = false; // 错误中断之后，isRefresh置false，下次切换依旧执行watch
      return
    }
    const len = result.length;
    console.log(result);
    (function loop(i){
        // eslint-disable-next-line eqeqeq
        if(result[i] == 0) { // 为了减少不必要的请求
            // eslint-disable-next-line no-plusplus
            if (++i<len) {
                loop(i);
            }else{
                // eslint-disable-next-line eqeqeq
                if( dobadge.value == '1' ){ // 通过徽章注册的用户再次登录验证对应徽章
                    // eslint-disable-next-line eqeqeq
                    const tempData2 = data.value.filter((item: any) => {
                      // eslint-disable-next-line eqeqeq
                      if( level.value == 2 ){
                        // eslint-disable-next-line eqeqeq
                        return item.id == 1 || item.id == 2
                      }
                      // eslint-disable-next-line eqeqeq
                      return item.id == level.value
                    })
                    if( !tempData2.length ){ // 没有对应徽章
                      isReady.value = 9;
                      Message.error(t('dobadge.error'));
                      logDisable.value = false; // 查询结束，按钮的loading结束
                      return
                    }
                }
                isReady.value = 2;
                logDisable.value = false; // 查询结束，按钮的loading结束
                localStorage.setItem('bImg',JSON.stringify(data.value));
            }
            return;
        }
        axios.get(`/data/badge/${ids[i]}`).then((res: any) => {
            if(result[i] > 0 || i === 101101){
                if ( i === 1 || i === 2 ){
                  registerLevel.value = 2;
                }else if( i === 3 ){
                  registerLevel.value = 3;
                }else if( i === 4 ){
                  registerLevel.value = 4;
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
                if( dobadge.value == '1' ){ // 通过徽章注册的用户再次登录验证对应徽章
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
                  if( !tempData.length ){ // 没有对应徽章
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
      const res = await axios.get(`/api/user/doLogin?address=${userInfo.address}`)
      resolve(res);
    }) 
  }

  const connect = async () => {
    isReady.value = 1;
    if (!ethereum) {
      noInVisible.value = true;
    } else {
      await ethereum
        .request({ method: 'eth_requestAccounts' })
        .then( async (res: any) => {
          const res0 = await web3obj.utils.toChecksumAddress(res[0]);
          userInfo.address = res0;
          localStorage.setItem('address', res0);
          userAddress.value = res0;
          try {
            await axios.get(`/api/user/getuser?address=${userInfo.address}`).then((xres: any)=>{
              if ( xres.data.code === 200 && xres.data.data ) {
                dobadge.value = xres.data.data.dobadge;
                nickna.value = xres.data.data.nikename;
                level.value = xres.data.data.level;
                // eslint-disable-next-line eqeqeq
                if( xres.data.data.level == '4' ){
                  isregist.value = true
                  userLevel.value = 'agent.level1'
                // eslint-disable-next-line eqeqeq
                }else if( xres.data.data.level == '3' ){
                  isregist.value = true
                  userLevel.value = 'agent.level2'
                // eslint-disable-next-line eqeqeq
                }else if( xres.data.data.level == '2' ){
                  isregist.value = true
                  userLevel.value = 'agent.level3'
                // eslint-disable-next-line eqeqeq
                }else if( xres.data.data.level == '1' ){
                  isregistUser.value = true
                  userLevel.value = 'agent.level4'
                }
              }
            })
          } catch (error:any) {
            Message.error(error.message);
            isReady.value = 0;
            logDisable.value = false; // 查询结束，按钮的loading结束
          }
          await web3obj.eth.net.getId().then(async (chainId: any) => {
              console.log(chainId);
              // eslint-disable-next-line eqeqeq
              if(chainId != 43113) {
                const a: any = await web3J.addChain(43113);
                if (a) {
                  getNft();
                } else {
                  isReady.value = 0;
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
      regDisable.value = false;
      if ( res.data.code === 200 && res.data.data[1] ) {
        localStorage.setItem('isLogin', 'true');
        Message.success(t('login.success'));
        router.push({name: 'Workplace'});
        localStorage.setItem('userLl', res.data.data[0].level);
        localStorage.setItem('userEm', res.data.data[0].email);
        // isAssetsAllow.value = true;
        // localStorage.setItem('isAssetsAllow', 'true');
      } else {
        Message.error(t('login.error'));
      }
    })
  }

  // login btn
  const fetchLogin = () => {
    if (!ethereum) { // 没有安装小狐狸
      noInVisible.value = true;
      return
    }
    if( !userInfo.address ){ // 如果未登录钱包
      connect()
      return
    }

    if( isReady.value === 9 && isregist.value ){  // 没有身份对应徽章
      Message.error(t('dobadge.error'));
      return
    } 

    if ( isReady.value === 2 ){
      if( isregist.value ){ // 如果是已注册的
        logDisable.value = true;
        goWorkplace();
      }else if( data.value.length > 0 ){  // 未注册，并且徽章数大于0
        if( isregistUser.value ){ // 如果之前已注册C端用户
          delVisible.value = true;
        }else if( registerLevel.value === 2 ){
          // 注册成为伙伴
          addVisible.value = true;
          alltype.value = 2;
        }else if( registerLevel.value === 3 ){
          // 注册成为区域
          addVisible.value = true;
          alltype.value = 3;
        }else if( registerLevel.value === 4 ){
          // 注册成为全球
          addVisible.value = true;
          alltype.value = 4;
        }
      }else{
        Message.error(t('login.error'));
      }
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

  // 删除注册用户信息弹框 确定 axios
  const deleteUser = () => {
    delLoading.value = true;
    axios
      .delete(
        `/api/business/deluserlevel?address=${userInfo.address}`
      )
      .then((res: any) => {
        if( res.data.code === 200 && res.data.data ){
          isregistUser.value = false;
          Message.success(t('login.delUser.succ'))
          delLoading.value = false;
          delVisible.value = false;
        }else{
          delLoading.value = false;
          Message.error(t('login.delUser.err'))
        }
      })
  }

  const toMetaMask = () => {
    window.open('https://metamask.io/');
  };

  const addCancel = () => {
    addVisible.value = false;
    addForm.val = {
      email: '',
      name: '',
      code: ''
    };
  };
  // register common axios
  const into = (url: any, type: any) => {
    axios
      .post(
        `/api/business/${url}?address=${userInfo.address}&nickname=${addForm.val.name}&email=${addForm.val.email}&level=${type}`
      )
      .then((res: any) => {
        console.log(res);
        if ( res.data.code === 200 && res.data.data.id) {
          addVisible.value = false;
          addForm.val = {
            email: '',
            name: '',
            code: ''
          };
          Message.success(t('reg.success'));
          goWorkplace();
        } else {
          regDisable.value = false;
          Message.error(t('reg.error'));
        }
      })
  } 

  const regPprocess = () => {
    if( alltype.value === 4 ){ // 注册国家代理
      into('nationallevel', 4)
    }else if( alltype.value === 3 ){ // 注册区域代理
      into('arealevel', 3)
    }else {  // 注册伙伴代理
      into('partnerlevel',2)
    }
  } 
  // 弹框信息校验、确认
  const register = () => {
    ruleform.value.validate((res: any) => {
      // eslint-disable-next-line eqeqeq
      if( res == undefined ) {
        regDisable.value = true;
        // 提前校验 userInfo.address addForm.val.email
        axios.get(`/api/user/bemail?email=${addForm.val.email}`)
        .then((result: any) => {
          if ( result.data.code === 200 && result.data.data === true ) { 
            UniqVer.value += 1;
            if( UniqVer.value === 2) regPprocess();
          }else{  
            Message.error(t('login.form.uniqEmail.errMsg'))
            regDisable.value = false;
          }
        })
        axios.get(`/api/user/baddress?address=${userInfo.address}`)
        .then((result: any) => {
          if ( result.data.code === 200 && result.data.data === true ) { 
            UniqVer.value += 1;
            if( UniqVer.value === 2) regPprocess();
          }else{
            Message.error(t('login.form.uniqAddr.errMsg'))
            regDisable.value = false;
          }
        })
      }
    })
  };

  // 在当前页监听钱包地址切换，一旦切换自动刷新
  watch(isRefresh,(newV, oldV) => {
    // eslint-disable-next-line no-use-before-define
    if( newV && router.currentRoute.value.name === 'login'){ // 当在登录页登录方式为钱包登录，切换账号重新查询
      if( isReady.value !== 1 ){
        // 数据初始化
        data.value = [];
        isReady.value = 0;
        registerLevel.value = 0;
        alltype.value = 0;
        userLevel.value = 0;
        level.value = '0';
        nickna.value = '';
        isregist.value = false;
        isregistUser.value = false;
        dobadge.value = '-1';
        UniqVer.value = 0;
        userInfo.address = '';
        addForm.val = {
          email: '',
          name: '',
          code: ''
        };
        connect()
        isRefresh.value = false;
      }
    }
  },{immediate:true,deep:true})



  // methods
  const choose: any = ref(false);
  const exEmail = () => {   // exchange email methods
    choose.value = false;
  }
  const exWallet = () => {  // exchange wallet methods
    choose.value = true;
    console.log( isReady.value )
    // eslint-disable-next-line eqeqeq
    if( isReady.value == 0 ){
      connect();
    }
  }

  // email login
  const pwdDisable: any = ref(false);
  const emailForm: any = ref(null);
  const emailLogin = () => {
    emailForm.value.validate(async (res: any) => {
      // eslint-disable-next-line eqeqeq
      if( res == undefined ) {
        pwdDisable.value = true;
        console.log('success');
        try {
            await axios.post(`/api/user/doLoginEmail?email=${emailInfo.email}&password=${emailInfo.password}`).then((result: any)=>{
              console.log(result);
              pwdDisable.value = false;
              if ( result.data.code === 200 && result.data.data[1] ) {
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('userLl', result.data.data[0].level);
                localStorage.setItem('userEm', result.data.data[0].email);
                if( !result.data.data[0].address ){
                  comStore.updateShowBind(true);
                }else{
                  localStorage.setItem('address', result.data.data[0].address);
                  router.push({name: 'Workplace'});
                  Message.success(t('login.success'));
                }
              } else if( result.data.code === 513 ) {
                Message.error(t('login.email.error1'));
              } else if( result.data.code === 515 ) {
                Message.error(t('login.email.error2'));
              } else if( result.data.code === 516 ) {
                Message.error(t('login.email.error3'));
              } else {
                Message.error(t('login.email.error3'));
              }
            })
        } catch (error: any) {
            Message.error(error.message);
            pwdDisable.value = false; // 查询结束，按钮的loading结束
        }
      }
    })
  }




  onMounted(() => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('bImg')
    localStorage.removeItem('userLl')
    localStorage.removeItem('userEm')
    localStorage.removeItem('address')
    // connect();
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
  .login-form-wrapper{
    .methods{
      display: flex;
      width: 100%;
      height: 40px;
      margin: 20px 0 40px;
      line-height: 40px;
      text-align: center;
      background: #f2f3f5;
      div{
        flex: 1;
        cursor: pointer;
        &:hover{
          opacity: .9;
        }
      }
      .choose{
        background: #165dff;
        color: #ffffff;
      }
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
