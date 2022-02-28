<template>
    <XplanA v-if="innerWidth > 740"/>
    <XplanB v-else/>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import store from '@/store'
import XplanA from './pages/XplanA.vue'
import XplanB from './pages/XplanB.vue'

const innerWidth = computed(() => {
    return store.state.sys?.innerWidth || 0
}) // 监听屏幕宽度

onMounted(() => {
})
</script>
<style lang="less" scoped>
</style>
