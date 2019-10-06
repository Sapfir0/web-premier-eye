<template>
  <div class="team">
    <h1>Ping</h1>
  <h1>1 {{ json }} </h1>
  <h2>2 {{images}} </h2>
    <v-img v-bind:src="images" contain height="100%" />
          
     
          
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
async data() {
    const localhost = "http://localhost:5000/gallery"
    const response = await fetch(localhost);
    const { json } = await response.json()
  return {
    images: "http://localhost:5000/gallery/s.png",
  }
},
methods: {
  pingRouter: async function() {
    const localhost = "http://localhost:5000/gallery"
    const response = await fetch(localhost);
    const json = await response.json()
    return json
  }
}

});
</script>


