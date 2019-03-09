<template>
    <div id="main">
        <div class="search-box " :class="{'showLen':isShow}">
            <div class="search-block">
                <!-- <i class="search-icon"></i> -->
                <input ref="val" type="text" placeholder="歌手/歌名/拼音" />
            </div>
            <button @touchstart="search">搜索</button>
            <div class="len">共有{{list.length}}条歌曲</div>
        </div>
        
        <div class="hot" v-if="isShow">
            <div class="tit">最近热门</div>
            <ul v-for="item in hosList" :key="item" class="hot-list">
                <li @touchstart="searchWords(item)">{{item}}</li>
            </ul>
        </div>
        <!-- <div v-show="isShow" class="len">共1条结果</div> -->
        <song-list :list="list" v-else ></song-list>
    </div>
</template>

<script>
import songList from '@/components/songlist';
export default {
    data(){
        return {
            list:[],
            hosList:['独家首发','精彩综艺','由你音乐榜','儿歌大全','慕寒入驻古风区','洗脑电音','ACG'],
            isShow:true
        }
    },
    methods:{
        search(){
            let val = this.$refs.val.value;
            this.$ajax({
                url:'/search',
                params:{
                    format:"jsonp",
                    keyword:val,
                    page:1,
                    pagesize:30,
                    showtype:1
                }
            }).then(({data})=>{
              console.log(data);
                this.list = data.data.info;
                this.isShow = false;
                
            });
        },
        searchWords(item){
             this.$ajax({
                url:'/search',
                params:{
                    format:"jsonp",
                    keyword:item,
                    page:1,
                    pagesize:30,
                    showtype:1
                }
            }).then(({data})=>{
                this.list = data.data.info;
                this.$refs.val.value = item;
                this.isShow = false;
            });
        }
    },
    components:{
        songList
    }
}
</script>

<style scoped>
    ul{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .mint-header .searchbox{
      padding:0;
    }
    #main .search-box{
        /* margin-top: 2rem; */
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.3rem;
        background: #fbfbfb;
        position: relative;
        margin-bottom: .5rem;
    }
    #main .search-box.showLen{
        margin-bottom: 0;
        margin-top:0;
    }
    #main .search-box.showLen .len{
        display: none;
    }
    #main .search-box .len{
        height: .5rem;
        background: #e6e6e6;
        text-align: left;
        font-size: .25rem;
        text-indent: .4rem;
        line-height: .5rem;
        width: 100%;
        position: absolute;
        bottom: -0.5rem;
    }
    #main .search-box .search-block{
        border: 1px solid red;
        width: 5rem;
        height: .7rem;
        border: 1px solid #e5e5e5;
        border-radius: .1rem;
        position: relative;
        background: #fff;
    }
    #main .search-box .search-block i{
        display: inline-block;
        position: absolute;
        left: .1rem;
        top: .05rem;
        width: .5rem;
        height: .6rem;
        background-size: cover;
    }
    #main .search-box .search-block input{
        outline: none;
        border: none;
        position: absolute;
        top: .1rem;
        font-size: .3rem;
        left: .7rem;
        width: 4.3rem;
        height: .5rem;
    }
    #main .search-box button{
        width: 1.2rem;
        height: .7rem;
        margin-left: .2rem;
        background: #e5e5e5;
        font-size: .35rem;
        outline:none;
        color: #959595;
        border: none;
        border-radius: .1rem;
    }
    #main .search-box button:active{
        background: #2ba2fa;
        color: #fff;
    }
    #main .hot{
        font-size: .4rem;
        color: #333;
        text-align: left;
    }
    #main .hot .tit{
        color: #2ca3f5;
        border-bottom: 1px solid #ccc;
        font-size: .3rem;
        line-height: 1rem;
        padding-left: .3rem;
    }
    #main .hot .hot-list{
        margin-left: .2rem;
    }
    #main .hot .hot-list li{
        line-height: 1.2rem;
        border-bottom: 1px solid #ccc;
    }
</style>
