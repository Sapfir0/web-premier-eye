<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >


    <v-container>
      <v-layout row>
        
        <v-flex md6>
          
           <v-list camers > <!--style="width:30%;" -->
            <v-list-item v-for="i in camersCount" @click="" >
              <v-list-item-content>
                <v-list-item-title >Камера № {{ i }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex md6>
          <v-flex xs12>
            <v-img src='http://localhost:5000/gallery/s.png' contain height="100%" />
            </v-flex>
              <v-slider v-model="value" :step="imagesCount" ticks></v-slider>
        </v-flex>
      </v-layout> 
    </v-container>


 

    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
data() {
  return {
    camersCount: 5, 
    imagesCount: 25, 
  }
}
});
</script>
