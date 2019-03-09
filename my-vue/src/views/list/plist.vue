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
        let {data} = await this.$ajax(`/api/plist/list/${this.$route.params.id}?json=true`);
        console.log(data);
        this.list = data.list.list.info;
        this.img = data.info.list.imgurl;
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


