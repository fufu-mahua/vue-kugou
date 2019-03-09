<template>
<!-- //当前歌曲列表 
    //你点击的歌曲是哪首
-->
    <div>
        <div class="play-bottom" ref="playbox" style="bottom:-3rem;">
            <div class="play-left" @click="showPlayBox">
                <img :src="songInfo.imgUrl | imgUrl" alt="" srcset="">
                <p>
                <span>{{songInfo.songName}}</span>
                <span>{{songInfo.singerName}}</span>
                </p>
            </div>
            <div class="play-right">
                <div class="iconfont  icon-prev prev-song"
                ></div>
                <div
                class="iconfont play-song" 
                :class="{'icon-bofang':!isPlay,'icon-zanting':isPlay}"
                @touchstart="playorpause"
                ></div>
                <div class="iconfont  icon-next next-song"
                @touchstart="next"
                ></div>      
            </div>
        </div>
        <audio ref="audio" preload :src="songInfo.url" ></audio>
        <play-box 
        @backTop="hidePlayBox" 
        :top="playBoxTop"
        :songInfo='songInfo'
        :isplay="isPlay"
        @changePlay="playorpause"
        @next="next"
        :currentTime="currentTime"
        :duration="duration"
        @dragTime="changePlayTime"
        :lyric="ric"
        ></play-box>
    </div>
</template>
<script>
import playBox from '@/components/playbottom/playbox'
export default {
    data(){
        return {
            hash:this.$store.state.activeHash,
            list:this.$store.state.list,
            songInfo:{},
            isPlay:false,
            audio:'',
            songIndex:0,
            playBoxTop:'100rem',
            currentTime:0,
            duration:0,
            ric:''
        }
    },
    mounted(){
        //监控播放位置发生变化
       this.$refs.audio.addEventListener('timeupdate',()=>{
         this.currentTime=this.audio.currentTime;
       })
    },
    computed:{
    },
    watch:{
        '$store.state.list':{
            handler:function(data){
               this.list=data;
            }
        },
        '$store.state.activeHash':{
            handler:function(data){
               this.hash=data;
               this.getSong();
            }
        },
    },
    components:{
        playBox
    },
    methods:{
        changePlayTime(t){
            //设置播放时间
           this.audio.currentTime = t;
           //开启播放
        //    this.audio.play();
        //    this.isPlay=true;
        },
        showPlayBox(){
            this.playBoxTop='0';
        },
        hidePlayBox(val){
            this.playBoxTop=val;
        },
        next(){
            //获取下一首歌的hash
            this.songIndex++;
            if(this.songIndex==this.list.length){
                this.songIndex=0;
            }
            this.$store.commit('updateHash',this.list[this.songIndex].hash);
        },
        getSong(){
         this.$ajax({
                url:'/api/app/i/getSongInfo.php',
                params:{
                    cmd:'playInfo',
                    hash:this.hash
                }
            }).then(({data})=>{
                
                //显示播放器
                this.$refs.playbox.style.bottom=0;

                //歌曲总时长 info.time
                //毫秒-> 分钟
                //毫秒/1000 = 秒
                //秒/60 =分
                //秒%60 =剩余秒
                //分:秒
               this.songInfo=data;
               
                //切换播放状态
                this.isPlay=true;
                this.audio=this.$refs.audio;

                //资源预加载
                this.$refs.audio.addEventListener('loadeddata',()=>{
                    this.$refs.audio.play();

                     //获取音频总时间
                    this.duration=this.$refs.audio.duration;
                })

                //当播放完毕时 自动播放下一曲
                this.audio.addEventListener('ended',()=>{
                    //console.log('结束了');
                    this.next();
                });

                //获取当前歌曲的下标值
                //歌曲 列表  this.list
                //当前歌曲的hash值  this.hash
                this.songIndex= this.list.findIndex((e)=>{return e.hash==this.hash});

                //获取歌词
               //http://m.kugou.com/app/i/krc.php?cmd=100&hash=7A4B2B9F2F2C31205534574B3356BE76&timelength=1
                this.$ajax({
                    url:'/api/app/i/krc.php',
                    params:{
                        cmd:100,
                        hash:this.hash,
                        timelength:1
                    }
                }).then(({data})=>{
                   // console.log('歌词数据',data);
                   this.ric=data;
                });

            })
            .catch((err)=>{
                console.log(err);
            })
        },
        playorpause(){
           this.isPlay=!this.isPlay;
           if(this.isPlay){
               this.audio.play();
           }else{
               //暂停
               this.audio.pause();
           }
        }
    }

}
</script>
<style scoped>
    #app .play-bottom {
  width: 100%;
  height: 1.5rem;
  background-color:rgba(5, 5, 5, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: hidden;
  transition: .3s;
  z-index: 9;
}
.play-left {
  width: 55%;
  height: 100%;
  float: left;
  overflow: hidden;
  position:relative;
  box-sizing: border-box;
  display: flex;
}
.play-left img {
  width: 1.5rem;
  float: left;
}
.play-left p {
  margin: auto 0;
  width: 60%;
  color: #fff;
  float: left;
  font-size: .35rem;
  margin-left: .1rem;
}
.play-left p span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.play-left p span:nth-child(2){
  font-size: .3rem;
}
.play-right {
  position:relative;
  float: left;
  width: 40%;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .1rem;
  height: 100%;
}
.play-right > div {
  font-size: .7rem;
  color: #fff;
}

.play-right > div:active{
  color: #e5e5e5;
}
</style>



