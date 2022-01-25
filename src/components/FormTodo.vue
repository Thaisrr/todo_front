<template>
    <div>
        <MyDialog @close="$emit('close')">
            <template v-slot:content>
                <h2 v-if="!modifying">Ajouter une tâche</h2>
                <h2 v-else>Modifier la tâche</h2>
                <form>
                    <div class="form-group">
                        <input id="name" class="form-control" placeholder="  " v-model="td.name"/>
                        <label for="name">Nom</label>
                        <div class="spin"></div>
                    </div>
                    <div class="form-group">
                        <textarea id="desc" class="form-control" placeholder="  " v-model="td.description"></textarea>
                        <label for="desc">Description</label>
                        <div class="spin"></div>

                    </div>
                </form>
                <p v-if="error" class="alert alert-danger">{{error}}</p>
            </template>
            <template v-slot:buttons>
                <button @click="create" class="btn primary">
                    {{ (modifying)? 'Modifier'  : 'Ajouter' }}
                </button>
            </template>
        </MyDialog>
    </div>
</template>

<script lang="ts">
    import Todo from "@/tools/interfaces/Todo";
    import {Prop, Vue, Component} from "vue-property-decorator";
    import {Table} from "@/tools/interfaces/Table";
    import MyDialog from "@/components/MyDialog.vue";
    import TodoService from "@/services/todo.service"

    @Component({
        components: {MyDialog}})
    export default class FormTodo extends Vue{

        error : string = '';

        @Prop({
            default: () => ( {name: '', description: '', table: Table.TODO})
        }) td!: Todo;



        get modifying(): boolean {
            return !!this.td && !!this.td.id ;
        }

        create()  {
            if(this.td.name && this.td.description) {
                this.error = '';
               if(!this.modifying) {
                   TodoService.create(this.td)
                       .then(() => this.$emit('creation'))
               } else { this.$emit('modified', this.td) }
            } else {
                console.warn("error");
                this.error = "Veuillez remplir tous les champs du formulaire";
            }
        }

    }
</script>

<style scoped>
h2 {
    font-size: 2.3em;
    text-align: center;
}
</style>
