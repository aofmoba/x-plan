<template>
  <div class="container">
    <Breadcrumb :items="['menu.purchase']" />
    <a-grid :cols="24" :col-gap="16" :row-gap="16">
      <a-grid-item :span="12">
        <PurchaseCard />
      </a-grid-item>
      <a-grid-item :span="12">
        <MyNFTCard />
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
  import PurchaseCard from './components/purchase-card.vue';
  import MyNFTCard from './components/mynft-card.vue';
</script>

<style lang="less" scoped>
  .panel {
    overflow: auto;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
  }
  // responsive
  @media (max-width: @screen-xs) {
    :deep(.arco-grid) {
      row-gap: 16px !important;
      column-gap: 0 !important;
    }
    :deep(.arco-grid-item) {
      grid-column: span 24 / span 12 !important;
    }
  }
</style>
