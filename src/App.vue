<template>
  <div id="app">
    <Menu @open="show_login = true" id="menu"/>
    <div id="router">
      <router-view></router-view>
    </div>
    <Login @close="show_login = false" @sign="change('log')" v-show="show_login"></Login>
    <SignIn @close="show_sign = false" @log="change('sign')" v-show="show_sign"></SignIn>
    <MyAlert/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
import Menu from "@/components/body/Menu.vue";
import Login from "@/components/Login.vue";
import SignIn from "@/components/SignIn.vue";
import MyAlert from "@/components/MyAlert.vue";
  import axios from "axios";

@Component({
  components: {
    MyAlert,
    SignIn,
    Login,
    Menu
  }
})
export default class App extends Vue {
    show_login = false;
    show_sign = false;

    constructor() {
      super();
      const user = localStorage.getItem('user');
      if(user) {
        this.$store.dispatch('setUser', JSON.parse(user));
      }
      this.testApi();
    }

    async testApi() {
      const {data} = await axios.get('http://localhost:3000')
      console.log(data);
    }

  change(dialog: string) {
      this.show_login = dialog === 'sign';
      this.show_sign = dialog === 'log';
    }



}
</script>

<style src="./style/global.css"></style>
<style src="./style/components.css"></style>
<style scoped>
  #app {
    display: grid;
    grid-template-columns: 100px calc( 100vw - 70px);
  }

  #router {
    transform: translateX(-30px);
    border-top-left-radius: 30px;
    z-index: 2;
    background-color: whitesmoke;
  }

</style>
