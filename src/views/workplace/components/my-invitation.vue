<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="wrapper">
        <div :style="{ display: 'flex' }">
          <div class="left">
            <a-avatar class="col-avatar">
              <img
                alt="avatar"
                src="//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png"
              />
            </a-avatar>
            <div class="btnGroup">
              <a-button
                v-if="level == 1"
                :class="levels == 2 ? 'active' : ''"
                @click="changeItem(2)"
                >{{ $t('agent.level2') }}</a-button
              >
              <a-button
                v-if="level <= 2"
                :class="levels == 3 ? 'active' : ''"
                @click="changeItem(3)"
                >{{ $t('agent.level3') }}</a-button
              >
              <a-button
                v-if="level <= 3"
                :class="levels == 4 ? 'active' : ''"
                @click="changeItem(4)"
                >{{ $t('agent.level4') }}</a-button
              >
            </div>
          </div>
          <a-card
            class="my-card"
            hoverable
          >
            <template #title>
              <div>{{ $t('workplace.me') }} : {{ address }}</div>
              <a-button type="outline" size="mini" style="margin-top: 6px; height: 18px; line-height: 16px">{{ $t(userLevel) }}</a-button>
            </template>
            <template #extra>
              <div class="code-group">
                <div class="code">
                  <a-button type="outline" size="mini" @click="changeCode()">{{ $t(btnContent) }}</a-button>
                </div>
                <div class="link">
                  <a
                    :href="`https://cyberpop.online?code=` + curCode"
                    target="view_window"
                    >https://cyberpop.online?code={{ curCode }}</a
                  >
                </div>
              </div>
            </template>
            <!-- <div v-if="myInvit.length"> -->
            <div>
              <div class="subtitle">
                <div>{{ $t('workplace.invitees') }}:</div>
                <div class="total">
                  {{ $t('workplace.total') }}: <span>{{ total }}</span>
                </div>
                <div class="hash">
                  {{ $t('workplace.hashrate') }}: <span>{{ hash }}</span>
                </div>
              </div>
              <a-table
                column-resizable
                :bordered="{ cell: true }"
                :data="useDate"
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
                  <a-table-column :title="$t('agent.table.action')">
                    <template #cell="{ record }">
                      <div class="actionBtn">
                        <a-button 
                          disabled
                          type="outline" 
                          size="mini"
                          class="disable" 
                          @click="setDisable(record)"
                        >
                          {{ $t('workplace.table.disable') }}
                        </a-button>
                      </div>
                    </template>
                  </a-table-column>
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

    <!-- disable -->
    <a-modal
      v-model:visible="disVisible"
      :title="$t('workplace.modal.title')"
      class="disModal"
      @cancel="disCancel"
      @ok="disMember"
    >
      <div class="drop">
        <!-- {{ $t('workplace.modal.msg') }} -->
        <span class="addr" style="font-weight: bold">
          {{ address }}
        </span>
        <a-select 
          :model-value="selectVal"
          :style="{width:'320px'}" 
          :placeholder="$t('workplace.modal.place')" 
          @change="handleSelect"
        >
          <a-option>{{ $t('workplace.modal.date1') }}</a-option>
          <a-option>{{ $t('workplace.modal.date2') }}</a-option>
          <a-option>{{ $t('workplace.modal.date3') }}</a-option>
          <a-option>{{ $t('workplace.modal.date4') }}</a-option>
          <a-option>{{ $t('workplace.modal.date5') }}</a-option>
        </a-select>
      </div>
    </a-modal>
  </a-grid>
</template>

<script lang="ts" setup>
  import { onMounted, ref, reactive } from 'vue';
  // import { useRouter } from 'vue-router';
  // import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import axios from 'axios';
  import useLoading from '@/hooks/loading';
  import { computedDur, vertDate } from '@/utils/computed'

  // const router = useRouter();
  const { t } = useI18n();
  const myInvit: any = ref([]);
  const address: any = ref('');
  const inCode: any = ref({});
  const curCode: any = ref('');
  const total: any = ref(0);
  const hash: any = ref(0);
  const levels = ref(2);
  const useDate = ref([]);
  const treeDataL2: any = [];
  const treeDataL3: any = [];
  const treeDataL4: any = [];
  const btnContent: any = ref('workplace.code1')
  const { loading, setLoading } = useLoading(true);
  const level: any = ref('4')
  const userLevel: any = ref('workplace.level')
  const disVisible = ref(false);
  const selectVal = ref('');
  // const pagination: any = ref({
  //   startPage: 1,
  //   size: '2',
  //   total: 10,
  // });
  const changeCode = () =>{
    // eslint-disable-next-line eqeqeq
    if( inCode.value.partnerCode && ( curCode.value == inCode.value.userCode ) ){
      curCode.value = inCode.value.partnerCode;
      btnContent.value = 'workplace.code2';
    // eslint-disable-next-line eqeqeq
    }else if( inCode.value.quyuCode && ( curCode.value == inCode.value.partnerCode ) ){
      curCode.value = inCode.value.quyuCode;
      btnContent.value = 'workplace.code3';
    // eslint-disable-next-line eqeqeq
    }else if( curCode.value == inCode.value.quyuCode ){
      curCode.value = inCode.value.userCode;
      btnContent.value = 'workplace.code1';
    }
  }
  // switch type
  const changeItem = (type: any) => {
    levels.value = type;
    if (type === 2) {
      useDate.value = treeDataL2;
    } else if (type === 3) {
      useDate.value = treeDataL3;
    } else if (type === 4) {
      useDate.value = treeDataL4;
    }
  };

  // push children
  // const childPush = (result: any) => {
  //   const lenL = result.length;
  //   const children: any = []; 
  //   for (let i = 0; i < lenL; i += 1) {
  //     children.push({
  //       connectWallet: result[i].connectWallet,
  //       addr: result[i].address,
  //       download: result[i].download ? 'true' : 'false',
  //       duration:
  //         result[i].onlineTime > 86400
  //           ? t('workplace.table.offline')
  //           : computedDur(result[i].onlineTime),
  //       balance: result[i].fujiCoin ? result[i].fujiCoin : 0,
  //       createTime: result[i].createTime ? vertDate(result[i].createTime) : 'null',
  //       hashrate: result[i].hashrate,
  //     });
  //     hash.value += Number(result[i].hashrate);
  //   }
  //   total.value += lenL;
  //   return children
  // }

  const getMyInvit = async() => {
    setLoading(true);
    myInvit.value = [];
    hash.value = 0;
    const satoken = String(localStorage.getItem('satoken'))
    if (!address.value) {
      await axios
        .get(
          `https://invitecode.cyberpop.online/user/getdata?address=${address.value}`,
          { 
            headers: {
              satoken
            }
          }
        )
        .then((res: any) => {
          console.log(res);
          if (res.data.code === 200) {
            const result = res.data.data;
            inCode.value.quyuCode = result.oneClass ? result.oneClass : '';
            inCode.value.partnerCode = result.twoClass ? result.twoClass : '';
            inCode.value.userCode = result.threeClass;
            curCode.value = result.threeClass;
            if( result.level2 ){
              const resultL2 = result.level2;
              const lenL2 = resultL2.length;
              for (let i = 0; i < lenL2; i += 1) {
                treeDataL2.push({
                  connectWallet: resultL2[i].connectWallet,
                  addr: resultL2[i].address,
                  download: resultL2[i].download ? 'true' : 'false',
                  duration:
                    resultL2[i].onlineTime > 86400
                      ? t('workplace.table.offline')
                      : computedDur(resultL2[i].onlineTime),
                  balance: resultL2[i].fujiCoin ? resultL2[i].fujiCoin : 0,
                  createTime: resultL2[i].createTime ? vertDate(resultL2[i].createTime) : 'null',
                  hashrate: resultL2[i].hashrate,
                });
                hash.value += Number(resultL2[i].hashrate);
              }
              total.value += lenL2;
            }
            if( result.level3 ){
              const resultL3 = result.level3;
              const lenL3 = resultL3.length;
              for (let i = 0; i < lenL3; i += 1) {
                treeDataL3.push({
                  connectWallet: resultL3[i].connectWallet,
                  addr: resultL3[i].address,
                  download: resultL3[i].download ? 'true' : 'false',
                  duration:
                    resultL3[i].onlineTime > 86400
                      ? t('workplace.table.offline')
                      : computedDur(resultL3[i].onlineTime),
                  balance: resultL3[i].fujiCoin ? resultL3[i].fujiCoin : 0,
                  createTime: resultL3[i].createTime ? vertDate(resultL3[i].createTime) : 'null',
                  hashrate: resultL3[i].hashrate,
                });
                hash.value += Number(resultL3[i].hashrate);
              }
              total.value += lenL3;
            }
            if( result.level4 ) {
              const resultL4 = result.level4;
              const lenL4 = resultL4.length;
              for (let i = 0; i < lenL4; i += 1) {
                treeDataL4.push({
                  connectWallet: resultL4[i].connectWallet,
                  addr: resultL4[i].address,
                  download: resultL4[i].download ? 'true' : 'false',
                  duration:
                    resultL4[i].onlineTime > 86400
                      ? t('workplace.table.offline')
                      : computedDur(resultL4[i].onlineTime),
                  balance: resultL4[i].fujiCoin ? resultL4[i].fujiCoin : 0,
                  createTime: resultL4[i].createTime ? vertDate(resultL4[i].createTime) : 'null',
                  hashrate: resultL4[i].hashrate,
                });
                hash.value += Number(resultL4[i].hashrate);
              }
              total.value += lenL4;
            }
            // eslint-disable-next-line eqeqeq
            if( level.value == '1'){
              useDate.value = treeDataL2;
              levels.value = 2;
              userLevel.value = 'agent.level1'
            // eslint-disable-next-line eqeqeq
            }else if( level.value == '2' ){
              useDate.value = treeDataL3;
              levels.value = 3;
              userLevel.value = 'agent.level2'
            // eslint-disable-next-line eqeqeq
            }else if( level.value == '3' ){
              useDate.value = treeDataL4;
              levels.value = 4;
              userLevel.value = 'agent.level3'
            }else{
              levels.value = 0;
              userLevel.value = 'agent.level4'
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

  // disable
  const disAddress: any = ref('');
  const setDisable = (info: any) => {
    disVisible.value = true;
    disAddress.value = info.addr;
  }
  const disCancel = () => {
    disVisible.value = false;
    selectVal.value = '';
  }
  const handleSelect = (v: any) => {
    console.log(v)
    selectVal.value = v;
  };
  const disMember = () => {
    console.log(disAddress.value, selectVal.value);
  }

  const getLevel = async() => {
    await axios
      .get(
        `https://invitecode.cyberpop.online/user/doLogin?address=${address.value}`
      )
      .then((res: any) => {
        if ( res.data.code === 200 && res.data.data[1] ) {
          level.value = res.data.data[0].level;
          getMyInvit();
        }
      })
  }

  // disCancel

  onMounted(() => {
    address.value = localStorage.getItem('address');
    // getLevel();
    level.value = localStorage.getItem('userLl') ? localStorage.getItem('userLl') : '4';
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
    .left{
      display: flex;
      flex-direction: column;
      align-items: center;
      .btnGroup {
        display: flex;
        flex-direction: column;
        margin: 50px 0 10px;
        button{
          margin-bottom: 10px;
          border-radius: 6px;
        }
      }
      .active {
        color: #fff;
        background: #165dff;
      }
    }
    .my-card {
      width: 100%;
      border: none !important;
      :deep(.arco-card-header){
        height: 56px;
      }
      .code-group {
        overflow: hidden;
        text-align: right;
        .code {
            button {
              font-size: 14px;
            }
        }

        .link {
          margin-top: 10px;
          text-align: right;
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
  :deep(.arco-card-body) {
    .arco-table-td:nth-child(2) {
      .arco-table-cell {
        width: 220px;
      }
    }
    .arco-table-td:nth-child(3) {
      .arco-table-cell {
        white-space: nowrap;
      }
    }
    .arco-table-td:nth-child(6) {
      .arco-table-cell {
        width: 120px;
      }
    }
  }
  .drop{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .addr {
      margin-bottom: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .panel-col {
      padding-left: 0;
    }

    .wrapper {
      .left{
        .btnGroup{
          margin-top: 150px;
        }
      }
      .col-avatar {
        display: none;
      }

      :deep(.arco-card-header) {
        flex-direction: column !important;
        height: auto !important;

        .arco-card-header-title {
          width: 80%;
          margin-bottom: 16px;
          white-space: pre-wrap;
          word-break: break-all;
          text-align: center;
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

        .arco-table-td:nth-child(1) {
          .arco-table-cell {
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
