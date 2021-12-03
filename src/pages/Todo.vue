<template>
    <div class="w-75 mx-auto">
        <h1>TODO</h1>

        <FormTodo class="w-75 mx-auto mb-5" @creation="getTodos" @modified="update" :modifying="to_modify !== undefined" :td="to_modify" :api_url="api_url"/>

        <div class="text-left">
            <p v-if="is_loading" class="alert alert-warning">Chargement en cours....</p>
            <div class="row row-cols-3" v-else-if="todos && todos.length > 1">
                <Card
                        @deleted="getTodos"
                        @modify="setToModify"
                        @change-status="update"
                        :api_url="api_url"
                        v-for="td of todos"
                        :key="td.id"
                        :td="td"
                />
            </div>
            <p v-else class="alert alert-danger">Aucune tâche n'a été trouvée</p>
        </div>

    </div>
</template>

<script>
    import Card from "../components/Card";
    import FormTodo from "../components/FormTodo";
    import axios from "axios";
    export default {
        name: "Todo",
        components: {FormTodo, Card},
        data: () => ({
            api_url : 'http://localhost:3000/todo/',
            todos: [],
            is_loading : false,
            to_modify: undefined
        }),
        methods: {
            getTodos: async function () {
                this.is_loading = true;
                try {
                    const res = await fetch(this.api_url);
                    this.todos = await res.json();
                } catch (e) {
                    console.warn(e);
                } finally {
                    this.is_loading = false;
                }
            },
            setToModify: function(td) {
                this.to_modify = (td)? td : undefined;
            },
            update: function (td) {
                axios.put(this.api_url + td.id, td)
                    .then( res => {
                        console.warn(res.data);
                        this.getTodos();
                        this.setToModify();
                    } )
            }
        },
        mounted: function () {
            this.getTodos();
        }
    }
</script>

<style scoped>

</style>
