<template>
    <div class="newsongbox">
        <mt-swipe 
            :auto="3000" 
            class="swiperbox"
        >
            <mt-swipe-item>
                <img src="http://m.kugou.com/v3/static/images/index/banner.jpg" >
            </mt-swipe-item>
            <mt-swipe-item 
                v-for="item in imgArr" 
                :key="item.id"
            >
                <img 
                    :src="item.imgurl" 
                >
            </mt-swipe-item>
        </mt-swipe>
         <!-- <audio fixed ref="audio" :src="url" controls autoplay></audio> -->
        <song-list :list="list" ></song-list>
    </div>
</template>

<script>
import songList from '@/components/songlist.vue'
export default {
    data(){
        return {
            list:[],
            imgArr:[]
        }
    },
    created(){
        this.$ajax('/api?json=true').then(({data})=>{
            this.list=data.data;
            this.imgArr=data.banner;
        });
    },
    methods:{
        download(){
            console.log(MessageBox);
            MessageBox.confirm('确定执行此操作?').then(action => {alert(123);
            }).catch(()=>{});
        }
    },
    components:{
        songList
    }
}
</script>

<style lang="less" scoped>
    .newsongbox .swiperbox{ height: 3rem;}
    .swiperbox img{ height: 100%;}
</style>