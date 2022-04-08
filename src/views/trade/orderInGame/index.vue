<template>
  <div class="container">
    <Breadcrumb :items="['menu.trade.group_name', 'menu.trade.orderInGame']" />
    <a-card :title="$t('trade.orderInGame.tableTitle')" class="general-card">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 6 }"
            :model="formModel"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.id')"
                  field="id"
                >
                  <a-input v-model="formModel.id" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.txhash')"
                  field="txhash"
                >
                  <a-input v-model="formModel.txhash" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.bigNumber')"
                  field="txhash"
                >
                  <a-input v-model="formModel.bigNumber" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.formBadge')"
                  field="formBadge"
                >
                  <a-input v-model="formModel.fromBadge" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.toBadge')"
                  field="toBadge"
                >
                  <a-input v-model="formModel.toBadge" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.timeRange')"
                  field="timeRange"
                >
                  <a-range-picker v-model="formModel.timeRange" show-time />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.inputAccount')"
                  field="inputAccount"
                >
                  <a-input v-model="formModel.inputAccount" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.inputId')"
                  field="inputId"
                >
                  <a-input v-model="formModel.inputId" disabled />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="$t('trade.orderInGame.form.inputAmount')"
                  field="inputAmount"
                >
                  <a-input-number v-model="formModel.inputAmount" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider direction="vertical" style="height: 84px" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space :size="18" direction="vertical">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        :bordered="false"
        :data="renderData"
        :loading="loading"
        :pagination="pagination"
        column-resizable
        row-key="id"
        stripe
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            :title="$t('trade.orderInGame.columns.txhash')"
            width="150"
          >
            <template #cell="{ record }">
              <a-typography-text :ellipsis="{ showTooltip: true }" copyable>
                {{ record.txhash }}
              </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('trade.orderInGame.columns.block_height')"
            align="center"
            data-index="bigNumber"
            width="150"
          />
          <a-table-column
            :title="$t('trade.orderInGame.columns.formBadge')"
            width="150"
          >
            <template #cell="{ record }">
              <a-typography-text :ellipsis="{ showTooltip: true }" copyable>
                {{ record.fromBadge }}
              </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('trade.orderInGame.columns.toBadge')"
            width="150"
          >
            <template #cell="{ record }">
              <a-typography-text :ellipsis="{ showTooltip: true }" copyable>
                {{ record.toBadge }}
              </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('trade.orderInGame.columns.price')"
            align="center"
            data-index="price"
            width="150"
          >
            <template #cell="{ record }">
              {{ record.price || 'NULL' }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('trade.orderInGame.columns.inputAccount')"
            width="150"
          >
            <template #cell="{ record }">
              <a-typography-text :ellipsis="{ showTooltip: true }" copyable>
                {{ record.inputAccount }}
              </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('trade.orderInGame.columns.inputId')"
            align="center"
            data-index="inputId"
            width="150"
          />
          <a-table-column
            :title="$t('trade.orderInGame.columns.inputAmount')"
            align="center"
            data-index="inputAmount"
            width="150"
          />
          <a-table-column
            :title="$t('trade.orderInGame.columns.date')"
            width="150"
          >
            <template #cell="{ record }">
              {{ I18nDataFormat(record.timeStamp * 1000) }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import I18nDataFormat from '@/hooks/dateFormat';

  // request
  import { getOrderListInGame } from '@/views/trade/request';

  // type
  import type { Order, SearchParams } from '@/views/trade/type';
  import type { Pagination } from '@/types/global';
  import dayjs from 'dayjs';

  export default defineComponent({
    setup() {
      const { loading, setLoading } = useLoading(true);
      const { t } = useI18n();

      const renderData = ref<Order[]>([]);
      const formModel = ref<Partial<SearchParams & { timeRange: string[] }>>(
        {}
      );
      const showBlockHeight = ref<boolean>(false);
      const pagination: Pagination = reactive({
        startPage: 1,
        size: 10,
      });

      const fetchData = async (
        params: SearchParams & Pagination = pagination
      ) => {
        setLoading(true);
        getOrderListInGame(params)
          .then((res) => {
            renderData.value = res.data.map((data) => ({ ...data }));
            pagination.startPage = params.startPage;
            pagination.total = res.data.length;
          })
          .finally(() => {
            setLoading(false);
          });
      };

      const search = () => {
        const {
          id,
          txhash,
          bigNumber,
          fromBadge,
          toBadge,
          timeRange,
          inputAccount,
          inputId,
          inputAmount,
        } = formModel.value;
        const { startPage, size } = pagination;
        const startTime = timeRange && dayjs(timeRange[0]).unix();
        const endTIme = timeRange && dayjs(timeRange[1]).unix();

        return fetchData({
          startPage,
          size,
          id,
          txhash,
          bigNumber,
          fromBadge,
          toBadge,
          inputAccount,
          inputId,
          inputAmount,
          start: startTime,
          end: endTIme,
        });
      };

      const onPageChange = (current: number) => {
        pagination.startPage = current;
        fetchData(pagination);
      };

      const reset = () => {
        formModel.value = {};
      };

      onMounted(() => {
        fetchData();
      });

      return {
        renderData,
        pagination,
        formModel,
        showBlockHeight,
        loading,
        search,
        onPageChange,
        reset,
        t,
        I18nDataFormat,
      };
    },
  });
</script>

<style lang="less" scoped>
  .arco-typography {
    margin-bottom: 0;
  }

  .arco-btn {
    width: 100%;
  }
</style>
