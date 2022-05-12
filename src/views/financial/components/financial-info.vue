<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('financial.title') }}</div>
      <div class="content">
        <div class="card">
          <div class="item">
            <span class="label">{{ $t('financial.trebate') }} : </span>
            <span class="num">{{ cardData.total }}</span>
          </div>
          <div class="item">
            <span class="label">{{ $t('financial.arebate') }} : </span>
            <span class="num">{{ cardData.already }}</span>
          </div>
          <div class="item">
            <span class="label">{{ $t('financial.wrebate') }} : </span>
            <span class="num">{{ cardData.without }}</span>
            <a-button type="primary" shape="round" size="small" class="btn" @click="inputModal">
              {{ $t('wallet.item.btn') }}
            </a-button>
          </div>
        </div>
        <div class="record" :loading="loading">
          <div class="name">{{ $t('financial.table.title') }} :</div>
          <a-table
            column-resizable
            :bordered="{ cell: true }"
            :data="recordData"
            :stripe="true"
            :loading="loading"
            :pagination="false"
          >
            <!-- :pagination="pagination" @page-change="onPageChange" -->
            <template #columns>
              <a-table-column
                :title="$t('financial.table.col1')"
                data-index="addr"
              />
              <a-table-column
                :title="$t('financial.table.col2')"
                data-index="amount"
              />
              <a-table-column
                :title="$t('financial.table.col3')"
                data-index="gas"
              />
              <a-table-column :title="$t('financial.table.col4')">
                <template #cell="{ record }">
                  <div v-show="record.state == true" class="state">
                    <icon-check-circle />
                    {{ $t('financial.table.col4.txt') }}
                  </div>
                </template>
              </a-table-column>
              <a-table-column
                :title="$t('financial.table.col5')"
                data-index="upTime"
              />
              <a-table-column
                :title="$t('financial.table.col6')"
                data-index="action"
              >
                <template #cell="{ record }">
                  <div v-if="record" style="color: #a42a06;cursor: pointer;">{{ $t('financial.table.col6.txt') }}</div>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </div>
    </a-grid-item>

    <!-- 提现 -->
    <a-modal
      v-model:visible="visible"
      :title="$t('financial.modal.title')"
      class="modal"
      :cancel-text="$t('login.modal.cancel2')"
      :ok-text="$t('login.modal.ok2')"
      @cancel="handleCancel"
      @ok="withdrawn"
    >
      <div class="drop" style="width: 320px; margin: 0 auto;">
        <a-form-item
          field="password"
          :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input-password
            v-model="inputVal"
            :style="{width:'320px'}"
            :placeholder="$t('financial.withdrawn.pwd')" 
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
      </div>
    </a-modal>
  </a-grid>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  // import { useRouter } from 'vue-router';
  // import { Message } from '@arco-design/web-vue';
  // const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const recordData: any = ref([]);
  const visible = ref(false);
  const inputVal = ref('');
  const cardData: any = {
    total: '0',
    already: '0',
    without: '0',
  };
  recordData.value.push(
    {
      key: '1',
      addr: '123',
      amount: '1',
      gas: '1',
      state: '1',
      upTime: '1',
      acton: '1',
    },
    {
      key: '2',
      addr: '123',
      amount: '1',
      gas: '1',
      state: '1',
      upTime: '1',
      acton: '1',
    },
    {
      key: '3',
      addr: '123',
      amount: '1',
      gas: '1',
      state: '1',
      upTime: '1',
      acton: '1',
    },
  )
  const inputModal = (info: any) => {
    visible.value = true;
  }
  const handleCancel = () => {
    visible.value = false;
    inputVal.value = '';
  }
  const withdrawn = () => {
    const address = localStorage.getItem('address')
    // console.log(address, inputVal.value);
  }


  const fetchData = async () => {
    setLoading(false);
  };
  fetchData();
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
        padding: 16px 0;
        border: 1px solid #e5e8ef;
        border-radius: 4px;

        .item {
          padding: 10px 30px;

          .label {
            padding-right: 18px;
            color: var(--color-text-2);
            font-size: 16px;
          }

          .num {
            margin-right: 40px;
            color: black;
            font-size: 16px;
          }

          .btn {
            border-radius: 4px;
          }
        }

        &:hover {
          box-shadow: 1px 1px 3px #e5e8ef;
        }
      }

      .record {
        margin-bottom: 20px;

        .name {
          padding: 40px 0 20px;
          color: var(--color-text-1);
          font-weight: 500;
          font-size: 16px;
          white-space: nowrap;
          text-indent: 30px;
          text-overflow: ellipsis;
        }
        :deep(.arco-table-content) {
          .arco-table-cell {
            text-align: center;
          }
          .state {
            width: 100px;
            height: 20px;
            margin: 0 auto;
            color: #8fcb64;
            border: 1px solid #8fcb64;
            line-height: 18px;
            font-size: 12px;
            border-radius: 2px;
          }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .panel-col {
      padding-left: 0;
    }

    .content {
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