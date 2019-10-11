<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >

    <v-container>
      <v-layout row>
        <v-flex md6>
          <CamersList />
        </v-flex>

        <Slide/>

      </v-layout>
    </v-container>


    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CamersList from '../components/CamersList.vue';
import Slide from '../components/Slide.vue';

export default Vue.extend({

  components: {
    Slide,
    CamersList,
  },
});
</script>
