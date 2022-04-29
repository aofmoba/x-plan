<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('wallet.card.title') }}</div>
      <div class="content">
        <div class="card">
          <div class="item">
            <span class="label">{{ $t('wallet.item.level') }} : </span>
            <span class="num">
              {{ cardData.val.level }}
              <!-- <a-spin :loading="loading" :size="16" class="load">
                {{ cardData.val.level }}
              </a-spin> -->
            </span>
          </div>
          <div class="item">
            <span class="label">{{ $t('wallet.item.ratio') }} : </span>
            <span class="num">{{ cardData.val.ratio }}</span>
          </div>
          <div class="item">
            <span class="label">{{ $t('wallet.item.balance') }} : </span>
            <span class="num">{{ cardData.val.balance }}</span>
            <a-button type="primary" shape="round" size="small" class="btn">{{
              $t('wallet.item.btn')
            }}</a-button>
          </div>
        </div>
        <div class="charts">
          <div class="name">{{ $t('wallet.charts.title') }} :</div>
          <Chart height="420px" :option="chartOption" />
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue';
  import axios from 'axios';
  import type { ToolTipFormatterParams } from '@/types/echarts';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';

  // import { useRouter } from 'vue-router';
  // import { Message } from '@arco-design/web-vue';
  // const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const chartsData = ref<number[]>([]);
  const address: any = ref('');
  xAxis.value = [
    '2022-4-17',
    '2022-4-18',
    '2022-4-19',
    '2022-4-20',
    '2022-4-21',
  ];
  chartsData.value = [0, 0, 0, 0, 0];
  const cardData = reactive({
    val: {
      level: '',
      ratio: '20%',
      balance: '0',
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

  const fetchData = async () => {
    setLoading(true);
    try {
      // const { data: chartData } = await queryContentData();
      // chartData.forEach((el: any, idx: number) => {
      //   xAxis.value.push(el.x);
      //   chartsData.value.push(el.y);
      // });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const getLevel = () => {
    setLoading(true);
    axios
      .get(
        `https://invitecode.cyberpop.online/user/doLogin?address=${address.value}`
      )
      .then((res: any) => {
        if ( res.data.code === 200 && res.data.data[1] ) {
          cardData.val.level = res.data.data[0].level;
          setLoading(false);
        }
      })
  }

  onMounted(() =>{
    address.value = localStorage.getItem('address');
    // getLevel();
    cardData.val.level = String(localStorage.getItem('userLl'));
    // fetchData();
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
            font-size: 16px;
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
