import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTitle:'',
    activeHash:'',
    list:[]
  },
  mutations: {
    changeTitle(state,val){
      state.activeTitle = val;
    },
    updateHash(state,val){
      state.activeHash= val;
    },
    changeList(state,arr){
      state.list=arr;
    }
  },
  actions: {}
});
