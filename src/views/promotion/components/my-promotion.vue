<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('promotion.title') }}</div>
      <div class="content">
        <div class="card">
          <div v-if="codeInfo.userCode" class="item">
            <div class="subitem">
              <div class="label">{{ $t('promotion.user.code') }} :</div>
              <div class="num">
                <a-spin :loading="loading" class="load">
                  {{codeInfo.userCode}}
                </a-spin>
              </div>
            </div>
            <div class="subitem">
              <div class="label">{{ $t('promotion.user.link') }} :</div>
              <div class="num">
                <a
                  :href="`https://cyberpop.online?code=` + codeInfo.userCode"
                  target="view_window"
                >
                  https://cyberpop.online?code={{ codeInfo.userCode }}
                </a>
              </div>
            </div>
          </div>
          <div v-if="codeInfo.partnerCode" class="item">
            <div class="subitem">
              <div class="label">{{ $t('promotion.partner.code') }} :</div>
              <div class="num">
                <a-spin :loading="loading" class="load">
                  {{codeInfo.partnerCode}}
                </a-spin>
              </div>
            </div>
            <div class="subitem">
              <div class="label">{{ $t('promotion.partner.link') }} :</div>
              <div class="num">
                <a
                  :href="`https://cyberpop.online?code=` + codeInfo.partnerCode"
                  target="view_window"
                >
                  https://cyberpop.online?code={{ codeInfo.partnerCode }}
                </a>
              </div>
            </div>
          </div>
          <div v-if="codeInfo.quyuCode" class="item">
            <div class="subitem">
              <div class="label">{{ $t('promotion.quyu.code') }} :</div>
              <div class="num">
                <a-spin :loading="loading" class="load">
                  {{codeInfo.quyuCode}}
                </a-spin>
              </div>
            </div>
            <div class="subitem">
              <div class="label">{{ $t('promotion.quyu.link') }} :</div>
              <div class="num">
                <a
                  :href="`https://cyberpop.online?code=` + codeInfo.quyuCode"
                  target="view_window"
                >
                  https://cyberpop.online?code={{ codeInfo.quyuCode }}
                </a>
              </div>
            </div>
          </div>
          <div v-else class="nothing">{{ $t('promotion.nothing') }}</div>
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
  const codeInfo: any = ref({
    userCode: '',
    partnerCode: '',
    quyuCode: ''
  });
  const { loading, setLoading } = useLoading(true);

  const getCode = () => {
    setLoading(true);
    const address = localStorage.getItem('address');
    const satoken = String(localStorage.getItem('satoken'));
    if (address) {
      axios
        .get(
          `https://invitecode.cyberpop.online/user/getdata?address=${address}`,
          { 
            headers: {
              satoken
            }
          }
        )
        .then((res: any) => {
          if (res.data.code === 200) {
            setLoading(false);
            codeInfo.value.userCode = res.data.data.threeClass ? res.data.data.threeClass : ''
            codeInfo.value.partnerCode = res.data.data.twoClass ? res.data.data.twoClass : ''
            codeInfo.value.quyuCode = res.data.data.oneClass ? res.data.data.oneClass : ''
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
          .subitem {
            display: flex;
            padding: 20px 30px;
            .label {
              padding-right: 18px;
              color: var(--color-text-2);
              font-size: 16px;
              white-space: nowrap;
              text-align: left;
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
        }
        .nothing {
          padding: 20px 30px;
          text-align: center;
          color: var(--color-text-1);
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
      flex-direction: column;
      padding: 10px 20px !important;
      .label {
        text-align: left !important;
      }
      .num {
        margin: 12px auto 0;
        text-align: center;
      }
    }
  }
</style>
