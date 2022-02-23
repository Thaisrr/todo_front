<template>
  <div class="main">
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import tableService from "@/tools/services/table.service";

@Component
export default class Table extends Vue {

  mounted() {
    tableService.getAll().then(res => console.log(res))
  }
}
</script>

<style scoped>

</style>
