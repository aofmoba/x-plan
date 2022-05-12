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
                v-if="level == 4"
                :class="levels == 4 ? 'active' : ''"
                @click="changeItem(4)"
                >{{ $t('agent.level2') }}</a-button
              >
              <a-button
                v-if="level >= 3"
                :class="levels == 3 ? 'active' : ''"
                @click="changeItem(3)"
                >{{ $t('agent.level3') }}</a-button
              >
              <a-button
                v-if="level >= 2"
                :class="levels == 2 ? 'active' : ''"
                @click="changeItem(2)"
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
                <!-- <div>{{ $t('workplace.invitees') }}:</div> -->
                <div class="total-left">
                  <div v-if="level == 4">{{ $t('agent.level2') }} : <span>{{ totalInfo.level3count }}</span></div>
                  <div v-if="level >= 3">{{ $t('agent.level3') }} : <span>{{ totalInfo.level2count }}</span></div>
                  <div v-if="level >= 2">{{ $t('agent.level4') }} : <span>{{ totalInfo.level1count }}</span></div>
                </div>
                <!-- <div class="total">
                </div> -->
                <div class="hash">
                  <div>{{ $t('workplace.total') }}: <span style="margin-right: 20px;">{{ totalInfo.total }}</span></div>
                  <div>{{ $t('workplace.hashrate') }}: <span>{{ hash }}</span></div>
                </div>
              </div>
              <a-table
                column-resizable
                :bordered="{ cell: true }"
                :data="useDate"
                :stripe="true"
                :loading="loading"
                :pagination="pagination" 
              >
                <!-- :pagination="false" -->
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
                    :title="$t('workplace.table.nickname')"
                  >
                    <template #cell="{ record }">
                      <div class="nickname">{{record.nickname}}</div>
                    </template>
                  </a-table-column>
                  <a-table-column
                    :title="$t('workplace.table.address')"
                    data-index="addr"
                  />
                  <a-table-column
                    :title="$t('workplace.table.email')"
                    data-index="email"
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
                  <a-table-column
                    :title="$t('workplace.table.beiz')"
                  >
                    <template #cell="{ record }">
                      {{record.remarks}}
                      <icon-pen-fill class="remarks-edit" @click="editRemarks(record.addr, record.level)"/>
                    </template>
                  </a-table-column>
                  <!-- <a-table-column :title="$t('agent.table.action')">
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
                  </a-table-column> -->
                </template>
              </a-table>
            </div>
          </a-card>
        </div>
      </div>
    </a-grid-item>

    <!-- disable -->
    <a-modal
      v-model:visible="disVisible"
      :title="$t('workplace.modal.title')"
      class="disModal"
      :cancel-text="$t('login.modal.cancel2')"
      :ok-text="$t('login.modal.ok2')"
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

    <!-- edit remarks -->
    <a-modal
      v-model:visible="editVisible"
      simple
      :cancel-text="$t('login.modal.cancel2')"
      :ok-text="$t('login.modal.ok2')"
      @cancel="editCancel"
      @ok="okRemarks"
    >
      <a-form :model="remarkInfo.val">
        <a-form-item 
          field="remarks" 
          :rules="[{maxLength: 20, message: $t('workplace.table.beiz.msg')}]"
        >
          <a-input v-model="remarkInfo.val.remarks" onfocus />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-grid>
</template>

<script lang="ts" setup>
  import { onMounted, ref, reactive, onActivated } from 'vue';
  import { useI18n } from 'vue-i18n';
  import axios from 'axios';
  import useLoading from '@/hooks/loading';
  import { computedDur, vertDate } from '@/utils/computed'
  import { Message } from '@arco-design/web-vue';
  // import { useRouter } from 'vue-router';

  // const router = useRouter();
  const { t } = useI18n();
  const myInvit: any = ref([]);
  const address: any = ref('');
  const inCode: any = ref({});
  const curCode: any = ref('');
  const hash: any = ref(0);
  const levels = ref(4);
  const useDate = ref([]);
  const treeDataL2: any = ref([]);
  const treeDataL3: any = ref([]);
  const treeDataL4: any = ref([]);
  const btnContent: any = ref('workplace.code1')
  const { loading, setLoading } = useLoading(true);
  const level: any = ref('1')
  const userLevel: any = ref('workplace.level')
  const disVisible = ref(false);
  const editVisible = ref(false);
  const selectVal = ref('');
  const toAddress: any = ref('');
  const toLevel: any = ref('');
  const remarksActive: any = ref(false);
  const remarkInfo = reactive({
    val: {
      remarks: ''
    },
  });
  const totalInfo: any = ref({
    level3count: 0,
    level2count: 0,
    level1count: 0,
    total: 0
  });
  const pagination: any = ref({
    type: 'pagination',
    page: 50,
    pageSize: 10,
  });
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
    if (type === 4) {
      useDate.value = treeDataL2.value;
    } else if (type === 3) {
      useDate.value = treeDataL3.value;
    } else if (type === 2) {
      useDate.value = treeDataL4.value;
    }
  };

  // push children
  const childPush = (result: any) => {
    const lenL = result.length;
    const children: any = []; 
    for (let i = 0; i < lenL; i += 1) {
      children.push({
        key: result[i].id,
        connectWallet: result[i].connectWallet,
        nickname: result[i].nikename,
        addr: result[i].address,
        email: result[i].email,
        download: result[i].download ? 'true' : 'false',
        duration:
          result[i].onlineTime > 86400
            ? t('workplace.table.offline')
            : computedDur(result[i].onlineTime),
        balance: result[i].fujiCoin ? result[i].fujiCoin : 0,
        createTime: result[i].createTime ? vertDate(result[i].createTime) : 'null',
        hashrate: result[i].hashrate,
        remarks: result[i].remarks ? result[i].remarks : 'Cyber user',
        level: result[i].level,
      });
      hash.value += Number(result[i].hashrate);
    }
    totalInfo.value.total += lenL;
    return children
  }

  const getMyInvit = async(toL?: any) => {
    useDate.value = [];
    treeDataL2.value = [];
    treeDataL3.value = [];
    treeDataL4.value = [];
    levels.value = 4;
    userLevel.value = 'workplace.level';
    setLoading(true);
    myInvit.value = [];
    hash.value = 0;
    totalInfo.value.total = 0;
    const satoken = String(localStorage.getItem('satoken'))
    if (address.value) {
      await axios
        .get(
          `https://invitecode.cyberpop.online/user/getdata?address=${address.value}`,
          // `https://invitecode.cyberpop.online/user/getdata?address=0x7291030263771b40731d6bc6b352358d23f5737f`,
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
            inCode.value.quyuCode = result.OneClass ? result.OneClass : '';
            inCode.value.partnerCode = result.twoClass ? result.twoClass : '';
            inCode.value.userCode = result.threeClass;
            curCode.value = result.threeClass;
            if( result.level3 ){
              totalInfo.value.level3count = result.level3.length;
              const children2 = childPush( result.level3 );
              treeDataL2.value.push(...children2)
            }
            if( result.level2 ){
              totalInfo.value.level2count = result.level2.length;
              const children3 = childPush( result.level2 );
              treeDataL3.value.push(...children3)
            }
            if( result.level1 ){
              totalInfo.value.level1count = result.level1.length;
              const children4 = childPush( result.level1 );
              treeDataL4.value.push(...children4)
            }

            if( toL ){
              if( toL === '3'){
                useDate.value = treeDataL2.value;
                levels.value = 4;
                userLevel.value = 'agent.level1'
              }else if( toL === '2' ){
                useDate.value = treeDataL3.value;
                levels.value = 3;
                userLevel.value = 'agent.level2'
              }else{
                useDate.value = treeDataL4.value;
                levels.value = 2;
                userLevel.value = 'agent.level3'
              }
            // eslint-disable-next-line eqeqeq
            } else if( toL == undefined ){
              // eslint-disable-next-line eqeqeq
              if( level.value == '4'){
                useDate.value = treeDataL2.value;
                levels.value = 4;
                userLevel.value = 'agent.level1'
              // eslint-disable-next-line eqeqeq
              }else if( level.value == '3' ){
                useDate.value = treeDataL3.value;
                levels.value = 3;
                userLevel.value = 'agent.level2'
              // eslint-disable-next-line eqeqeq
              }else if( level.value == '2' ){
                useDate.value = treeDataL4.value;
                levels.value = 2;
                userLevel.value = 'agent.level3'
              }else{
                levels.value = 1;
                userLevel.value = 'agent.level4'
              }
            }
          }
        })
        .finally(() => {
          setLoading(false);
          remarksActive.value = true;
        });
    }
  };

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

  // edit remarks
  const editRemarks = (toA: any, toL: any) => {
    editVisible.value = true;
    toAddress.value = toA;
    toLevel.value = toL;
  };
  const editCancel = () => {
    editVisible.value = false;
    remarkInfo.val.remarks = ''
  };
  const okRemarks = () => {
    // console.log('ok', address.value, toAddress.value, remarkInfo.val.remarks);
    axios
      .get(
        `https://invitecode.cyberpop.online/re/setremarks?address=${address.value}&toaddress=${toAddress.value}&remarks=${remarkInfo.val.remarks}`
      )
      .then((res: any) => {
        if ( res.data.code === 200 && res.data.data ) {
          Message.success(t('beiz.success'))
          getMyInvit(toLevel.value);
        }else {
          Message.error(t('beiz.error'))
        }
        remarkInfo.val.remarks = ''
      })
  };
  

  // const onPageChange = (current: number) => {
  //   pagination.value.startPage = current;
  //   getMyInvit();
  // };



  // const getLevel = async() => {
  //   await axios
  //     .get(
  //       `https://invitecode.cyberpop.online/user/doLogin?address=${address.value}`
  //     )
  //     .then((res: any) => {
  //       if ( res.data.code === 200 && res.data.data[1] ) {
  //         level.value = res.data.data[0].level;
  //         getMyInvit();
  //       }
  //     })
  // }

  // disCancel

  onMounted(() => {
    address.value = localStorage.getItem('address');
    // getLevel();
    level.value = localStorage.getItem('userLl') ? localStorage.getItem('userLl') : '1';
    getMyInvit();
  });

  onActivated(() => {
    if( remarksActive.value ){
      getMyInvit();
      console.log('onActivated');
    }
  })

</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
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
        font-size: 14px;
        .total-left {
          display: flex;
          div{
            margin-right: 20px;
          }
        }

        .total-left,
        .hash {
          display: flex;
          span {
            color: red;
            font-size: 16px;
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
    .nickname{
      width: 80px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .arco-table-td:nth-child(4), .arco-table-td:nth-child(5), .arco-table-td:nth-child(6) {
      .arco-table-cell {
        white-space: nowrap;
      }
    }
    .arco-table-td:nth-child(3) {
      .arco-table-cell {
        width: 220px;
      }
    }
    .arco-table-td:nth-child(8) {
      .arco-table-cell {
        width: 120px;
      }
    }
    .arco-table-td:nth-child(10) {
      .arco-table-cell {
        width: 120px;
      }
    }
    .remarks-edit {
      float: right;
      color: #165dff;
      font-size: 22px !important;
      cursor: pointer;
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
  :deep(.arco-row-justify-start) {
    justify-content: center;
  }
  :deep(.arco-form-item-label-col) {
    display: none;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .panel-col {
      padding-left: 0;
    }
    .subtitle {
      flex-direction: column;
      .total-left {
        font-size: 14px;
        white-space: nowrap;
        div{
          margin-bottom: 4px;
        }
      }
      .hash {
        font-size: 14px;
      }
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
        padding: 16px 10px;
      }
    }
  }
</style>
