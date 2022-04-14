<template>
  <a-carousel
    indicator-type="slider"
    show-arrow="hover"
    auto-play
    style="width: 100%; height: 120px; overflow: hidden; border-radius: 4px"
  >
    <a-carousel-item v-for="(src, idx) in imageSrc" :key="idx">
      <div>
        <img :src="src" style="width: 100%" />
      </div>
    </a-carousel-item>
  </a-carousel>
</template>

<script lang="ts" setup>
  const imageSrc = [
    'https://d2cimmz3cflrbm.cloudfront.net/nwhome/vSwiper2_1.png',
    'https://d2cimmz3cflrbm.cloudfront.net/nwhome/vSwiper2_2.png',
    'https://d2cimmz3cflrbm.cloudfront.net/nwhome/moonlightCentury3.png',
    'https://d2cimmz3cflrbm.cloudfront.net/nwhome/futureCity3.png',
  ];
</script>

<style lang="less" scoped></style>
