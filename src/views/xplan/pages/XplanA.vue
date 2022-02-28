<template>
    <!--  mask黑幕  -->
    <div class="mask" v-if="token0Number<=0"></div>

    <div class="welcome" v-else>
        <div class="cover_up"></div>
        <img src="https://d3bhixjyozyk2o.cloudfront.net/section2-1.png" class="section2-1 bgimg" alt="">
        <img src="https://d3bhixjyozyk2o.cloudfront.net/section2-2.png" class="section2-2 bgimg" alt="">
        <img src="https://d3bhixjyozyk2o.cloudfront.net/section3-1.png" class="section3-1 bgimg" alt="">
        <img src="https://d3bhixjyozyk2o.cloudfront.net/section3-2.png" class="section3-2 bgimg" alt="">
        <div class="section4">
            <div>
                <img class="section4-first" src="https://d3bhixjyozyk2o.cloudfront.net/section4-1.png" alt="">
            </div>
            <div>
                <img class="section4-second" src="https://d3bhixjyozyk2o.cloudfront.net/section3-3.png" alt="">
                <img class="section4-last" src="https://d3bhixjyozyk2o.cloudfront.net/section4-2.png" alt="">
            </div>
        </div>
        <!-- 添加support后打开section5        -->
        <!-- <div class="section5"></div> -->
        <div class="foot-bottom"></div>
        <div class="content">
            <div class="models">
                <div class="left-img"></div>
                <div class="center-models">
                    <img class="section2-img2" src="https://d3bhixjyozyk2o.cloudfront.net/models-c.png" alt="">
                    <div class="title">ECONOMIC MODELS</div>
                    <div class="nft_box">
                        <div>
                            <img src="https://cyberpop.mypinata.cloud/ipfs/QmasqFt6yffS7cyUq4gZKQ5fxXuxFPQ1jbcar17z9dYUku" alt="">
                            <span class="number">Number of owned: {{ token0Number }}</span>
                        </div>
                    </div>
                    <div class="contract_address">
                        Contract Address: 0x82cCB2FE8f4d07702f7c2F4200f0FBF630C52406    
                    </div> 
                </div>
                <div class="right-img"></div>
            </div>
            <div class="round">
                <ul class="round-wrap">
                    <li>
                        <div class="round-title">Seed &nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div>7%</div>
                        <!-- <div class="round-price">$0.13</div> -->
                        <div class="round-month">10 month</div>
                        <div class="round-schedule">
                            <div class="schedule-line">
                                <!-- <img src="https://d3bhixjyozyk2o.cloudfront.net/yellow.png" alt=""> -->
                                <div class="wrap1"></div>
                            </div>
                            <!-- <div class="percent">100%</div> -->
                            <img class="schedule-locking" src="https://d3bhixjyozyk2o.cloudfront.net/locking1.png" alt="">
                        </div>
                    </li>
                    <li>
                        <div class="round-title">Round A</div>
                        <div>8%</div>
                        <!-- <div class="round-price">$0.25</div> -->
                        <div class="round-month">10 month</div>
                        <div class="round-schedule">
                            <div class="schedule-line">
                                <!-- <div class="wrap2"> -->
                                    <!-- <img class="schedule-bg" src="https://d3bhixjyozyk2o.cloudfront.net/green1.png" alt=""> -->
                                    <!-- <span></span> -->
                                <!-- </div> -->
                            </div>
                            <!-- <div class="percent">0%</div> -->
                            <img class="schedule-locking locking2" src="https://d3bhixjyozyk2o.cloudfront.net/locking1.png" alt="">
                        </div>
                    </li>
                    <li>
                        <div class="round-title">Round B</div>
                        <div>3%</div>
                        <!-- <div class="round-price">$0.42</div> -->
                        <div class="round-month third-month">8 month</div>
                        <div class="round-schedule">
                            <!-- <div class="percent">0%</div> -->
                            <img class="schedule-locking" src="https://d3bhixjyozyk2o.cloudfront.net/locking1.png" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ratio">
                <div class="ratio-wrap">
                    <div class="ratio-left" id="ele1">
                        <div class="title">
                            <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-leftArrow.png" alt="">
                            <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-leftTitle.png" alt="">
                            <div class="title-txt">DISTRIBUTION RATIO</div>
                            <div class="title-tips">CYBER POP
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-leftLine.png" alt="">
                            </div>
                            <img class="title-imgRotateY" src="https://d3bhixjyozyk2o.cloudfront.net/ratio-leftTitle.png" alt="">
                        </div>
                        <div class="pie">
                            <div class="pie-main">
                                <div>
                                    <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-leftPie15.png" alt="">
                                    <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-leftPie15-text.png" alt="">
                                </div>
                                <div class="percent">18%</div>
                            </div>
                            <img class="pie-rest" src="https://d3bhixjyozyk2o.cloudfront.net/ratio-leftPie.png" alt="">
                            <div class="total">Total supply 120,000,000 CYT</div>
                        </div>
                    </div>
                    <div class="ratio-right" id="ele2">
                        <ul>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block1.png" alt="">
                                <a href="">private investment</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block2.png" alt="">
                                <a href="">consultants and legal services</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block3.png" alt="">
                                <a href="">investment institution</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block4.png" alt="">
                                <a href="">community building and airdrop</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block5.png" alt="">
                                <a href="">public offering</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block6.png" alt="">
                                <a href="">cological construction fund</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block7.png" alt="">
                                <a href="">1n-game output</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block8.png" alt="">
                                <a href="">team</a>
                            </li>
                            <li>
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/ratio-block9.png" alt="">
                                <a href="">pledge and interest payment</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="excel">
                <div class="excel-wrap">
                    <div class="excel-item1">
                        <iframe class="iframe1" src="https://docs.google.com/spreadsheets/d/1T6TDvp4SIi-m-yGz6BqeEzokKYOdUQYOQGjm2AnSSXg/edit?usp=sharing"></iframe>
                    </div>
                    <div class="excel-item2">
                        <iframe class="iframe2" src="https://docs.google.com/spreadsheets/d/1ox6pcTp9gCk8c2iHTtr6AaHqF2bc9JIZOCNZD2bZq1k/edit#gid=1386834576"></iframe>
                    </div>
                </div>
                <div class="btn">
                    <a class="table1" target="view_window" href="https://docs.google.com/spreadsheets/d/1T6TDvp4SIi-m-yGz6BqeEzokKYOdUQYOQGjm2AnSSXg/edit?usp=sharing">OPEN SHEET</a>
                    <a class="table2" target="view_window" href="https://docs.google.com/spreadsheets/d/1ox6pcTp9gCk8c2iHTtr6AaHqF2bc9JIZOCNZD2bZq1k/edit#gid=1386834576">OPEN SHEET</a>
                </div>
            </div>
            <div class="category" id="ele3">
                <div class="category-wrap">
                    <img class="category-info" src="https://d3bhixjyozyk2o.cloudfront.net/category-info3.png" alt="">
                    <!-- <img class="category-arrow1" src="https://d3bhixjyozyk2o.cloudfront.net/category-arrow1.png" alt=""> -->
                    <!-- <img class="category-arrow2" src="https://d3bhixjyozyk2o.cloudfront.net/category-arrow2.png" alt=""> -->
                    <!-- <img class="category-arrow3" src="https://d3bhixjyozyk2o.cloudfront.net/category-arrow3.png" alt=""> -->
                </div>
            </div>
            <div class="rordmap">
                <div class="rordmap-left">
                    <div class="time1" id="eTime1">
                        <div class="time1-date">
                            <div class="time1-txt">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/2021.03.png" alt="">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/time1-yellow.png" alt="">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/time1-orange.png" alt="">
                            </div>
                            <div class="time1-h">1</div>
                        </div>
                        <div class="time1-content">
                            <ul>
                                <li class="txt1">PROJECT CONCEPT</li>
                                <li class="txt2">BASIC GAMEPLAY DESIGN</li>
                                <li class="txt3">GAME SCENE DEVELOPMENT</li>
                                <li class="txt4">GAME ART MODELING</li>
                            </ul>
                        </div>~
                    </div>
                    <div class="time3" id="eTime3">
                        <img class="time3-bg" src="https://d3bhixjyozyk2o.cloudfront.net/time3-bg.png" alt="">
                        <div class="time3-date">
                            <div class="time3-txt">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/2022.03.png" alt="">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/time1-yellow.png" alt="">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/time1-orange.png" alt="">
                            </div>
                            <div class="time3-h">3</div>
                        </div>
                        <div class="time3-content">
                            <ul>
                                <li class="txt1">GAME TRIAL LAUNCH</li>
                                <li class="txt2">GAME NET MALL</li>
                                <li class="txt3">RELEASE UGC TOOLCHAIN</li>
                                <li class="txt4">TOKEN CYT RELEASED</li>
                            </ul>
                        </div>
                    </div>
                    <div class="time4" id="eTime4">
                        <div class="time4-date">
                            <div class="time4-txt">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/2022.06.png" alt="">
                                <img src="https://d3bhixjyozyk2o.cloudfront.net/time4-arrow.png" alt="">
                            </div>
                            <div class="time4-h">4</div>
                        </div>
                        <div class="time4-content">
                            <div class="wrap">
                                <div>THE SOCIALFI MECHANISM</div>
                                <div>GAME UNIONS SYSTEM</div>
                            </div>
                        </div>
                        <img class="time4-lastImg" src="https://d3bhixjyozyk2o.cloudfront.net/time4-bottom.png" alt="">
                    </div>
                </div>
                <div class="rordmap-timeLine" id="ele4">
                    <div class="title">RORD&nbsp;&nbsp;MAP</div>
                    <img class="location" src="https://d3bhixjyozyk2o.cloudfront.net/rordmap-timeLine1.png" alt="">
                    <img class="line" src="https://d3bhixjyozyk2o.cloudfront.net/rordmap-timeLine2.png" alt="">
                    <img class="arrow" src="https://d3bhixjyozyk2o.cloudfront.net/rordmap-timeLine3.png" alt="">
                </div>
                <div class="rordmap-right">
                    <div class="time2" id="eTime2">
                        <div class="time2-date">
                            <div class="time2-h">2</div>
                            <img src="https://d3bhixjyozyk2o.cloudfront.net/2021.10.png" alt="">
                        </div>
                        <div class="time2-content">
                            <ul>
                                <li>UGC PROJECT APPROVAL</li>
                                <li>WEBSITE LAUNCHED</li>
                                <li>GAME DEMO ONLINE</li>
                                <li>CHARACTER MODELING</li>
                            </ul>
                        </div>
                    </div>
                    <div class="time5" id="eTime5">
                        <img class="time5-bg" src="https://d3bhixjyozyk2o.cloudfront.net/time5-bg.png" alt="">
                        <div class="time5-date">
                            <div class="time5-h">5</div>
                            <img src="https://d3bhixjyozyk2o.cloudfront.net/2022.10.png" alt="">
                        </div>
                        <div class="time5-content">
                            <ul>
                                <li>GAME TRIAL LAUNCH</li>
                                <li>GAME NFT MALL</li>
                                <li>RELEASE UGC TOOLCHAIN</li>
                                <li>TOKEN CYT RELEASED</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="supported">
                <div class="title">SUPPORTED CAPITAL</div>
                <div class="wrap">
                    <img src="https://d3bhixjyozyk2o.cloudfront.net/logo.png" alt="">
                </div>
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue'
import store from '@/store'
import {  useRouter } from 'vue-router'
import Web3 from '@/tools/web3'

const router = useRouter()

const active = computed(() => store?.state.user?.active);

const changeMenu = (type: any, route?: any) => {
    // active.value = type;
    if(type == 2) {
        window.open('https://medium.com/@Cyberpopnewworld')
        return
    }
    store.dispatch('user/changeActive', type)
    if(route) router.push({ path: `${route}`})
}
const token0Number: any = ref(0);
const id: any = ref(0)

const connect: any = async () => {
    const [accounts]: any = await Web3.login().then((res: any) => {
        return res;
    })
    Web3.getBalance(accounts).then((res) => {
        token0Number.value = res[0];
        // if(token0Number.value <= 0){
        //     window.location.href = 'https://game.cyberpop.online/';
        // }
    })
    id.value = accounts;
    let len = id.value.length-1;
    id.value = id.value[0]+id.value[1]+id.value[2]+id.value[3]+id.value[4]+"*****"+id.value[len-3]+id.value[len-2]+id.value[len-1]+id.value[len];
}

const checkScrollHeightAndLoadAnimation: any = () => {
        const windowHeight: Number = window.innerHeight;

        let ele1 = document.getElementById("ele1") as HTMLElement;
        let ele2 = document.getElementById("ele2") as HTMLElement;
        let ele3 = document.getElementById("ele3") as HTMLElement;
        let ele4 = document.getElementById("ele4") as HTMLElement;
        let eTime1 = document.getElementById("eTime1") as HTMLElement;
        let eTime2 = document.getElementById("eTime2") as HTMLElement;
        let eTime3 = document.getElementById("eTime3") as HTMLElement;
        let eTime4 = document.getElementById("eTime4") as HTMLElement;
        let eTime5 = document.getElementById("eTime5") as HTMLElement;
        const ele1Top: Number = ele1.getBoundingClientRect().top; //距离屏幕顶部的距离
        const ele2Top: Number = ele2.getBoundingClientRect().top; //距离屏幕顶部的距离
        const ele3Top: Number = ele3.getBoundingClientRect().top; //距离屏幕顶部的距离
        const ele4Top: Number = ele4.getBoundingClientRect().top; //距离屏幕顶部的距离
        const eTime1Top: Number = eTime1.getBoundingClientRect().top; //距离屏幕顶部的距离
        const eTime2Top: Number = eTime2.getBoundingClientRect().top; //距离屏幕顶部的距离
        const eTime3Top: Number = eTime3.getBoundingClientRect().top; //距离屏幕顶部的距离
        const eTime4Top: Number = eTime4.getBoundingClientRect().top; //距离屏幕顶部的距离
        const eTime5Top: Number = eTime5.getBoundingClientRect().top; //距离屏幕顶部的距离

        let arr = [
            {
                el: ele1,
                top: ele1Top
            },
            {
                el: eTime1,
                top: eTime1Top
            },
            {
                el: eTime3,
                top: eTime3Top
            },
            {
                el: eTime4,
                top: eTime4Top
            },
        ]
        for(let i = 0; i < arr.length; i++){
            if(arr[i].top < windowHeight){
                arr[i].el.classList.add('bounceInLeft')
            }
            
        }
        if(ele2Top < windowHeight) ele2.classList.add('bounceInRight')
        if(ele3Top < windowHeight) ele3.classList.add('bounceInRight')
        if(ele4Top < windowHeight) ele4.classList.add('fadeInDown')
        if(eTime2Top < windowHeight) eTime2.classList.add('bounceInRight')
        if(eTime5Top < windowHeight) eTime5.classList.add('bounceInRight')
}


onUnmounted(() => {
    window.removeEventListener("scroll", checkScrollHeightAndLoadAnimation, true);
})

onMounted(() => {
    connect()
    window.addEventListener('scroll', checkScrollHeightAndLoadAnimation, true);
})

</script>
<style lang="less" scoped>
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
    a {
        text-decoration: none;
    }
    @keyframes process {
        0% { background-position: 0 0; }
        100% { background-position: 30px 0; }
    }
    @keyframes processInit{
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }
    .mask{
        background-color: #000;
        height: 100vh;
    }
    .nft_box{
        display: flex;
        & > div{
            width: 25vw;
            height: 25vw;
            text-align: center;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .number{
            color: #fff;
        }
    }
    .contract_address{
        width: 100vw;
        text-align: center;
        margin-top: 4vw;
        color: #fff;
    }
    .router-link-active {
        text-decoration: none;
    }
    .welcome{
        position: relative;
        width: 100%;
        // height: 50vw;
        box-shadow: 0px -37px 29px #000;
        margin-top: 2px;
        overflow: hidden;
        .cover_up{
            width: 100%;
            height: 100%;
            position: absolute;
            background: #000;
            opacity: 1;
            z-index: -1;
        }
        .bgimg{
            width: 50%;
            // vertical-align: middle;
            vertical-align: top;            
        }
        .section2-1{
            height: 86vw;
        }
        .section2-2{
            // height: 30vw;
        }
        .section3-1{
            // height: 73vw;
            height: 92vw;
        }
        .section3-2{
            height: 68vw;
        }
        .section4{
            display: flex;
            align-items: center;
            height: 110.2vw;
            div{
                // align-items: center;
            }
            div:first-child{

            }
            img{
                width: 50vw;
            }
            .section4-first{
                height: 162vw;
            }
            .section4-second{
                height: 85vw;
            }
            .section4-last{
                // height: 55.04vw;
                height: 110vw;
            }
        }
        // .section5{
        //     background-image: url('../../../assets/support/section5.png');
        //     background-size: 100% 100%;
        //     height: 36vw;
        // }
        .foot-bottom{
            height: 12vw;
            background-color: black;
        }
        .content{
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            .models{
                display: flex;
                justify-content: space-between;
                .left-img{
                    width: 37.5vw;
                    height: 22vw;
                    background-image: url('../../../assets/support/models-l.png');
                    background-position: -11vw -1.4vw;
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                    animation: fadeInLeft .5s linear;
                }
                .right-img{
                    width: 37.5vw;
                    height: 22vw;
                    background-image: url('../../../assets/support/models-r.png');
                    background-position: 11vw -1.4vw;
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                    animation: fadeInRight .5s linear;
                }
                .center-models{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 12vw;
                    animation: fadeInDown .5s linear;
                    & > img{
                        width: 12vw;
                        margin-top: .6vw;
                        margin-bottom: 3vw;
                    }
                    & > .title{
                        color:#fff;
                        font-size: 2.8vw;
                        font-family: EDIX;
                        white-space: nowrap;
                    }
                }
            }
            .excel{
                width: 100%;
                .excel-wrap{
                    width: 100%;
                    height: 50vw;
                    margin-top: 5vw;
                    display: flex;
                    justify-content: center;
                    overflow: hidden;
                    .excel-item1{
                        width: 50vw;
                        height: 100%;
                        margin-top: -7.41vw;
                        margin-right: 2.2vw;
                        overflow: hidden;
                        .iframe1{
                            width: 50vw;
                            height: 104%;
                        }
                    }
                    .excel-item2{
                        width: 30vw;
                        height: 100%;
                        margin-top: -7.41vw;
                        overflow: hidden;
                        .iframe2{
                            width: 30vw;
                            height: 104%;
                        }
                    }
                }
                .btn{
                    position: relative;
                    width: 100%;
                    height: 10vw;
                    margin-top: -5.8vw;
                    text-align: center;
                    a{
                        display: inline-block;
                        width: 9vw;
                        height: 2.3vw;
                        line-height: 2.3vw;
                        color: #000;
                        font-size: 1vw;
                        background-color: #CFE2F3;
                        border-radius: .2vw;
                    }
                    .table1{
                        position: absolute;
                        left: 29vw;
                    }
                    .table2{
                        position: absolute;
                        right: 18.8vw;
                    }
                }
            }
            .round{
                animation: fadeInDown .6s linear;
                .round-wrap{
                    margin: 7vw 16vw 0;
                    li{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 3vw;
                        color:#fff;
                        font-family: OPPOSans;
                        div:not(:nth-child(5)){
                            font-size: 1.6vw;
                        }
                        .round-price{
                            opacity: .8;
                        }
                        .round-month{
                            // margin: 0 1vw;
                            opacity: .6;
                        }
                        .third-month{
                            margin-left: 1.4vw;
                        }
                        .round-schedule{
                            position: relative;
                            width: 35.5vw;
                            height: 3.4vw;
                            padding: .4vw;
                            // color: #fc4857;
                            color: #fff;
                            line-height: 2vw;
                            border: .3vw solid #ff593d;
                            .schedule-line{
                                position: absolute;
                                left: .4vw;
                                width: 34.1vw;
                                height: 2vw;
                                // img{
                                //     width: 100%;
                                //     height: 100%;
                                //     // #FFE980
                                // }
                                .wrap1{
                                    position: relative;
                                    height: 2vw;
                                    width: 90%; // 控制进度
                                    background-color: #dbba11;
                                    background-image: linear-gradient(-60deg, transparent 0rem, transparent 0.8rem, #f5de6b 0.8rem, #e2c94d 1.6rem, transparent 1.6rem, transparent 2.4rem, #e6d273 2.4rem);
                                    background-size: 30px 38px;
                                    animation: processInit 1000ms linear,process 800ms infinite linear;
                                }
                                .wrap2{
                                    position: relative;
                                    height: 2vw;
                                    width: 80%; // 控制进度
                                    background-color: #CCF493;
                                    background-image: linear-gradient(-60deg, transparent 0rem, transparent 0.8rem, #aed37a 0.8rem, #99c063 1.6rem, transparent 1.6rem, transparent 2.4rem, #acd670 2.4rem);
                                    background-size: 30px 38px;
                                    animation: process 800ms infinite ease;
                                    // .schedule-bg{
                                    //     width: 100%;
                                    // }
                                    // span{
                                    //     position: absolute;
                                    //     top: 0;
                                    //     right: .5vw;
                                    //     width: .4vw;
                                    //     height: 100%;
                                    //     background: #060709;
                                    // }
                                }
                            }
                            .percent{
                                position: absolute;
                                left: .6vw;
                            }
                            .schedule-locking{
                                position: absolute;
                                top: -1.3vw;
                                right: -1.5vw;
                                width:6vw;
                            }
                            .locking2{
                                // top: -1.15vw;
                            }
                        }
                    }
                }
            }
            .ratio{
                .ratio-wrap{
                    display: flex;
                    justify-content: space-between;
                    margin: 0 16vw;
                    .ratio-left{
                        width: 35vw;
                        height: 26vw;
                        margin-top: 2vw;
                        color:#fff;
                        background-image: url('../../../assets/support/ratio-leftBg.png');
                        background-size: auto 100%;
                        background-repeat: no-repeat;
                        .title{
                            position: relative;
                            height: 8.2vw;
                            img:nth-child(1){
                                position: absolute;
                                top: .4vw;
                                left: 8.4vw;
                                width: 2.6vw;
                            }
                            img:nth-child(2){
                                position: absolute;
                                top: 3.2vw;
                                left: .5vw;
                                width: 7.8vw;
                            }
                            .title-txt{
                                position: absolute;
                                top: 3.8vw;
                                left: 8.6vw;
                                font-size: 1.5vw;
                                // font-family: Aideep;
                                letter-spacing:.1vw;
                            }
                            .title-tips{
                                position: absolute;
                                top: 6vw;
                                left: 12.3vw;
                                color: #7a7a78;
                                font-size: 1vw;
                                transform: scale(.5);
                                img{
                                    position: absolute;
                                    left:7vw;
                                    top:.1vw;
                                    width: 16vw;
                                }
                            }
                            .title-imgRotateY{
                                position: absolute;
                                top: 3.2vw;
                                right: .4vw;
                                width: 7.8vw;
                                transform: rotateY(180deg);
                            }
                        }
                        .pie{
                            height: 16.8vw;
                            position: relative;
                            .pie-main{
                                img:first-child{
                                    z-index: -1;
                                    position: absolute;
                                    top: .8vw;
                                    right: 7.9vw;
                                    width: 10.5vw;
                                }
                                img:last-child{
                                    position: absolute;
                                    top: .1vw;
                                    right: 6.2vw;
                                    width: 6vw;
                                }
                                .percent{
                                    position: absolute;
                                    top: .5vw;
                                    right: 7.3vw;
                                    color: #6655d5;
                                    font-family: EDIX;
                                    font-size: .9vw;
                                }

                            }
                            .pie-rest{
                                z-index: 1;
                                width: 21.4vw;
                                margin: .4vw 0 0 4.8vw;
                            }
                            .total{
                                margin-top: .9vw;
                                margin-left: 4vw;
                                font-size: 1.24vw;
                                font-family: OPPOSans;
                            }
                        }
                        
                    }
                    .ratio-right{
                        width: 29vw;
                        height: 32vw;
                        color:#fff;
                        background-image: url('../../../assets/support/ratio-rightBg.png');
                        background-position: 85% center;
                        background-size: auto 100%;
                        background-repeat: no-repeat;
                        ul{
                            width: 20vw;
                            height: 23vw;
                            margin: 5.4vw 0 5.4vw 7.6vw;
                            background-image: url('../../../assets/support/ratio-stop.png');
                            background-position: 11.7vw 14.2vw;
                            background-size: 28% 29%;
                            background-repeat: no-repeat;
                            li{
                                display: flex;
                                img{
                                    width: 2.5vw;
                                    height: 2.5vw;
                                }
                                a{
                                    margin-top: .6vw;
                                    color: #fff;
                                    font-size: .95vw;
                                    font-family: OPPOSans;
                                    opacity: .8;
                                    text-decoration: none;
                                }
                            }
                        }
                    }
                }
            }
            .category{
                .category-wrap{
                    position: relative;
                    height: 27vw;
                    margin: 0 14vw;
                    .category-info{
                        position: absolute;
                        top: -2vw;
                        width: 100%;
                    }
                    .category-arrow1{
                        position: absolute;
                        top: 9.3vw;
                        left: 28vw;
                        width: 3.6vw;
                    }
                    .category-arrow2{
                        position: absolute;
                        top: 14.8vw;
                        left: 28.6vw;
                        width: 3.2vw;
                    }
                    .category-arrow3{
                        position: absolute;
                        top: 13.9vw;
                        right: 11vw;
                        width: 10vw;
                    }
                }
            }
            .rordmap{
                display: flex;
                justify-content: space-between;
                margin-top:3vw;
                .rordmap-left{
                    width: 47vw;
                    padding-top:20vw;
                    color:#fff;
                    background-image: url('../../../assets/support/rordmap-leftBg.png');
                    background-position: -11.2vw 0vw;
                    background-size: 50% auto;
                    background-repeat: no-repeat;
                    .time1{
                        .time1-date{
                            position: relative;
                            width: 100%;
                            height: 8vw;
                            background-image: url('../../../assets/support/time1-dateBg.png');
                            background-position: 2vw bottom;
                            background-size: 91% auto;
                            background-repeat: no-repeat;
                            .time1-txt{
                                position: relative;
                                img:first-child{
                                    position: absolute;
                                    top: 1.3vw;
                                    right: 7.4vw;
                                    width: 9vw;
                                }
                                img:nth-child(2){
                                    position: absolute;
                                    top: 3.5vw;
                                    right: 8.6vw;
                                    width: 21.6vw;
                                }
                                img:last-child{
                                    position: absolute;
                                    top: 4vw;
                                    right: 5.9vw;
                                    width: 2.4vw;
                                }
                            }
                            .time1-h{
                                position: absolute;
                                top: -.2vw;
                                right: .6vw;
                                width: 5vw;
                                height: 5vw;
                                line-height: 5vw;
                                text-align: center;
                                font-size: 2.8vw;
                                font-family: Aideep;
                                background-image: url('../../../assets/support/time1-circle.png');
                                background-size: 100% auto;
                                background-repeat: no-repeat;
                            }
                        }
                        .time1-content{
                            width: 100%;
                            height: 22vw;
                            background-image: url('../../../assets/support/time1-contentBg.png');
                            background-position: 9vw 5.5vw;
                            background-size: 30% auto;
                            background-repeat: no-repeat;
                            ul{
                                padding: 3.7vw .6vw 0 25.7vw;
                                li{
                                    font-size: 1.3vw;
                                    padding: .67vw;
                                    color: #067966;
                                }
                                .txt1{
                                    color:#fefbc6;
                                }
                                .txt2{
                                }
                                .txt3{
                                }
                                .txt4{
                                    color: #f2ec8a;
                                    background-color: #332e0c;
                                }
                            }
                        }
                    }
                    .time3{
                        position: relative;
                        .time3-bg{
                            position: absolute;
                            top: -.8vw;
                            right: 1vw;
                            width: 34vw;
                        }
                        .time3-date{
                            position: relative;
                            width: 100%;
                            height: 6.2vw;
                            .time3-txt{
                                position: relative;
                                img:first-child{
                                    position: absolute;
                                    top: 1.1vw;
                                    right: 7.8vw;
                                    width: 9vw;
                                }
                                img:nth-child(2){
                                    position: absolute;
                                    top: 3.5vw;
                                    right: 8.6vw;
                                    width: 21.6vw;
                                }
                                img:last-child{
                                    position: absolute;
                                    top: 4vw;
                                    right: 5.9vw;
                                    width: 2.4vw;
                                }
                            }
                            .time3-h{
                                position: absolute;
                                top: -.2vw;
                                right: .6vw;
                                width: 5vw;
                                height: 5vw;
                                line-height: 5vw;
                                text-align: center;
                                font-size: 2.8vw;
                                font-family: Aideep;
                                background-image: url('../../../assets/support/time3-circle.png');
                                background-size: 100% auto;
                                background-repeat: no-repeat;
                            }
                        }
                        .time3-content{
                            width: 100%;
                            height: 18vw;
                            ul{
                                // padding: 2vw 1.1vw 0 25.7vw;
                                padding-left: 16vw;
                                li{
                                    font-size: 1.3vw;
                                    padding: .67vw;
                                    color: #e2489e;
                                }
                            }
                        }
                    }
                    .time4{
                        .time4-date{
                            position: relative;
                            width: 100%;
                            height: 8vw;
                            margin-top: 1vw;
                            .time4-txt{
                                position: relative;
                                img:first-child{
                                    position: absolute;
                                    top: 2.1vw;
                                    right: 7.4vw;
                                    width: 9vw;
                                }
                                img:last-child{
                                    position: absolute;
                                    top: 4.4vw;
                                    right: -2vw;
                                    width: 41vw;
                                }
                            }
                            .time4-h{
                                position: absolute;
                                top: -.2vw;
                                right: .6vw;
                                width: 5vw;
                                height: 5vw;
                                line-height: 5vw;
                                text-align: center;
                                font-size: 2.8vw;
                                font-family: Aideep;
                                background-image: url('../../../assets/support/time4-circle.png');
                                background-size: 100% auto;
                                background-repeat: no-repeat;
                            }
                        }
                        .time4-content{
                            width: 100%;
                            height: 20vw;
                            background-image: url('../../../assets/support/time4-contentBg.png');
                            background-position: 12.1vw 5.5vw;
                            background-size: auto 34%;
                            background-repeat: no-repeat;
                            .wrap{
                                padding-top: 1.6vw;
                                padding-right: 3vw;
                                color:#11FFDF;
                                font-size: 1.4vw;
                                text-align: right;
                                div{
                                    margin-bottom: 1.1vw;
                                }
                            }
                        }
                        .time4-lastImg{
                            margin-left: 7.5vw;
                            width: 37.3vw;
                        }
                    }

                }
                .rordmap-timeLine{
                    position: relative;
                    width: 7vw;
                    .title{
                        position: absolute;
                        top: 9.6vw;
                        left: -11.2vw;
                        color:#fff;
                        font-size: 3vw;
                        font-family: EDIX;
                        white-space: nowrap;
                    }
                    .location{
                        position: absolute;
                        top: 2vw;
                        left: 0;
                        width: 11vw;
                    }
                    .line{
                        position: absolute;
                        top: 11vw;
                        left: 3.4vw;
                        height: 88.4vw;
                    }
                    .arrow{
                        position: absolute;
                        left: .9vw;
                        bottom: 10vw;
                        width: 5.4vw;
                    }
                }
                .rordmap-right{
                    width: 46vw;
                    color:#fff;
                    background-image: url('../../../assets/support/rordmap-rightBg.png');
                    background-position: right 6vw;
                    background-size: 90% auto;
                    background-repeat: no-repeat;
                    .time2{
                        position: relative;
                        height: 36vw;
                        margin-top: 39vw;
                        background-image: url('../../../assets/support/time2-bg.png');
                        background-position: 5.6vw .5vw;
                        background-size: auto 78.4%;
                        background-repeat: no-repeat;
                        .time2-date{
                            .time2-h{
                                position: absolute;
                                top: .65vw;
                                left: -.8vw;
                                width: 5vw;
                                height: 5vw;
                                line-height: 5vw;
                                text-align: center;
                                font-size: 2.8vw;
                                font-family: Aideep;
                                background-image: url('../../../assets/support/time2-circle.png');
                                background-size: 100% auto;
                                background-repeat: no-repeat;
                            }
                            img{
                                position: absolute;
                                top: 2vw;
                                left: 12vw;
                                width: 9vw;
                            }
                        }
                        .time2-content{
                            ul{
                                padding-top: 6.9vw;
                                padding-left: 10.4vw;
                                font-size: 1.35vw;
                                li{
                                    margin-bottom: 1.6vw;
                                    color: #F6F9B5;
                                }
                            }
                        }
                    }
                    .time5{
                        position: relative;
                        height: 36vw;
                        .time5-bg{
                            position: absolute;
                            top: 1.2vw;
                            left: -1.4vw;
                            width: 35.6vw;
                        }
                        .time5-date{
                            .time5-h{
                                position: absolute;
                                top: 3.4vw;
                                left: .2vw;
                                width: 5vw;
                                height: 5vw;
                                line-height: 5vw;
                                text-align: center;
                                font-size: 2.8vw;
                                font-family: Aideep;
                                background-image: url('../../../assets/support/time5-circle.png');
                                background-size: 100% auto;
                                background-repeat: no-repeat;
                            }
                            img{
                                position: absolute;
                                top: 12vw;
                                left: 11.2vw;
                                width: 9vw;
                            }
                        }
                        .time5-content{
                            ul{
                                padding-top: 17vw;
                                padding-left: 12vw;
                                li{
                                    margin-bottom: 1.4vw;
                                    color: #DFE007;
                                    font-size: 1.3vw;
                                    letter-spacing:.1vw;

                                }
                            }
                        }
                    }
                }

            }
            // .supported{
            //     position: relative;
            //     .title{
            //         position: absolute;
            //         top: -2.2vw;
            //         width: 100%;
            //         text-align: center;
            //         color: #fff;
            //         font-size: 3.8vw;
            //         font-family: EDIX;
            //     }
            //     .wrap{
            //         position: absolute;
            //         top: 0;
            //         width: 100%;
            //         margin: 6vw 25vw;
            //         img{
            //             width: 50%;
            //             // opacity: .9;
            //         }
            //     }
            // }
        }
    }
</style>
