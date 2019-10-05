<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >


    <v-list camers>
      <v-list-item v-for="i in camersCount" @click="">
          <v-list-item-content>
            <v-list-item-title>Камера №{{ i }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>

  

      <v-flex xs12>
        <h1 class="display-2 font-weight-bold mb-3">
          Блок видео
        </h1>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
data() {
  return {
    camersCount: 5,
  }
}
});
</script>
