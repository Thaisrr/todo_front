<template>
    <div class="main">
        <my-dialog @close="$emit('close')">
            <template v-slot:content>
                <h2>Sign In</h2>
                <form @submit.prevent>
                    <div class="form-group">
                        <input id="email" class="form-control" placeholder="  " v-model="user.email"/>
                        <label for="email">Email</label>
                        <div class="spin"></div>
                    </div>
                    <div class="form-group">
                        <input :invalid="user.password === valid_password" id="password" class="form-control" type="password" placeholder="  " v-model="user.password"/>
                        <label for="password">Password</label>
                        <div class="spin"></div>
                        <div class="check">
                            <p :class="user.password.match(/[A-Z]/)? 'checked' : 'not-checked'" >
                                <span class="animated">
                                    <span class="a1"></span>
                                    <span class="a2"></span>
                                </span>
                                <span>Au moins une majuscule</span>
                            </p>
                            <p :class="user.password.match(/[a-z]/)? 'checked' : 'not-checked'" >
                                <span class="animated">
                                    <span class="a1"></span>
                                    <span class="a2"></span>
                                </span>
                                <span>Au moins une minuscule</span>
                            </p>
                            <p :class="user.password.match(/[0-9]/)? 'checked' : 'not-checked'" >
                                <span class="animated">
                                    <span class="a1"></span>
                                    <span class="a2"></span>
                                </span>
                                <span>Au moins un chiffre</span>
                            </p>
                            <p :class="user.password.length >= 8? 'checked' : 'not-checked'" >
                                <span class="animated">
                                    <span class="a1"></span>
                                    <span class="a2"></span>
                                </span>
                                <span>Au moins 8 caractères</span>
                            </p>
                        </div>
                    </div>
                    <div class="form-group">
                        <input id="valid_password" class="form-control" type="password" placeholder="  " v-model="valid_password"/>
                        <label for="valid_password">Password</label>
                        <div class="spin"></div>
                    </div>
                </form>
                <p>Déjà un compte ? <button @click="$emit('log')" class="btn tertiary">Login</button></p>
            </template>
            <template v-slot:buttons>
                <button :disabled="!user.password || !user.email" @click="login" class="btn primary">Login</button>
            </template>
        </my-dialog>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import MyDialog from "@/components/MyDialog.vue";
    import UserService from "../tools/services/user.service";

    @Component({
        components: {MyDialog}
    })
    export default class SignIn extends Vue {
        user = {email: '', password: ''};
        valid_password = '';

        login() {
            UserService.signin(this.user)
                .then(u => {
                    console.warn(u);
                    this.$store.commit('setAlertMsg', 'Bienvenue, vous pouvez désormais vous connecter ! !')
                    this.$emit('registered')
                })
                .catch(e => {
                    this.$store.commit('setAlertMsg', `Erreur d'authenfication`);
                    this.$store.commit('setAlertLvl', 'error');
                    console.error(e)
                });
        }
    }
</script>

<style scoped>
    .checked {color: #42b983}
    .not-checked {color: #2c3e50}

    .animated {
        position: relative;
        top: -0.3em;
    }

    .check {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .a1, .a2 {
        display: inline-block;
        width: 1.2em;
        height: 1px;
        background-color: #2c3e50;
        transform: rotate(45deg);
        transition: all 500ms linear;
    }

    .a2 {
        transform: translateX(-1.2em) rotate(315deg);
        margin-right: -5px;
    }

    .checked .a1{
        transform: translateX(-0.2em) rotate(45deg);
        width: 0.6em;
        background-color: #42b983;
    }

    .checked .a2 {
        transform: translateX(-0.5em) translateY(-0.2em) rotate(315deg);
        background-color: #42b983;
    }
</style>
