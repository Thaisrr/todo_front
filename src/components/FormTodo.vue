<template>
    <div>
        <h2 v-if="!modifying">Ajouter une tâche</h2>
        <h2 v-else>Modifier la tâche</h2>
        <form @submit.prevent="create">
            <div class="form-group">
                <label for="name">Nom</label>
                <input id="name" class="form-control" v-model="td.name"/>
            </div>
            <div class="form-group">
                <label for="desc">Description</label>
                <textarea id="desc" class="form-control" v-model="td.description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                {{ (modifying)? 'Modifier'  : 'Ajouter' }}
            </button>
        </form>
        <p v-if="error" class="alert alert-danger">{{error}}</p>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "FormTodo",
        data: () => ({
            error : ''
        }),
        props: {
            api_url: String,
            modifying: Boolean,
            td: {
                type: Object,
                default: () => ({name : '', description: '', table : 'TODO'})
            }
        },
        methods: {
            create: function () {
               if(this.td.name && this.td.description) {
                   this.error = '';

                   const headers = new Headers();
                   headers.append('Content-Types', 'application/json');
                  /* fetch(this.api_url, {
                       method: 'POST',
                       body: JSON.stringify(this.td),
                       headers : headers
                   }).then(res => res.json())
                       .then(json => {
                           console.warn(json); // JSON de réponse
                           this.$emit('creation');
                       });
                    */

                  if(!this.modifying) {
                      // Pour utiliser axios, il faut l'installer : npm i axios
                      // Ne pas oublier de l'importer dans les composants qui en ont besoin
                      axios.post(this.api_url, this.td, {
                          headers: headers
                      }).then(res => {
                          console.warn(res.data); // JSON de réponse
                          this.$emit('creation');
                      })
                  } else {
                        this.$emit('modified', this.td);
                  }
               } else {
                   this.error = "Veuillez remplir tous les champs du formulaire";
               }
            }
        }
    }
</script>

<style scoped>

</style>
