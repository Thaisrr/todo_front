<template>
    <div :class="level" v-show="message && message !== ''" aria-live="polite" role="alert" class="alert-container">
        <p class="alert">
            <span class="material-icons">{{icon}}</span>
            <span>{{message}}</span>
        </p>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class MyAlert extends Vue {

        get message() {
            return this.$store.getters.alert_msg;
        }

        get level() {
            return this.$store.getters.alert_lvl || 'info';
        }

        get icon() {
            switch (this.level) {
                case 'success': return 'check_circle';
                case 'alert' || 'error' : return 'warning';
                case 'warn' || 'warning' : return 'info';
                default: return 'lightbulb';
            }
        }
    }
</script>

<style scoped>
    .info {
        --main-color: #0E9594;
        --bg-color: rgba(14, 149, 148, 0.20);
        --light-color: white;
    }

    .error {
        --main-color: #ed2553 ;
        --bg-color: rgba(237, 37, 83, 0.20);
        --light-color: white;
    }

    .warning, .warn {
        --main-color: #c65d41;
        --bg-color: rgba(198, 93, 65, 0.20);
        --light-color: white;
    }

    .success {
        --main-color: #42b983;
        --bg-color: #73ebb2;
        --light-color: white;

    }

    .alert-container {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 30px;
        z-index: 3;
    }

    .alert {
        width: 40%;
        min-width: 300px;
        margin: auto;
        padding: 15px 20px;
        background-color: var(--main-color);
        border: solid 2px var(--main-color);
        color: var(--light-color);
        border-radius: 5px;
        display: flex;
        align-items: center;
    }

    .material-icons {
        margin-right: 20px;
    }

</style>
