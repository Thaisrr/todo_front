<template>
    <div class="card p-5">
        <h2 :class="textColor">{{td.name}}</h2>
        <p>{{td.description}}</p>
        <div>
            <select class="form-control" @change="$emit('change-status', td)" v-model="td.table">
                <option value="TODO">A faire</option>
                <option value="DOING">En Cours</option>
                <option value="DONE">Terminée</option>
            </select>
        </div>
        <p class="card-footer">
            <button @click.stop="deleteTd" class="btn btn-outline-danger">Supprimer</button>
            <button @click.stop="$emit('modify', {...td})" class="btn btn-info">Modifier</button>
        </p>

    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Card",
        data : () => ({}),
        props: {
            td: Object,
            api_url : String
        },
        computed: {
            textColor: function () {
                return (this.td.table === 'TODO')? 'text-danger' :
                    (this.td.table === 'DONE')? 'text-success' : 'text-primary'
            }
        },
        methods: {
            deleteTd: function () {
                axios.delete(this.api_url + this.td.id)
                    .then( () => { this.$emit('deleted') })

               /* fetch(this.api_url + this.td.id, {
                    method: 'DELETE'
                }).then( () => {this.$emit('deleted')})
                */
            }
        }
    }
</script>

<style scoped>

</style>
