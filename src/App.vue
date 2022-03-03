<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
    </router-view>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import store from './store'
onMounted(() => {
    window.onresize = () => store.dispatch('sys/get_screen_size') 
})
</script>
<style>
    @keyframes springtimeAniamtScale2 {
        0% {
            bottom: 2.5vw;
        }
        25% {
            bottom: 0vw;
        }
        50% {
            bottom: -2vw;
        }
        75%{
            bottom: 0vw;
        }
        100% {
            bottom: 2.5vw;
        }
    }
    @keyframes fadeInRight {
        0% {
            opacity: 0;
            -webkit-transform: translateX(30px);
            transform: translateX(30px);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @keyframes fadeInLeft {
        0% {
            opacity: 0;
            -webkit-transform: translateX(-30px);
            transform: translateX(-30px);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @keyframes bounceInLeft {
        0% {
            opacity: 0;
            -webkit-transform: translateX(-2000px);
            -ms-transform: translateX(-2000px);
            transform: translateX(-2000px);
        }
        60% {
            opacity: 1;
            -webkit-transform: translateX(30px);
            -ms-transform: translateX(30px);
            transform: translateX(30px);
        }
        80% {
            -webkit-transform: translateX(-10px);
            -ms-transform: translateX(-10px);
            transform: translateX(-10px);
        }
        100% {
            -webkit-transform: translateX(0);
            -ms-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @keyframes fadeInDown {
        0% {
            opacity: 0;
            -webkit-transform: translateY(-30px);
            -ms-transform: translateY(-30px);
            transform: translateY(-30px);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateY(0);
            -ms-transform: translateY(0);
            transform: translateY(0);
        }
    }
    @keyframes bounceIn {
        0% {
            opacity: 0;
            -webkit-transform: scale(0.3);
            -ms-transform: scale(0.3);
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
        }
        70% {
            -webkit-transform: scale(0.9);
            -ms-transform: scale(0.9);
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
        }
    }
     @keyframes home {
        0% {
            background-size: auto 109%;
        }
        10% {
            background-size: auto 108%;
        }
        20% {
            background-size: auto 107%;
        }
        30%{
            background-size: auto 106%;
        }
        40% {
            background-size: auto 105%;
        }
        50% {
            background-size: auto 104%;
        }
        60% {
            background-size: auto 103%;
        }
        70% {
            background-size: auto 102%;
        }
        80% {
            background-size: auto 101%;
        }
        90% {
            background-size: auto 100%;
        }
        100% {
            background-size: auto 100%;
        }
    }

     @keyframes bounceInRight {
        0% {
            opacity: 0;
            -webkit-transform: translateX(2000px);
            -ms-transform: translateX(2000px);
            transform: translateX(2000px);
        }
        60% {
            opacity: 1;
            -webkit-transform: translateX(-30px);
            -ms-transform: translateX(-30px);
            transform: translateX(-30px);
        }
        80% {
            -webkit-transform: translateX(10px);
            -ms-transform: translateX(10px);
            transform: translateX(10px);
        }
        100% {
            -webkit-transform: translateX(0);
            -ms-transform: translateX(0);
            transform: translateX(0);
        }
    }

    .fadeInDown{
        animation: fadeInDown 1s linear;

    }
    .bounceIn{
        animation: bounceIn 1s linear;

    }
    .fadeInLeft{
         animation: fadeInLeft 1s linear;
    }
    .fadeInRight{
         animation: fadeInRight 1s linear;
    }
    .bounceInLeft{
        animation: bounceInLeft 1s linear;
    }
    .bounceInRight{
         animation: bounceInRight 1s linear;
    }
</style>
