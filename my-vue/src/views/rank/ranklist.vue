<template>
    <div>
        <div class="banner">
            <img :src="img | imgUrl">
        </div>
        <songlist v-bind:list='list' />
    </div>
</template>

<script>
import songlist from '@/components/songlist'
export default {
    data(){
        return{
            list:[],
            img:''
        }
    },
    async created(){
        let {data} = await this.$ajax(`/api/rank/info/${this.$route.params.id}?json=true`);
        this.list = data.songs.list;
        this.img = data.info.imgurl;
    },
    components:{
        songlist
    }
}
</script>

<style scoped>
    .banner{
        width:100%;
        height:5rem;
    }
    .banner img{
        display: block;
        width:100%;
    }
</style>