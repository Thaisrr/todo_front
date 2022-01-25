<template>
    <div class="main">
        <div class="title">
            <h1>Home</h1>
            <div class="btn-container">
                <button @click="show_login = true" class="btn secondary">Login</button>
                <button @click="show_sign = true" class="btn tertiary">Sign In</button>
            </div>
        </div>
        <p>Time to do stuff !</p>

        <Login @close="show_login = false" @sign="change('log')" v-show="show_login"></Login>
        <SignIn @close="show_sign = false" @log="change('sign')" v-show="show_sign"></SignIn>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import Login from "@/components/Login.vue";
    import SignIn from "@/components/SignIn.vue";
    @Component({
        components: {SignIn, Login}
    })
    export default class Home extends Vue{
        show_login = false;
        show_sign = false;

        change(dialog: string) {
            this.show_login = dialog === 'sign';
            this.show_sign = dialog === 'log';
        }

    }
</script>

<style scoped>

    .btn-container {
        margin-top: 0;
    }
</style>
