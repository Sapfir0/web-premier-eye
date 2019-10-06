<template>
  <div class="team">
    <h1>Ping</h1>
  <h1> 
    {{ json.then( (img) => {  }) }}
  </h1>
  <h2> {{images}} </h2>
    <v-img v-bind:src="images" contain height="100%" />
          
             
          
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
data() {
  async function pingRouter() {
    const localhost = "http://localhost:5000/gallery"
    const response = await fetch(localhost);
    const json = await response.json()

    return json
  }
  return {
    json: pingRouter(),
    images: "http://localhost:5000/gallery/s.png",
  }

}

});
</script>


