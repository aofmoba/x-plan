<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space class="wrapper">
        <a-avatar :size="54" class="col-avatar">
          <img
            alt="avatar"
            src="//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png"
          />
        </a-avatar>
        <div :style="{ display: 'flex' }">
          <a-card class="my-card" :title="address" hoverable>
            <template #extra>
              <div>{{ inCode }}</div>
            </template>
            <div v-if="myInvit.length">
              <div class="subtitle">
                <span>Invitees:</span>
                <span>total: {{ myInvit.length }}</span>
              </div>
              <div v-for="(item, index) in myInvit" :key="index" class="unit">
                <div class="partners">
                  <span>name: {{ item.name ? item.name : 'null' }}</span>
                  <span>address: {{ item.addr }}</span>
                </div>
              </div>
            </div>
            <div v-else>No invitation</div>
          </a-card>
        </div>
      </a-space>
    </a-grid-item>
    <a-grid-item :span="24">
      <a-divider class="panel-border" />
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  // import { useRouter } from 'vue-router';
  // import { Message } from '@arco-design/web-vue';
  // import { useI18n } from 'vue-i18n';
  import axios from 'axios';

  // const router = useRouter();
  // const { t } = useI18n();
  const myInvit: any = ref([]);
  const address: any = ref('');
  const inCode: any = ref('');

  const getMyInvit = () => {
    myInvit.value = [];
    if (localStorage.getItem('address')) {
      address.value = localStorage.getItem('address');
      axios
        .get(
          `http://13.250.39.184:8612/getdata/getpersonal?address=${address.value}`
        )
        // .get(`http://13.250.39.184:8612/getdata/getpersonal?address=0xf7fB89554f842f550499AEf4FDa2d1898039851f`)
        .then((res: any) => {
          console.log(res);
          if (res.data.code === 200) {
            const len = res.data.data.length;
            inCode.value = res.data.data[len - 1];
            console.log(inCode.value);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < len - 1; i++) {
              myInvit.value.push(res.data.data[i]);
              console.log(myInvit);
            }
          }
        });
    }
  };
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
    padding-left: 43px;
    // border-right: 1px solid rgb(var(--gray-2));
  }

  .my-card {
    width: 45vw;
    border: none !important;

    .subtitle {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
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

  .col-avatar {
    margin-right: 12px;
    background-color: var(--color-fill-2);
  }

  .up-icon {
    color: rgb(var(--red-6));
  }

  .unit {
    margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  :deep(.panel-border) {
    margin: 4px 0 0 0;
  }
</style>
