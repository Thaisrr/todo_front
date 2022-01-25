<template>
    <div :class="type + ' ' +  is_global" class="center absolute">
        <div role="dialog" class="dialog">
            <div class="icon center">
                <slot name="icon">
                    <span class="material-icons">create</span>
                </slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
                <div class="buttons btn-container">
                    <slot name="buttons"></slot>
                    <button class="btn btn secondary" @click="$emit('close')">Annuler</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Prop, Vue, Component} from "vue-property-decorator";

    @Component
    export default class MyDialog extends Vue{

        @Prop({
            default: 'info'
        }) type?: string;
        @Prop({
            default: ''
        }) is_global?: string;

    }
</script>

<style>
    .error {
        --main-color: red;
        --light-color: white;
    }

    .info {
       --main-color: #ed2553 ;
        --light-color: white;
    }

    .warning {
        --main-color: #c65d41;
        --light-color: white;
    }

    .success {
        --main-color: #42b983;
        --light-color: white
    }

    .content {
        width: 80%;
        margin: 30px auto;
    }
    .dialog {
        background-color: white;
        box-shadow: 2px 2px 8px grey;
        border-radius: 0 0 10px 10px;
        border-top: 7px solid var(--main-color);
        width: 90%;
    }

    .global.absolute {
        left: 0;
    }

    .icon {
        background-color: var(--main-color);
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        transform: translateY(-50%);
        margin: auto;
    }

    .icon span {
        color: var(--light-color);
    }

    .buttons .btn.primary {
        color: var(--light-color);
        background-color: var(--main-color);
        border-color: var(--main-color);
    }

    .buttons .btn.secondary {
        background-color: var(--light-color);
        color: var(--main-color);
        border-color: var(--main-color);
    }

    @media screen and (min-width: 500px) {
        .dialog {width: 65%}
    }
    @media screen and (min-width: 900px) {
        .dialog {width: 40%}
    }

</style>
