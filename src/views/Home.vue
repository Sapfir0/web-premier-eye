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
        <v-flex md6>
          <v-flex xs12>
            <v-img src='http://localhost:5000/gallery/s.png' contain height="100%" />
            </v-flex>
              <v-slider :step="count" ticks></v-slider>
        </v-flex>
      </v-layout> 
    </v-container>
 

    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CamersList from '../components/CamersList.vue'

export default Vue.extend({
data() {
  return {
    count: 5, // 5%
  }
},
  components: {
    CamersList,
  },
});
</script>
