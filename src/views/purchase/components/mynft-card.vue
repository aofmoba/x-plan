<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item class="panel-col" :span="24">
      <div class="title">
        <div>{{ $t('purchase.title2') }}</div>
        <a-dropdown @select="handleSelect">
          <a-button
            :value="nowNetWork"
            style="width: 100px;"
            >{{ nowNetWork }}</a-button
          >
          <template #content>
            <a-doption style="width: 100px" :value="{ value: 'Fuji' }"
              >Fuji</a-doption
            >
            <a-doption style="width: 100px" :value="{ value: 'Mumbai' }"
              >Mumbai</a-doption
            >
          </template>
        </a-dropdown>
      </div>
      <div class="content">
        <div class="card">
          <ul v-if="data.length > 0" class="prince">
              <li v-for="(item, index) in data" :key="index">
                <a-image
                  :src="item.data.data.image"
                  :title='item.data.data.name'
                  width="100%"
                  footer-position="outer"
                  :preview-visible="false"
                  style="font-size: 10px"
                >
                  <template #extra>
                    <div>{{ item.number }}</div>
                  </template>
                </a-image>
              </li>
          </ul>
          <div v-if="loadingState == 2 && data.length == 0" class="noting">
              <p>NOT DATA</p>
          </div>
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';
  import Web3 from '@/utils/web3';
  // import { useRouter } from 'vue-router';
  // const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const address: any = ref('');
  const nowNetWork = ref('Fuji');
  const circFlaFuji: any = ref(0);
  const circFlagMum: any = ref(0);
  const loadingState: any = ref(0);
  const data: any = ref([]);
  const badge = [0, 1, 2, 3, 4, 5];
  const game = [2, 3, 101101];
  const box = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // 头像的nft 数组[0, 1]表示 有两个nft资产，id分别为0和1
  const getHead: any = async (res: any, path: any, type: any, isLoading?: any) => {
    return new Promise((resolve, reject) => {
        if(res.length === 0) {
            resolve(1);
            return;
        }
          (function loop(index){
              axios.get(`/api/${path}/${res[index]}`).then((result:any) => {
                data.value.push({
                    id: res[index],
                    type,
                    isLoading: isLoading || false,
                    number: 1,
                    data: result || { name: res[index], image: 'https://d2cimmz3cflrbm.cloudfront.net/nwhome/ba5fcf2b4854eebdc64dc80089f2cc26.png' },
                })
                // eslint-disable-next-line no-plusplus
                if (++index<res.length) {
                    loop(index);
                } else {
                    console.log(data.value);
                    resolve(1)
                }
            }).catch((err:any) => {
                console.log(err); 
            })
          })(0)
    })
  }

  // 正常的nft 数组[0,1]表示id为0的nft没有资产， id为1的ntf资产为1
  const getNFTData: any = async (res: any, path: any, type: any, ids?: any, isLoading?: any) => {
      return new Promise((resolve, reject) => {
          (function loop(index){
              if(res[index] === 0) { // 为了减少不必要的请求
                  // eslint-disable-next-line no-plusplus
                  if (++index<res.length) {
                      loop(index);
                  } else {
                      resolve(1);
                  }
                  return;
              }
              axios.get(`/api/${path}/${ids[index]}`).then((result:any) => {
                  if(res[index] > 0 || index === 101101){
                      data.value.push({
                          id: ids[index],
                          type,
                          isLoading: isLoading || false,
                          number: res[index],
                          data: result || { name: res[index], image: 'https://d2cimmz3cflrbm.cloudfront.net/nwhome/ba5fcf2b4854eebdc64dc80089f2cc26.png' },
                      })
                  }
                  // eslint-disable-next-line no-plusplus
                  if (++index<res.length) {
                      loop(index);
                  } else {
                      console.log(data.value);
                      resolve(1)
                  }
              }).catch((err:any) => {
                  console.log(err); 
              })
          })(0)
      })
  }



  
  // eslint-disable-next-line camelcase
  const { nft, nft_fuji, arms, erc721, GiftBox, cyberClub, cyberClub_Fuji, Cyborg, Cyborg_Fuji, game_Fuji, LootBox } = Web3.contracts;
  const getData: any = async (chainId: any,type: number) => {
    data.value = [];
    loadingState.value = 1;
    if(chainId === 80001){  // mumbai
        if(!type){
            // eslint-disable-next-line camelcase
            const game_resulte = await Web3.balanceOfBatch(arms.abi , arms.address);
            console.log(game_resulte);
            await getNFTData(game_resulte, 'game', 'game_mumbai', game);
            // eslint-disable-next-line camelcase
            const role_result = await Web3.tokensOfOwner(Cyborg.abi, Cyborg.address);
            console.log(role_result);
            await getHead(role_result, 'role', 'role_mumbai');
            // eslint-disable-next-line camelcase
            const cyberClub_result = await Web3.tokensOfOwner(cyberClub.abi, cyberClub.address);
            console.log(cyberClub_result);
            await getHead(cyberClub_result, 'head', 'head_mumbai');
            // eslint-disable-next-line camelcase
            const box_result = await Web3.balanceOfBatch(LootBox.abi, LootBox.address);
            console.log(box_result);
            await getNFTData(box_result, 'box', 'box_mumbai', box);
        }else if(type === 1){
            // eslint-disable-next-line camelcase
            const role_result = await Web3.tokensOfOwner(Cyborg.abi, Cyborg.address);
            await getHead(role_result, 'role', 'role_mumbai');
            // eslint-disable-next-line camelcase
            const cyberClub_result = await Web3.tokensOfOwner(cyberClub.abi , cyberClub.address);
            await getHead(cyberClub_result, 'head', 'head_mumbai');
        }else{
            // eslint-disable-next-line camelcase
            const game_resulte = await Web3.balanceOfBatch(arms.abi , arms.address);
            await getNFTData(game_resulte, 'game', 'game_mumbai', game);
            // eslint-disable-next-line camelcase
            const box_result = await Web3.balanceOfBatch(LootBox.abi, LootBox.address);
            await getNFTData(box_result, 'box', 'box_mumbai', box);
        }
    }
    if(chainId === 43113){ // fuji
        if(!type){
            // eslint-disable-next-line camelcase
            const result = await Web3.balanceOfBatch(nft_fuji.abi, nft_fuji.address);
            console.log(result);
            await getNFTData(result, 'badge', 'badge_fuji', badge);
            // eslint-disable-next-line camelcase
            const game_result: any = await Web3.balanceOfBatch(game_Fuji.abi, game_Fuji.address);
            console.log(game_result, 'game_result');
            await getNFTData(game_result, 'game', 'game_fuji', game)
            // eslint-disable-next-line camelcase
            const Cyborg_result = await Web3.tokensOfOwner(Cyborg_Fuji.abi, Cyborg_Fuji.address);
            console.log(Cyborg_result);
            await getHead(Cyborg_result, 'role', 'role_fuji');
            // eslint-disable-next-line camelcase
            const cyberClub_result = await Web3.tokensOfOwner(cyberClub_Fuji.abi, cyberClub_Fuji.address);
            console.log(cyberClub_result);
            await getHead(cyberClub_result, 'head', 'head_fuji');
            // eslint-disable-next-line camelcase
            const box_result: any = await Web3.balanceOfBatch(GiftBox.abi, GiftBox.address);
            console.log(box_result, 'box_result');
            await getNFTData(box_result, 'box', 'box_fuji', box);
            
        }else if(type === 1){
            // eslint-disable-next-line camelcase
            const Cyborg_result = await Web3.tokensOfOwner(Cyborg_Fuji.abi, Cyborg_Fuji.address);
            await getHead(Cyborg_result, 'role', 'role_fuji');
            // eslint-disable-next-line camelcase
            const cyberClub_result = await Web3.tokensOfOwner(cyberClub_Fuji.abi, cyberClub_Fuji.address);
            await getHead(cyberClub_result, 'head', 'head_fuji');
        }else{
            // eslint-disable-next-line camelcase
            const result = await Web3.balanceOfBatch(nft_fuji.abi, nft_fuji.address);
            console.log(result);
            await getNFTData(result, 'badge', 'badge_fuji', badge);
            // eslint-disable-next-line camelcase
            const game_result: any = await Web3.balanceOfBatch(game_Fuji.abi, game_Fuji.address);
            console.log(game_result, 'game_result');
            await getNFTData(game_result, 'game', 'game_fuji', game)
            // eslint-disable-next-line camelcase
            const box_result: any = await Web3.balanceOfBatch(GiftBox.abi, GiftBox.address);
            console.log(box_result);
            await getNFTData(box_result, 'box', 'box_fuji', box);
        }
    }
    loadingState.value = 2;
  }


  const handleSelect = async (v: any) => {
    nowNetWork.value = v.value;
    if (v.value === 'Mumbai') {
      if (circFlagMum.value !== 1) {
        const a: any = await Web3.addChain(80001);
        if (a) {
          Message.success(t('switch.success'));
          // eslint-disable-next-line eqeqeq
          if(loadingState.value == 2 || loadingState.value == 0){
            getData(80001, 0)
          }
        } else {
          Message.error(t('switch.error'));
        }
      }
    } else if (v.value === 'Fuji') {
      if (circFlaFuji.value !== 1) {
        const a: any = await Web3.addChain(43113);
        if (a) {
          Message.success(t('switch.success'));
          // eslint-disable-next-line eqeqeq
          if(loadingState.value == 2 || loadingState.value == 0){
            getData(43113, 0)
          }
        } else {
          Message.error(t('switch.error'));
        }
      }
    }
  };
  

  const fetchData = async () => {
    setLoading(true);
    try {
      // const { data: chartData } = await queryContentData();
      // chartData.forEach((el: any, idx: number) => {
      //   xAxis.value.push(el.x);
      //   chartsData.value.push(el.y);
      // });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  onMounted(() => {
    address.value = localStorage.getItem('address');
    fetchData();
    // getData(43113, 0)
  })
</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
  }

  .panel-col {
    .title {
      display: flex;
      justify-content: space-between;
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
        .prince {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          padding: 0 10px;
          li {
            width: 47%;
            padding: 10px;
            margin: 5px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 4px;
            :deep(.arco-image-footer) {
              margin-top: 6px;
            }
          }
          li:hover {
            box-shadow: 2px 2px 4px #ccc;
          }
        }

      }

      .charts {
        margin-bottom: 20px;

        .name {
          padding-top: 40px;
          color: var(--color-text-1);
          font-weight: 500;
          font-size: 16px;
          white-space: nowrap;
          text-indent: 30px;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
