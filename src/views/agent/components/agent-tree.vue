<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('agent.title') }}</div>
      <div class="content">
        <a-space class="btnGroup">
          <div>
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
            <!-- <a-button
              v-if="level <= 3"
              :class="levels == 4 ? 'active' : ''"
              @click="changeItem(4)"
              >{{ $t('agent.level4') }}</a-button
            > -->
          </div>
          <div>
            <a-button 
              disabled
              type="outline" 
              size="small"
              class="addbtn" 
              @click="addInfo()"
            >
              {{ $t('agent.btn.add') }}
            </a-button>
          </div>
        </a-space>
        <div class="card">
          <a-spin :loading="loading" style="display: block">
            <a-table 
              class="tree"
              column-resizable
              :load-more="moretable"
              :data="useDate" 
              :loading="loading"
              :pagination="false"
            >
              <template #columns>
                  <!-- <a-table-column :title="$t('workplace.table.online')">
                    <template #cell="{ record }">
                      <img
                        v-show="record.connectWallet == true"
                        src="@/assets/images/online1.png"
                        alt=""
                        sizes="20"
                      />
                    </template>
                  </a-table-column> -->
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
                          status="danger"
                          class="delbtn"
                          @click="deletekWarning(record)"
                          >
                          {{ $t('agent.btn.del') }}
                        </a-button>
                      </div>
                    </template>
                  </a-table-column>
                </template>
            </a-table>
          </a-spin>
        </div>
      </div>

      <!-- del -->
      <a-modal
        v-model:visible="delVisible"
        simple
        @cancel="delCancel"
        @ok="deleteMember"
      >
        <template #title>
          <icon-exclamation-circle-fill />
          {{ $t('agent.delModal.title') }}
        </template>
        <div>{{ $t('agent.delModal.msg') }}</div>
      </a-modal>

      <!-- add -->
      <a-modal
        v-model:visible="addVisible"
        :title="$t('agent.addModal.title')"
        class="addModal"
        @cancel="addCancel"
        @ok="addMember"
      >
        <div style="margin: 0 0 16px 40px"
          >{{ $t('agent.btn.addto') }}
          <span style="padding-left: 16px; font-weight: bold">
            {{ addForm.val.parNode.addr }}
          </span></div
        >
        <a-form :model="addForm.val">
          <a-form-item field="name" :label="$t('agent.addModal.label')">
            <a-input v-model="addForm.val.address" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { IconPlus } from '@arco-design/web-vue/es/icon';
  import axios from 'axios';
  import { computedDur, vertDate } from '@/utils/computed'

  // request
  import { queryMoreTable, addTableDate } from '@/views/agent/request';
  // import { useRouter } from 'vue-router';
  // import { Message } from '@arco-design/web-vue';
  // const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const address: any = ref('');
  const treeRef = ref();
  const useDate = ref([]);
  const treeDataL2: any = [];
  const treeDataL3: any = [];
  const treeDataL4: any = [];
  const levels = ref(2);
  const delVisible = ref(false);
  const addVisible = ref(false);
  const currentNode: any = [];
  const level: any = ref('4')
  const isLeaf: any = ref(false);

  const addForm = reactive({
    val: {
      address: '',
      parNode: {
        addr: ''
      },
    },
  });

  // push children
  const childPush = (levelArr: any) => {
      const resultL3 = levelArr;
      const lenL3 = resultL3.length;
      const children: any = []; 
      for (let i = 0; i < lenL3; i += 1) {
        children.push({
          key: resultL3[i].id,
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
          level: resultL3[i].level,
          isLeaf: isLeaf.value
        });
      }
      return children
  }

  // load more
  const moretable = (record: any, done: any) => {
    axios
      .get(
        `https://invitecode.cyberpop.online/user/getdata?address=${record.addr}`,
        { 
          headers: {
            satoken: String(localStorage.getItem('satoken'))
          }
        }
      )
      .then((res: any) => {
        if (res.data.code === 200) {
            const result = res.data.data;
            // eslint-disable-next-line eqeqeq
            if( record.level == 2 ){
              if( result.level3 ){
                if( !result.level4 ){
                  isLeaf.value = true;
                }
                const children = childPush(result.level3);
                done(children)
              }else{
                done([]);
              }
            // eslint-disable-next-line eqeqeq
            }else if( record.level == 3 ){
              if( result.level4 ){
                isLeaf.value = false;
                const children = childPush(result.level4);
                done(children)
              }else{
                done([]);
              }
            }else{
              done([]);
            }
        }
      })
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

  // init data
  const fetchData = async () => {
    setLoading(true);
    const satoken = String(localStorage.getItem('satoken'))
    if (address.value) {
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
          if (res.data.code === 200) {
            const result = res.data.data;
            if( result.level2 ){
              const children2 = childPush(result.level2);
              treeDataL2.push(...children2)
            }
            if( result.level3 ){
              const children3 = childPush(result.level3);
              treeDataL3.push(...children3)
            }
            if( result.level4 ){
              isLeaf.value = true;
              const children4 = childPush(result.level4);
              treeDataL4.push(...children4)
            }
            // eslint-disable-next-line eqeqeq
            if( level.value == '1'){
              useDate.value = treeDataL2;
              levels.value = 2;
            // eslint-disable-next-line eqeqeq
            }else if( level.value == '2' ){
              useDate.value = treeDataL3;
              levels.value = 3;
            // eslint-disable-next-line eqeqeq
            }else if( level.value == '3' ){
              useDate.value = treeDataL4;
              levels.value = 4;
            }else{
              levels.value = 0;
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // add
  const addInfo = () => {
    addVisible.value = true;
    addForm.val.parNode.addr = address.value;
    // currentNode = nodeData;
  };
  const addCancel = () => {
    addVisible.value = false;
    addForm.val = {
      address: '',
      parNode: {
        addr: '',
      },
    };
  };

  const addMember = () => {
    addTableDate().then((res: any) => {
      const children = currentNode.children || []
      children.push({
        key: res.data.id,
        connectWallet: res.data.connectWallet,
        addr: res.data.address,
        download: res.data.download ? 'true' : 'false',
        duration:
          res.data.onlineTime > 86400
            ? t('workplace.table.offline')
            : computedDur(res.data.onlineTime),
        balance: res.data.fujiCoin,
        createTime: vertDate(res.data.createTime),
        hashrate: res.data.hashrate,
        isLeaf: false,
      })
      currentNode.children = children
      console.log(useDate);
    });
  };
  // delete
  const deletekWarning = (nodeData: any) => {
    // console.log(nodeData);
    delVisible.value = true;
  };
  const delCancel = () => {
    delVisible.value = false;
  };
  const deleteMember = () => {
    console.log('sure');
    fetchData();
  };

  const getLevel = async () => {
    await axios
      .get(
        `https://invitecode.cyberpop.online/user/doLogin?address=${address.value}`
      )
      .then((res: any) => {
        if ( res.data.code === 200 && res.data.data[1] ) {
          level.value = res.data.data[0].level;
          fetchData();
        }
      })
  }

  onMounted(() => {
    address.value = localStorage.getItem('address');
    // getLevel();
    level.value = localStorage.getItem('userLl') ? localStorage.getItem('userLl') : '4';
    fetchData();
  });
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

      .btnGroup {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .addbtn:hover {
          background: rgba(64, 128, 255, 0.15);
        }
      }

      .active {
        color: #fff;
        background: #165dff;
      }

      .card {
        padding: 16px;
        border: 1px solid #e5e8ef;
        border-radius: 4px;

        &:hover {
          box-shadow: 1px 1px 3px #e5e8ef;
        }

        .tree {
          .actionBtn {
  
            .delbtn:hover {
              background: rgba(247, 101, 96, 0.1);
            }
          }
        }
      }
    }
  }
  :deep(.arco-table-tr) {
    .arco-table-td:nth-child(1), .arco-table-td:nth-child(2) {
      .arco-table-cell {
        white-space: nowrap;
      }
    }
    .arco-table-td:nth-child(5) {
      .arco-table-cell {
        width: 120px;
      }
    }
  }

</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .card {
      padding: 0 !important;
      :deep(.arco-table-tr) {
        padding: 16px 2px;
        .arco-table-td:nth-child(5) {
          .arco-table-cell {
            width: 120px;
          }
        }

        .arco-table-td:nth-child(3) {
          .arco-table-cell {
            width: 90px;
          }
        }

        .arco-table-td:nth-child(2) {
          .arco-table-cell {
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
