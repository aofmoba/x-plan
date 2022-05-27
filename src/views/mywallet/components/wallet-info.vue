<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('wallet.card.title') }}</div>
      <div class="content">
        <div class="card">
          <div class="item">
            <span class="label">{{ $t('wallet.item.level') }} : </span>
            <span class="num">
              <a-spin :loading="loading" :size="16" class="load">
                {{ $t(cardData.val.level) }}
              </a-spin>
            </span>
          </div>
          <div class="item">
            <span class="label">{{ $t('wallet.item.ratio') }} : </span>
            <span class="num">
              <a-spin :loading="loading" :size="16" class="load">
                {{ cardData.val.ratio ? cardData.val.ratio + '%' : ''}}
              </a-spin>  
            </span>
          </div>
          <div class="item">
            <span class="label">{{ $t('wallet.item.balance') }} : </span>
            <span class="num">
              <a-spin :loading="loading" :size="16" class="load">
                {{ cardData.val.balance }}
              </a-spin>  
            </span>
            <a-button type="primary" shape="round" size="small" class="btn">{{$t('wallet.item.btn')}}</a-button>
          </div>
        </div>
        <div class="charts">
          <div class="name">{{ $t('wallet.charts.title') }} :</div>
          <Chart height="420px" :option="chartOption" />
        </div>
      </div>
    </a-grid-item>

    <!-- 提现 -->
    <a-modal
      v-model:visible="visible"
      :title="$t('financial.modal.title')"
      class="modal"
    >
      <div class="drop" style="width: 320px; margin: 0 auto;">
        <a-form ref="ruleform" :model="formInfo" >
          <a-form-item
            field="inputVal"
            :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input-password
              v-model="formInfo.inputVal"
              :style="{width:'320px'}"
              :placeholder="$t('financial.withdrawn.pwd')" 
              allow-clear
              autocomplete="new-password"
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <a-button @click="handleCancel">{{ $t('login.modal.cancel2') }}</a-button>
        <a-button :loading="btnDisable" type="primary" @click="withdrawn">{{ $t('login.modal.ok2') }}</a-button>
      </template>
    </a-modal>
  </a-grid>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, onActivated, onDeactivated } from 'vue';
  import axios from 'axios';
  import type { ToolTipFormatterParams } from '@/types/echarts';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';

  // import { useRouter } from 'vue-router';
  // const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const chartsData = ref<number[]>([]);
  const address: any = ref('');
  const email: any = ref('');
  const visible = ref(false);
  const ruleform: any = ref(null); // 验证表单
  const btnDisable: any = ref(false);
  xAxis.value = [
    '2022-5-09',
    '2022-5-10',
    '2022-5-11',
    '2022-5-12',
    '2022-5-13',
  ];
  chartsData.value = [0, 0, 0, 0, 0];
  const level: any = ref(0);
  const formInfo: any = ref({
    inputVal: '',
  });

  const cardData = reactive({
    val: {
      level: 'agent.level0',
      ratio: '',
      balance: '',
    },
  });
  const chartOption: any = {
    xAxis: {
      type: 'category',
      offset: 2,
      data: xAxis.value,
      axisLabel: {
        color: '#4E5969',
        formatter(value: number, idx: number) {
          if (idx === 0) return value;
          // if (idx === xAxis.value.length - 1) return '';
          return `${value}`;
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#4E5969',
        },
      },
      axisTick: {
        show: false,
      },
    },
    axisPointer: {
      show: true,
      lineStyle: {
        color: '#23ADFF',
        width: 1,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#4E5969',
        },
      },
      axisLabel: {
        margin: 0,
        padding: [0, 6, 0, 0],
        formatter(value: any, idx: number) {
          if (idx === 0) return value;
          return `${value}`;
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          // type: 'dashed',
          color: '#E5E8EF',
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter(params: any) {
        const [firstElement] = params as ToolTipFormatterParams[];
        return `<div>
          <p class="tooltip-title">${firstElement.axisValueLabel}</p>
          <div class="content-panel"><span>Sales</span><span class="tooltip-value">${Number(
            firstElement.value
          ).toLocaleString()}</span></div>
        </div>`;
      },
      className: 'echarts-tooltip-diy',
    },
    series: [
      {
        type: 'bar',
        data: chartsData.value,
        barWidth: '30%',
        symbolSize: 12,
      },
    ],
  };

  // 提现
  const inputModal = () => {
    if( !Number(cardData.val.balance) ) return
    visible.value = true;
  }
  const handleCancel = () => {
    visible.value = false;
    formInfo.value.inputVal = '';
  }


  // const { Web3 } = window as any
  // const web3obj = new Web3((Web3 as any).givenProvider);
  // const { ethereum } = window as any; // 获取小狐狸实例
  // const toBalanceValue = 7000000000000000000;
  // const balanceValue = 
  const withdrawn = () => {
    ruleform.value.validate(async (res: any) => {
      // eslint-disable-next-line eqeqeq
      if( res == undefined ) {
        btnDisable.value = true;
        // 验证密码 
        // ---

        // const balanceVal = await web3obj.eth.getBalance(address.value)

        // eth转wei 转账 web3.utils.toWei('1', 'ether')
		    // toBalanceValue = await Web3.utils.toWei(balanceVal, 'ether');
        // console.log(toBalanceValue)
        // Web3.eth.sendTransaction({
        //   from: '0xf7fB89554f842F550499AEf4FDa2d1898039851f',
        //   to: '0x100E077e5111C044673114dfe917C807dd60f0D1',
        //   value: toBalanceValue,
        // }, (err: any, addr: any) => {
        //   if (!err) {
        //     console.log(addr, '转账成功！');
        //   } else {
        //     console.log(err);
        //   }
        // });

        // axios
        //   .get(
        //     // `/api/user/alltransfer?address=${address.value}&email=${email.value}&personalreward=${cardData.val.balance}`,
        //     `/api/user/alltransfer?address=${address.value}&email=${email.value}&personalreward=0.1`,
        //   )
        //   .then((result: any) => {
        //     if ( result.data.code === 200 && result.data.data ) {
        //       Message.success(t('wallet.item.withdrawn.succ'))
        //       visible.value = false;
        //       // eslint-disable-next-line no-use-before-define
        //       getBalance();
        //     }else{
        //       Message.error(t('wallet.item.withdrawn.err'))
        //     }
        //   }).finally(()=>{
        //     btnDisable.value = false;
        //   })
      }
    })
  }

  // 获取等级、返佣比
  const getLevel = () => {
    setLoading(true);
    axios
      .get(`/api/user/doLogin?address=${address.value}`)
      .then((res: any) => {
        if ( res.data.code === 200 && res.data.data[1] ) {
          level.value = res.data.data[0].level;
          email.value = res.data.data[0].email;
          // eslint-disable-next-line eqeqeq
          if( res.data.data[0].level == '4'){
            cardData.val.level = 'agent.level1'
          // eslint-disable-next-line eqeqeq
          }else if( res.data.data[0].level == '3' ){
            cardData.val.level = 'agent.level2'  
          // eslint-disable-next-line eqeqeq
          }else if( res.data.data[0].level == '2' ){
            cardData.val.level = 'agent.level3'
          }else{
            cardData.val.level = 'agent.level4'
          }
          setLoading(false);
        }
      })
    const mylevel = String(localStorage.getItem('userLl'));
    axios
      .get(`/api/sys/commission?level=${mylevel}`)
      .then((res: any) => {
        if( res.data.code === 200 && res.data.data ){
          cardData.val.ratio = `${Number(res.data.data.systemval)*100}`;
        }
      })
  }

  // 获取余额
  const getBalance = () => {
    axios
      .get(`/api/user/getuser?address=${address.value}`)
      .then((res: any) => {
        if ( res.data.code === 200 ) {
          cardData.val.balance = (Math.floor(res.data.data.personalrewards * 100) / 100).toFixed(2);
        }
      })
  }

  // 轮询获取余额
  let bTimer: any = null;
  onActivated(() => {
    bTimer =  window.setInterval(() => {
        getBalance();
    }, 60000)
  })
  onDeactivated(() => {
    clearInterval(bTimer)
  })


  onMounted(() =>{
    address.value = localStorage.getItem('address');
    getLevel();
    getBalance();
  })
</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
  }

  .panel-col {
    .title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .content {
      padding: 30px 0;

      .card {
        padding: 30px 0;
        border: 1px solid #e5e8ef;
        border-radius: 4px;

        .item {
          padding: 14px 30px;

          .label {
            padding-right: 18px;
            color: var(--color-text-2);
            font-size: 16px;
          }

          .num {
            color: var(--color-text-1);
            font-size: 18px;
            .load {
              margin-bottom: 4px;
            }
          }

          .btn {
            margin-left: 80px;
            border-radius: 4px;
          }
        }

        &:hover {
          box-shadow: 1px 1px 3px #e5e8ef;
        }
      }

      .charts {
        margin-bottom: 20px;

        .name {
          padding-top: 40px;
          color: var(--color-text-1);
          font-weight: 500;
          font-size: 16px;
          white-space: nowrap;
          text-indent: 30px;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .card {
      padding: 0 !important;

      .item {
        padding: 16px 20px !important;
        overflow: hidden;

        .btn {
          float: right;
          margin-left: 0 !important;
        }
      }
    }

    .charts {
      .name {
        text-indent: 0 !important;
      }
    }
  }
</style>
