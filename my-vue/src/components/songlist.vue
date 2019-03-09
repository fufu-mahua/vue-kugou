
<template>
    <div class="sl">
        <mt-cell 
            class="songlist"
            v-for="item in list" 
            :key="item.audio_id"
            
            @click.native="toPlay(item.hash)"
        >
            <p>{{item.filename | substring6}}</p>
            <span 
            class="iconfont icon-download"
            @click.stop="download"
            ></span>
        </mt-cell>
    </div>
</template>

<script>
// import { MessageBox } from 'mint-ui';
export default {
    props:{
        list:{
            type:Array
        }
    },
    data(){
        return {
            hash:'',
        }
    },
    methods:{
        toPlay(hash1){
            //写入当前播放列表
            this.$store.commit('changeList',this.list);
            //给store写入hash值
            this.$store.commit('updateHash',hash1);
        }
    }
}
</script>

<style scoped>
    .sl{
        padding-bottom:1.52rem;
    }
    .songlist{
        height:1.5rem;
        display: flex;
        position: relative;
    }
    .songlist p{
        font-size:.35rem;
        position: absolute;
        left:.3rem;
    }
</style>


