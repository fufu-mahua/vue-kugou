<template>
    <div class="m-main" :style="{'top':top}">
        <mt-header class="hide-player" :title="songInfo.songName">
            <div slot="left">
                <mt-button icon="back" @click="backTop"></mt-button>  
            </div>
        </mt-header>
        <div class="bg-overlay"></div>
        <div class="play-overlay"></div>
        <lyric :lyric="lyric" :currentT="currentTime" />
        <control
            :isPlay="isplay"
            @changePlay="()=>{$emit('changePlay')}"
            @next="()=>{$emit('next')}"
            :currentTime="currentTime"
            :songInfo="songInfo"
            :duration="duration"
            @dragTime="(t)=>{$emit('dragTime',t)}"
         />
    </div>
</template>
<script>
import control  from '@/components/playbottom/control'
import lyric from '@/components/playbottom/lyric'




export default {
    props:{
        top:{
            type:String,
            default:'0'
        },
        songInfo:{
            type:Object,
        },
        isplay:{
            type:Boolean,
        },
        currentTime:{
            type:Number
        },
        duration:{
            type:Number
        },
        lyric:{
            type:String
        }
    },
    components:{
        control,
        lyric
    },
    methods:{
        backTop(){
            this.$emit('backTop','100rem');
        }
    }
}
</script>
<style scoped>
.clear:after {
	display: block;
	content: "";
	clear: both;
}

.m-main {
  width: 100%;
	height: 100%;
	position: fixed;
  left: 0;
  top: 100rem;
	box-sizing: border-box;
	color: #fff;
	background: rgba(0,0,0,.6);
	z-index: 10;
	transition: .5s;
}
.bg-overlay {
	background: url(https://y.gtimg.cn/music/photo_new/T002R300x300M000003lFlWa0CwNbA.jpg?max_age=2592000) no-repeat;
	background-size: cover;
	filter: blur(10px);
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.play-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
}


#app .hide-player {
  background: rgba(255,255,255,0);
  color: #fff;
  z-index: 999;
  height: 1rem;
  font-size:.5rem;;
}
</style>
