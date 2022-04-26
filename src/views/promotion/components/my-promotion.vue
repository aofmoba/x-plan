<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('promotion.title') }}</div>
      <div class="content">
        <div class="card">
          <div class="item">
            <div class="label">{{ $t('promotion.code') }} : </div>
            <div class="num"
              ><a-spin :loading="loading" class="load">{{
                codeInfo
              }}</a-spin></div
            >
          </div>
          <div class="item">
            <div class="label">{{ $t('promotion.link') }} : </div>
            <div class="num">
              <a
                :href="`https://cyberpop.online?code=` + codeInfo"
                target="view_window"
              >
                https://cyberpop.online?code={{ codeInfo }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();
  const codeInfo = ref('');
  const { loading, setLoading } = useLoading(true);

  const getCode = () => {
    setLoading(true);
    if (localStorage.getItem('address')) {
      const address = localStorage.getItem('address');
      axios
        .get(
          `https://invitecode.cyberpop.online/getdata/getpersonal?address=${address}`
        )
        .then((res: any) => {
          if (res.data.code === 200) {
            setLoading(false);
            const result = res.data.data;
            const len = result.length;
            codeInfo.value = result[len - 1].inviterCode;
          }
        });
    }
  };
  getCode();
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
          display: flex;
          padding: 20px 30px;

          .label {
            width: 180px;
            padding-right: 18px;
            color: var(--color-text-2);
            font-size: 16px;
            white-space: nowrap;
            text-align: right;
          }

          .num {
            color: rgb(var(--primary-6));
            font-size: 16px;

            .load {
              width: 60px;
            }

            a {
              color: rgb(var(--primary-6));
            }

            a:hover {
              color: blue;
            }
          }
        }

        &:hover {
          box-shadow: 1px 1px 3px #e5e8ef;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-xs) {
    .item {
      padding: 10px 20px !important;
    }

    .item:last-child {
      flex-direction: column;

      .num {
        margin: 12px auto 0;
        text-align: center;
      }
    }
  }
</style>
