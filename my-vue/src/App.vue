
<template>
  <div id="app">
    <mt-header>
      <router-link to="/" slot="left" class="logo_downBtn">
        <img class="logo" src="./assets/images/logo.png" />
        <span class="downBtn">下载酷狗</span>
      </router-link>
      <mt-button 
        icon="search" 
        slot="right" 
        @touchstart.native="goSearch"
        class="search"
      >
      </mt-button>
    </mt-header>
    <router-view name="navbar" />
    <router-view />
    <player></player>
  </div>
</template>

<script>
import player from '@/components/playbottom';
export default {
  methods:{
    goSearch(){
      this.$router.push({
        name:'search'
      });
      this.$store.commit('changeTitle','搜索');
    }
  },
  components:{
    player
  }
}
</script>
<style>
  *{ margin: 0; padding: 0;}
  a{ text-decoration: none;}
  .logo{
    width: 2rem;
    vertical-align:middle;
  }
  .downBtn{
    vertical-align:middle;
    width: 1.5rem;
    height: 0.5rem;
    margin-left:.3000rem;
    border: 1px solid #fff;
    border-radius:.1rem;
    text-align: center;
    color: #fff;
    padding: 0.1rem;
    font-size: 0.3rem;
  }
  .search{
    font-size:.5rem;
    font-weight:bold;
  }
</style>
