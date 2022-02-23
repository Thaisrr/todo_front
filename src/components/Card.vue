<template>
    <transition name="slide">
        <div class="card p-5">
            <div class="header">
                <h2 :class="textColor">{{td.name}}</h2>
                <button class="icon-btn" @click="show = !show">
                <span class="material-icons">
                    {{ show ? 'expand_less' : 'expand_more' }}
                </span>
                </button>
            </div>
            <transition name="slide">
                <div v-if="show" class="body">
                    <p>{{td.description}}</p>
                    <div>
                        <select aria-label="Status" class="form-control" @change="$emit('change-status', td)" v-model="td.table">
                            <option value="TODO">A faire</option>
                            <option value="DOING">En Cours</option>
                            <option value="DONE">Terminée</option>
                        </select>
                    </div>
                    <p class="btn-container">
                        <button @click.stop="$emit('modify', {...td})" class="btn secondary">Modifier</button>
                        <button @click.stop="deleteTd" class="btn tertiary">Supprimer</button>
                    </p>
                </div>
            </transition>
        </div>
    </transition>

</template>

<script lang="ts">
    import {Prop, Vue} from "vue-property-decorator";
    import Component from "vue-class-component";
    import Todo from "../tools/interfaces/Todo"
    import {Table} from "@/tools/interfaces/Table";
    import axios from "axios";

    @Component({})
    export default class Card extends Vue{
        @Prop()
        td!: Todo;

        @Prop()
        api_url! : String;

        show: boolean = false;


        get textColor(): string  {
            return (this.td.table === Table.TODO)? 'text-danger' :
                (this.td.table === Table.DONE)? 'text-success' : 'text-primary'
        }

        deleteTd = ():void => {
            axios.delete(this.api_url + String(this.td.id))
                .then( () => { this.$emit('deleted', this.td.id) })
        }

    }
</script>

<style scoped>

    .card {
        width: 100%;
        margin: 0 auto 30px ;
        border-left: var(--main-color) solid 2px;
        transition: all 0.5s ease-in-out;
        background-color: var(--light-color);
        box-shadow: 1px 1px 8px var(--shadow-color);
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .header, .body {
        width: 90%;
        margin: auto;
    }

    .body {
        /*transition: all 0.4s ease-in-out;*/
      padding-bottom: 10px;

    }





</style>
