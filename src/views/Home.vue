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


      <v-carousel v-model="model" :show-arrows="false" :hide-delimiters="true" :continuous="false" >
        <v-carousel-item
          v-for="(color, i) in colors"
          :key="color"
          :reverse-transition="false"  
          :transition="false"
        >
        <!-- два последних свойста тестовые -->
          <v-sheet
            :color="color"
            height="100%"
            tile
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div class="display-3">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
            </v-flex>
            <v-slider v-model="slider" :min="0" :max="imagesInCamerN-1" @input="model=slider" ticks></v-slider>
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
    colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
      model: 0,
      slider: 5,
    imagesInCamerN: 5, 
  }
},
  components: {
    CamersList,
  },
});
</script>
