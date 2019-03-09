
<template>
    <mt-navbar v-model="selected" class="nav">
      <mt-tab-item 
      v-for="item in navBar"
      :key="item.name"
      :id="item.name"
      @click.native="gotoPage(item.name)"
      >
      <span class="tab-item">{{item.title}}</span>
      </mt-tab-item>
    </mt-navbar>
</template>

<script>
import {navBar} from '@/router/nav'
export default {
  data(){
    return {
      navBar:navBar,
      selected:''
    }
  },
  watch:{
    '$route':{
      handler(){
          this.selected = this.$route.name;
      },
      immediate:true
    }
  },
  methods:{
    gotoPage(n){
      this.$router.push({name:n});
    }
  }
}
</script>

<style scoped>
  .nav{
    margin-bottom:.070rem;
  }
  .nav .tab-item {
    font-size:.35rem;
  }
</style>
