<template>
    <div class="main">
        <my-dialog @close="$emit('close')">
            <template v-slot:content>
                <h2>Connexion</h2>
                <form @submit.prevent>
                    <div class="form-group">
                        <input id="email" class="form-control" placeholder="  " v-model="user.email"/>
                        <label for="email">Email</label>
                        <div class="spin"></div>
                    </div>
                    <div class="form-group">
                        <input id="password" class="form-control" type="password" placeholder="  " v-model="user.password"/>
                        <label for="password">Password</label>
                        <div class="spin"></div>
                    </div>
                    <div class="error">{{error}}</div>
                </form>
                <p>Pas encore de compte ? <button @click="$emit('sign')" class="btn tertiary">Sign in</button></p>

            </template>
            <template v-slot:buttons>
                <button @click="login" class="btn primary">Login</button>
            </template>
        </my-dialog>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import MyDialog from "@/components/MyDialog.vue";
    import UserService from "@/tools/services/user.service";

    @Component({
        components: {MyDialog}
    })
    export default class Login extends Vue {
        user = {email: '', password: ''};
        error = '';

        login() {
            UserService.login(this.user)
                .then(u => {
                    this.$store.dispatch('setUser', u);
                    this.$store.commit('setAlertMsg', 'Bon retour parmis nous');
                    this.$emit('close');
                }).catch(e => {
                this.$store.commit('setAlertMsg', e.response.data || `Oups, something is wrong`);
                this.$store.commit('setAlertLvl', 'error');
                this.error = `Erreur d'authentification`;
            });
        }
    }
</script>

<style scoped>
    .error {
        color: #ed2553;
    }
</style>
