<template>
    <div class="main">
        <div class="title">
            <h1>TODO</h1>
            <button @click="setToModify" class="btn primary">Add</button>
        </div>

        <div>
            <p v-if="is_loading" class="alert alert-warning">Chargement en cours....</p>

            <main class="grid" v-else-if="todos && todos.length > 1">
                <div @dragover.prevent @drop.prevent="dropping($event)"
                     class="tables" v-for="tab of tables" :key="tab" :data-table="tab">

                    <h2>{{tab}}</h2>
                    <div class="card-container">
                      <Card
                              @deleted="remove"
                              draggable="true"
                              @dragstart.native.stop="dragStart(td, $event)"
                              @modify="setToModify"
                              @change-status="update"
                              @dragover.prevent
                              @drop.prevent.self
                              :api_url="api_url"
                              v-for="td of filterTodos(tab)"
                              :key="td.id"
                              :td="td"
                              :id="td.id"

                      />
                    </div>
                </div>

            </main>
            <p v-else class="alert alert-danger">Aucune tâche n'a été trouvée</p>
        </div>

                <FormTodo v-if="show_dialog" @close="show_dialog = false"
                        @creation="create"
                        @modified="update"
                          :td="to_modify"
                        :api_url="api_url"
                />

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Card from "../components/Card.vue";
    import FormTodo from "../components/FormTodo.vue";
    import Todo$ from "../tools/interfaces/Todo";
    import {Table, TableIterator, getTable} from "@/tools/interfaces/Table";
    import TodoService from "@/tools/services/todo.service";

    @Component({
        components: {FormTodo, Card},
    })
    export default class Todo extends Vue {
        api_url = 'http://localhost:3000/todo/';
        is_loading = false;
        show_dialog = false;
        todos: Todo$[] = [];
        to_modify: Todo$ = {name : '', description: '', table : Table.TODO};

        mounted() {
          this.getTodos();
        }

        async getTodos() {
          this.todos = await TodoService.getAll();
        }

        create() {
          this.show_dialog = false;
          this.$store.commit('setAlertMsg', 'Tâche ajoutée');
          this.$store.commit('setAlertLvl', 'success');
          this.getTodos();

        }

        remove(id: number) {
            const index = this.todos.findIndex(t => t.id === id);
            this.todos.splice(index, 1);
        }

        filterTodos(t: string) {
            return this.todos.filter( task => task.table === t);
        }

        dragStart(which : any, e: any) {
            e.dataTransfer.setData('task_table', e.target.parentElement.dataset.table);
            e.dataTransfer.setData('task_obj', JSON.stringify(which));
            e.dataTransfer.setData('task_id', e.target.id);
            e.dataTransfer.dropEffect = "move";
        }

        dropping(e: any) {
            try {
                const div = document.getElementById(e.dataTransfer.getData('task_id'));
                const t: Todo$ = JSON.parse(e.dataTransfer.getData('task_obj')) as Todo$;
                e.target.appendChild(div);
                let table;
                if(div && div.parentElement) {
                    table = div.parentElement.dataset.table;
                    e.target.removeChild(div);
                }

                if(table ) {
                    t.table = getTable(table);
                    this.update(t);
                }
                e.dataTransfer.clearData();
            } catch (e) {
                console.error(e);
            }
        }

        get tables() {
            return TableIterator();
        }
        update (td : Todo$) {
            TodoService.update({...td})
                .then( () => {
                    const index = this.todos.findIndex( (t) => t.id === td.id);
                    this.todos[index] = {...td};
                    this.setToModify();
                    this.show_dialog = false;
                    this.getTodos();
                });
        }

        setToModify (td? : Todo$)  {
            this.to_modify = (td && td.id)? td : {name : '', description: '', table : Table.TODO};
            this.show_dialog = td !== undefined;
        }
    }
</script>

<style scoped>

    .card-container {
   /*     width: 95%;
        border-left: solid var(--text-color) 2px; */
    }

    .tables h2 {
        font-size: 2em;
        color: var(--text-color);
        padding-right: 15px;
       /* width: 90%;
        margin: 30px auto;*/
    }

</style>
