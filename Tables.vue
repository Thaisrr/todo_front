<template>
  <div class="main">

  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import tableService from "./src/tools/services/table.service";

@Component
export default class Tables extends Vue {

  mounted() {
    tableService.getAll().then(res => console.log(res));
  }

}
</script>

<style scoped>

</style>
