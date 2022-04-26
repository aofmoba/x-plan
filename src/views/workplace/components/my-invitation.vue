<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="wrapper">
        <div :style="{ display: 'flex' }">
          <a-avatar class="col-avatar">
            <img
              alt="avatar"
              src="//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png"
            />
          </a-avatar>
          <a-card
            class="my-card"
            :title="$t('workplace.me') + ' : ' + address"
            hoverable
          >
            <template #extra>
              <div class="code-group">
                <div>{{ $t('workplace.code') }}: {{ inCode }}</div>
                <div>
                  <a
                    :href="`https://cyberpop.online?code=` + inCode"
                    target="view_window"
                    >https://cyberpop.online?code={{ inCode }}</a
                  >
                </div>
              </div>
            </template>
            <!-- <div v-if="myInvit.length"> -->
            <div>
              <div class="subtitle">
                <div>{{ $t('workplace.invitees') }}:</div>
                <div class="total">
                  {{ $t('workplace.total') }}: <span>{{ myInvit.length }}</span>
                </div>
                <div class="hash">
                  {{ $t('workplace.hashrate') }}: <span>{{ hash }}</span>
                </div>
              </div>
              <a-table
                column-resizable
                :bordered="{ cell: true }"
                :data="myInvit"
                :stripe="true"
                :loading="loading"
                :pagination="false"
              >
                <!-- :pagination="pagination" @page-change="onPageChange" -->
                <template #columns>
                  <a-table-column :title="$t('workplace.table.online')">
                    <template #cell="{ record }">
                      <img
                        v-show="record.connectWallet == true"
                        src="@/assets/images/online1.png"
                        alt=""
                        sizes="20"
                      />
                    </template>
                  </a-table-column>
                  <a-table-column
                    :title="$t('workplace.table.address')"
                    data-index="addr"
                  />
                  <a-table-column
                    :title="$t('workplace.table.download')"
                    data-index="download"
                  />
                  <a-table-column
                    :title="$t('workplace.table.game')"
                    data-index="duration"
                  />
                  <a-table-column
                    :title="$t('workplace.table.balance')"
                    data-index="balance"
                  />
                  <a-table-column
                    :title="$t('workplace.table.date')"
                    data-index="createTime"
                  />
                  <a-table-column
                    :title="$t('workplace.table.hashrate')"
                    data-index="hashrate"
                  />
                </template>
                <!-- <template #connectWallet="{ rowIndex }">
                  <img
                    v-show="myInvit[rowIndex].connectWallet == true"
                    src="@/assets/images/online1.png"
                    alt=""
                    sizes="20"
                  />
                </template> -->
              </a-table>
            </div>
            <!-- <div v-else>No invitation</div> -->
          </a-card>
        </div>
      </div>
    </a-grid-item>
    <a-grid-item :span="24">
      <a-divider class="panel-border" />
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { onMounted, ref, reactive } from 'vue';
  // import { useRouter } from 'vue-router';
  // import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import axios from 'axios';
  import useLoading from '@/hooks/loading';

  // const router = useRouter();
  const { t } = useI18n();
  const myInvit: any = ref([]);
  const address: any = ref('');
  const inCode: any = ref('');
  const hash: any = ref(0);
  const { loading, setLoading } = useLoading(true);
  // const pagination: any = ref({
  //   startPage: 1,
  //   size: '2',
  //   total: 10,
  // });

  const computedDur = (time: any) => {
    let theTime: number = time; // 秒
    let middle = 0; // 分
    let hour = 0; // 小时

    if (theTime >= 60) {
      middle = Math.floor(theTime / 60);
      theTime = Math.floor(theTime % 60);
      if (middle >= 60) {
        hour = Math.floor(middle / 60);
        middle = Math.floor(middle % 60);
      }
    }
    let result = `${Math.floor(theTime)}s`;
    if (middle > 0) {
      result = `${Math.floor(middle)}m : ${result}`;
    }
    if (hour > 0) {
      result = `${Math.floor(hour)}h : ${result}`;
    }
    return result;
  };

  const getMyInvit = () => {
    myInvit.value = [];
    hash.value = 0;
    if (localStorage.getItem('address')) {
      setLoading(true);
      address.value = localStorage.getItem('address');
      axios
        .get(
          `https://invitecode.cyberpop.online/getdata/getpersonal?address=${address.value}`
        )
        .then((res: any) => {
          // console.log(res);
          if (res.data.code === 200) {
            const result = res.data.data;
            const len = result.length;
            inCode.value = result[len - 1].inviterCode;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < len - 1; i++) {
              hash.value += Number(result[i].hashrate);
              myInvit.value.push({
                connectWallet: result[i].connectWallet,
                addr: result[i].addr,
                download: result[i].download ? 'true' : 'false',
                duration:
                  result[i].onlineTime > 86400
                    ? t('workplace.table.offline')
                    : computedDur(result[i].onlineTime),
                balance: result[i].fujiCoin,
                createTime: result[i].createTime,
                hashrate: result[i].hashrate,
              });
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // const onPageChange = (current: number) => {
  //   pagination.value.startPage = current;
  //   getMyInvit();
  // };

  onMounted(() => {
    getMyInvit();
  });
</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
  }

  .panel-col {
    padding-left: 20px;
    // border-right: 1px solid rgb(var(--gray-2));
  }

  .wrapper {
    width: 100%;

    .my-card {
      width: 100%;
      border: none !important;

      .code-group {
        text-align: right !important;

        div:first-child {
          font-size: 16px;
        }

        div {
          margin-bottom: 6px;

          a {
            color: rgb(var(--primary-6));
            text-decoration: none;
            cursor: pointer;
          }

          a:hover {
            color: blue;
          }
        }
      }

      .subtitle {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 16px;

        .total,
        .hash {
          span {
            color: red;
            font-weight: bold;
          }
        }
      }

      .partners {
        margin-bottom: 4px;
        padding: 0 8px;
        background: rgb(var(--gray-2));
        cursor: pointer;

        span:first-child {
          width: 20%;
          margin-right: 20px;
        }

        span:last-child {
          word-break: break-all;
        }

        span {
          display: inline-block;
          padding: 10px 0;
          color: rgb(var(--gray-8));
          font-size: 16px;
        }

        &:hover {
          background: rgb(var(--gray-1));
        }
      }

      &:hover {
        box-shadow: none;
      }
    }
  }

  .col-avatar {
    width: 52px !important;
    height: 50px !important;
    margin-right: 12px;
    background-color: var(--color-fill-2);
  }

  .up-icon {
    color: rgb(var(--red-6));
  }

  .unit {
    // margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  :deep(.panel-border) {
    margin: 4px 0 0 0;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
  }
  @media (max-width: @screen-xs) {
    .panel-col {
      padding-left: 0;
    }

    .wrapper {
      .col-avatar {
        display: none;
      }

      :deep(.arco-card-header) {
        flex-direction: column !important;
        height: auto !important;

        .arco-card-header-title {
          width: 60%;
          margin-bottom: 16px;
        }

        .code-group {
          text-align: center !important;

          a {
            white-space: normal;
          }
        }
      }

      :deep(.arco-card-body) {
        padding: 16px 2px;

        .arco-table-td:nth-child(2) {
          .arco-table-cell {
            width: 220px;
          }
        }

        .arco-table-td:nth-child(6) {
          .arco-table-cell {
            width: 120px;
          }
        }

        .arco-table-td:nth-child(4) {
          .arco-table-cell {
            width: 90px;
          }
        }

        .arco-table-td:nth-child(1),
        .arco-table-td:nth-child(3) {
          .arco-table-cell {
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
