<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">{{ $t('promotion.title') }}</div>
      <div class="content">
        <div class="card">
          <div v-if="codeInfo.quyuCode" class="item">
            <div class="identity"><span>{{ $t('promotion.national') }}</span></div>
            <div v-if="tempDate.length>0" class="badge">
              <img :src="badgeInfo.quyuCodeImg" alt="">
            </div>
            <div class="info">
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
                    :href="`https://cyberpop.online/mystery?code=` + codeInfo.quyuCode"
                    target="view_window"
                  >
                    https://cyberpop.online/mystery?code={{ codeInfo.quyuCode }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="codeInfo.partnerCode" class="item">
            <div class="identity"><span>{{ $t('promotion.regional') }}</span></div>
            <div v-if="tempDate.length>0" class="badge">
              <img :src="badgeInfo.partnerCodeImg" alt="">
            </div>
            <div class="info">
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
                    :href="`https://cyberpop.online/mystery?code=` + codeInfo.partnerCode"
                    target="view_window"
                  >
                    https://cyberpop.online/mystery?code={{ codeInfo.partnerCode }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="codeInfo.userCode" class="item">
            <div class="identity"><span>{{ $t('promotion.partner') }}</span></div>
            <div v-if="tempDate.length>0" class="badge">
              <img :src="badgeInfo.userCodeImg" alt="">
            </div>
            <div class="info">
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
                    :href="`https://cyberpop.online/mystery?code=` + codeInfo.userCode"
                    target="view_window"
                  >
                    https://cyberpop.online/mystery?code={{ codeInfo.userCode }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="codeInfo.userCode" class="item">
            <div class="info">
              <div class="subitem">
                <div class="label">{{ $t('promotion.down.link') }} :</div>
                <div class="num">
                  <a
                    :href="`https://cyberpop.online/download?code=` + codeInfo.userCode"
                    target="view_window"
                  >
                    https://cyberpop.online/download?code={{ codeInfo.userCode }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!codeInfo.userCode && !codeInfo.partnerCode && !codeInfo.quyuCode && !loading" class="nothing">{{ $t('promotion.nothing') }}</div>
          <!-- loading -->
          <a-skeleton v-if="!codeInfo.userCode && !codeInfo.partnerCode && !codeInfo.quyuCode" :animation="true" :loading="loading" style="padding: 30px;">
            <a-space direction="vertical" :style="{width:'100%'}" size="large">
              <a-skeleton-line :rows="4" />
              <a-skeleton-shape />
            </a-space>
          </a-skeleton>
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { staticData } from '@/store';
  import { storeToRefs } from 'pinia';

  const comStore = staticData();
  const { badgeData } = storeToRefs(comStore);
  const { t } = useI18n();
  const tempDate: any = ref([])
  const email: any = ref('');
  const codeInfo: any = ref({
    userCode: '',
    partnerCode: '',
    quyuCode: ''
  });
  const badgeInfo: any = ref({
    userCodeImg: '',
    partnerCodeImg: '',
    quyuCodeImg: ''
  });
  const { loading, setLoading } = useLoading(true);

  const getCode = () => {
    setLoading(true);
    axios
      .get(`/api/user/getdata?email=${email.value}`)
      .then((res: any) => {
        if (res.data.code === 200) {
          setLoading(false);
          codeInfo.value.userCode = res.data.data.threeClass ? res.data.data.threeClass : ''
          codeInfo.value.partnerCode = res.data.data.twoClass ? res.data.data.twoClass : ''
          codeInfo.value.quyuCode = res.data.data.OneClass ? res.data.data.OneClass : ''
        }
      });
  };

  const getBadgeImg = () => {
    if( localStorage.getItem('bImg') ){
      tempDate.value = JSON.parse(localStorage.getItem('bImg') || '')
    }else{
      tempDate.value = [];
    }
    console.log(tempDate.value);
    for( let i=0; i< tempDate.value.length; i+=1 ){
      // eslint-disable-next-line eqeqeq
      if( tempDate.value[i].id == 1 || tempDate.value[i].id == 2 ){
        badgeInfo.value.userCodeImg = tempDate.value[i].data.image;
      // eslint-disable-next-line eqeqeq
      } else if( tempDate.value[i].id == 3 ){
        badgeInfo.value.partnerCodeImg = tempDate.value[i].data.image;
      // eslint-disable-next-line eqeqeq
      }else if( tempDate.value[i].id == 4 ){
        badgeInfo.value.quyuCodeImg = tempDate.value[i].data.image;
      }
    }
  }

  onMounted(()=>{
    email.value = localStorage.getItem('userEm');
    getBadgeImg();
    getCode();

  })
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
        margin: 16px 20px;
        border: 1px solid var(--color-neutral-3);
        border-radius: 4px;
        .item {
          display: flex;
          .identity {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 210px;
            padding: 10px;
            color: var(--color-text-1);
            font-size: 16px;
            border-right: 1px solid var(--color-neutral-3);
          }
          .badge{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 160px;
            min-width: 100px;
            border-right: 1px solid var(--color-neutral-3);
            img {
              width: 90%;
            }
          }
          .info {
            width: 100%;
            .subitem {
              display: flex;
              width: 100%;
              height: 50%;
              padding: 20px 20px;
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
            .subitem + .subitem {
              border-top: 1px solid var(--color-neutral-3);
            }
            .subitem:hover {
              background: var(--color-neutral-1);
            }
          }
        }
        .item + .item {
          border-top: 1px solid var(--color-neutral-3);
        }
        .nothing {
          padding: 40px 30px 0px;
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
    .content {
      width: 800px;
    }
  }
</style>
