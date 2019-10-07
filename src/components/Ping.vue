<template>
  <div class="team">
    <h1>Ping</h1>
  <h2>2 {{images}} </h2>
    <v-img v-bind:src="images" contain height="100%" />
                 
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
data() {
  return {
    images: "http://localhost:5000/gallery/image11.jpg",
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


