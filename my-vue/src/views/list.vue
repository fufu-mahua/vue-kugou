<template>
    <div class="plist">
        <mt-cell 
            v-for = "item in list"
            :key = item.specialid
            is-link
            @click.native = "goPlist(item)"
            class="list-item"
        >
            <img 
                slot = "icon" 
                :src = "item.imgurl | imgUrl"
            >
            <p>{{item.specialname}}</p>
            <span>{{item.playcount}}</span>
        </mt-cell>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.$ajax('/api/plist/index/?json=true').then(({data})=>{
            this.list = data.plist.list.info;
        });
    },
    methods:{
        goPlist(item){
            this.$router.push({
                name:'plist',
                params:{
                    id:item.specialid
                }
            });
            this.$store.commit('changeTit',item.specialname);
        }
    }
}
</script>
<style scoped>
    .plist .list-item{
        height:3rem;
        display: flex;
        position: relative;
    }
    .plist img{
        display: inline-block;
        width:2.5rem;
    }
    .list-item p{
        display: inline-block;
        position: absolute;
        top:30%;
        left:40%;
        font-size: .35rem;
        width:40%;
    }
    .list-item span{
        display: inline-block;
        position: absolute;
        bottom:25%;
        font-size: .3rem;
        left:40%;
        width:40%;
    }
</style>
