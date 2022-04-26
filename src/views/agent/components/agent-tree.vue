<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('agent.title') }}</div>
      <div class="content">
        <div class="btnGroup">
          <a-button-group>
            <a-button
              :class="levels == 2 ? 'active' : ''"
              @click="changeItem(2)"
              >{{ $t('agent.level1') }}</a-button
            >
            <a-button
              :class="levels == 3 ? 'active' : ''"
              @click="changeItem(3)"
              >{{ $t('agent.level2') }}</a-button
            >
            <a-button
              :class="levels == 4 ? 'active' : ''"
              @click="changeItem(4)"
              >{{ $t('agent.level3') }}</a-button
            >
          </a-button-group>
          <a-button-group>
            <!-- <a-button type="outline" class="addbtn" @click="addMember">{{ $t('agent.btn.add') }}</a-button> -->
            <a-button
              type="outline"
              size="small"
              status="danger"
              class="delbtn"
              @click="deletekWarning"
              >{{ $t('agent.btn.del') }}</a-button
            >
          </a-button-group>
        </div>
        <div class="card">
          <a-spin :loading="loading" style="display: block">
            <a-tree
              ref="treeRef"
              class="tree"
              block-node
              :data="useDate"
              :load-more="loadMore"
              :virtual-list-props="{
                height: 400,
              }"
              @select="onCheck"
            >
              <template #icon>
                <IconUser />
              </template>
              <template #extra="nodeData">
                <IconPlus
                  style="
                    position: absolute;
                    top: 10px;
                    right: 8px;
                    color: #3370ff;
                    font-size: 12px;
                  "
                  @click="() => onIconClick(nodeData)"
                />
              </template>
            </a-tree>
          </a-spin>
        </div>
      </div>

      <!-- del -->
      <a-modal
        v-model:visible="delVisible"
        hide-cancel
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
            {{ addForm.val.parNode.title }}
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
  import { ref, reactive } from 'vue';
  import axios from 'axios';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { IconPlus } from '@arco-design/web-vue/es/icon';

  // request
  import { queryTreeDate, addTreeDate, queryMore } from '@/views/agent/request';
  // import { useRouter } from 'vue-router';
  // import { Message } from '@arco-design/web-vue';
  // const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const treeRef = ref();
  const useDate = ref([]);
  const treeDataL2: any = [];
  const treeDataL3: any = [];
  const treeDataL4: any = [];
  const levels = ref(2);
  const delVisible = ref(false);
  const addVisible = ref(false);
  let checkArr: any = [];
  let currentNode = {};
  const addForm = reactive({
    val: {
      address: '',
      parNode: {
        key: '',
        title: '',
      },
    },
  });

  // click view data
  const loadMore = (nodeData: any) => {
    let children: any = [];
    queryMore().then((res) => {
      const result = res.data;
      const len = res.data.length;
      children = nodeData.children || [];
      for (let i = 0; i < len; i += 1) {
        children.push({
          title: result[i].address,
          // key: result[i].invId,
          key: `${nodeData.key} + ${children.length + 1}`,
          // isLeaf: true
        });
      }
      console.log(useDate.value);
    });
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        nodeData.children = children;
        resolve();
      }, 300);
    });
  };

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
    queryTreeDate().then((res) => {
      const resultL2 = res.data.level2;
      const resultL3 = res.data.level3;
      const resultL4 = res.data.level4;
      const lenL2 = resultL2.length;
      const lenL3 = resultL3.length;
      const lenL4 = resultL4.length;
      for (let i = 0; i < lenL2; i += 1) {
        treeDataL2.push({
          title: resultL2[i].address,
          key: String(resultL2[i].invId),
        });
      }
      for (let i = 0; i < lenL3; i += 1) {
        treeDataL3.push({
          title: resultL3[i].address,
          key: resultL3[i].invId,
        });
      }
      for (let i = 0; i < lenL4; i += 1) {
        treeDataL4.push({
          title: resultL4[i].address,
          key: resultL4[i].invId,
        });
      }
      useDate.value = treeDataL2;
      // console.log(useDate.value);
      setLoading(false);
    });
  };
  fetchData();

  // add
  const addCancel = () => {
    addVisible.value = false;
    addForm.val = {
      address: '',
      parNode: {
        key: '',
        title: '',
      },
    };
  };
  const onIconClick = (nodeData: any) => {
    addVisible.value = true;
    addForm.val.parNode = nodeData;
    currentNode = nodeData;

    // const children = nodeData.children || []
    // children.push({
    //   title: 'new tree node',
    //   key: `${nodeData.key  }-${  children.length + 1}`,
    //   // isLeaf: true
    // })
    // nodeData.children = children
    // console.log(useDate.value);

    // treeData.value = [...treeData.value];
  };
  const addMember = () => {
    addTreeDate().then((res) => {
      // console.log(res.data);
      // const children = currentNode.children || []
      // children.push({
      //   title: res.data.address,
      //   key: res.data.invId,
      //   // key: `${currentNode.value.key} + ${children.length + 1}`
      //   // isLeaf: true
      // })
      // // console.log(useDate.value);
      // currentNode.children = children
    });
  };

  // delete
  const delCancel = () => {
    delVisible.value = false;
  };
  const deletekWarning = () => {
    delVisible.value = true;
  };
  const deleteMember = () => {
    console.log('sure');
    console.log(checkArr);
    fetchData();
  };

  // 勾选事件
  const onCheck = (selectedKeys: any, e: any) => {
    checkArr = selectedKeys;
  };
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

        .addbtn {
          margin-right: 10px;
        }

        .addbtn:hover {
          background: rgba(64, 128, 255, 0.15);
        }

        .delbtn:hover {
          background: rgba(247, 101, 96, 0.15);
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
          height: 400px;
          padding-left: 20px;
        }
      }
    }
  }

  :deep(.arco-tree-node-selected .arco-tree-node-title) {
    color: var(--color-text-1);
    background: rgb(var(--primary-2));
  }

  .addModal {
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .card {
      padding: 16px 0 !important;

      .tree {
        padding-left: 10px !important;
      }
    }
  }
</style>
