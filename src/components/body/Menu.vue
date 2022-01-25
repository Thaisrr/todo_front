<template>
    <div id="menu">
        <nav>
            <ul>
                <li>
                    <router-link class="home" aria-label="Accueil" title="Accueil" :to="{name: 'home'}">
                        <span aria-hidden="true" class="material-icons">home</span>
                        <span class="pin"></span>
                    </router-link>
                </li>
                <li>
                    <router-link class="link" aria-label="Tableau" title="Tableau" :to="{name: 'todo'}">
                        <span aria-hidden="true" class="material-icons">view_kanban</span>
                        <span class="pin"></span>
                    </router-link>
                </li>
                <li>
                    <button class="link btn" aria-label="Login" title="Login" @click="$emit('open')">
                        <span aria-hidden="true" class="material-icons">login</span>
                        <span class="pin"></span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Menu extends Vue {

    }
</script>

<style scoped>
    #menu {
        position: sticky;
        top: 0;
        height: 100vh;
        width: 100px;
        padding-right: 30px;
        background-color: var(--main-color);
        z-index: 1;
        display: flex;
        align-items: start;
        justify-content: center;
        padding-top: 35px;
    }

    nav, ul, li, a, .link, .btn.link {width: 100%}

    #menu nav ul {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 20px;
        list-style: none;
        padding: 0;
    }

    li a, .link, .btn.link {
        font-size: 3em;
        display: block;
        color: var(--light-color);
        text-align: center;
        background-color: transparent;
        border: none;
        padding: 0;
    }

    li a:link, li a:visited {
        color: var(--light-color);
    }

    li {
        transition: 300ms linear;
    }

    li:hover {
        background-color: var(--shadow-color);
    }

    .pin {
        height: 5px;
        display: block;
        width: 5px;
        background-color: transparent;
        margin: auto;
        border-radius: 50%;
        transform: translateY(-10px);
        transition: 300ms linear;
    }

    .link.router-link-active .pin, .home.router-link-exact-active .pin, .link.tertiary {
        background-color: var(--light-color);
    }


</style>
