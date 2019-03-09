<template>
    <div class="rank-box">
        <mt-cell 
            v-for="item in rankList"
            :key="item.id"
            is-link
            class="rank-item"
            @click.native="goList(item)"
        >
            <img 
                slot="icon" 
                :src="item.imgurl | imgUrl" 
            >
            <span>{{item.rankname}}</span>
        </mt-cell>
    </div>
</template>
<script>
export default {
    data(){
        return{
            rankList:[]
        }
    },
    created(){
        this.$ajax('/api/rank/list/?json=true').then(({data})=>{
            this.rankList = data.rank.list;
        })
    },
    methods:{
        goList(item){
            this.$router.push({
                name:'ranklist',
                params:{
                    id:item.rankid
                }
            });
            this.$store.commit('changeTit',item.rankname);
        }
    }
}
</script>
<style scoped>
    .rank-box .rank-item{
        height:3rem;
        display: flex;
        position: relative;
    }
    .rank-item img{
        display: inline-block;
        width:2.5rem;
    }
    .rank-item span{
        display: inline-block;
        position: absolute;
        left:40%;
        font-size: .4rem;
    }
</style>