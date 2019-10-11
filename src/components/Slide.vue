<template>
  <v-flex md6>
    <v-flex xs12>

      <v-carousel v-model="model" :show-arrows="false" :hide-delimiters="true" :continuous="false" >
        <v-carousel-item
          v-for="(camer) in camers"
          :key="camer"
          :src="`http://localhost:8050/gallery/${camer}`"
          :reverse-transition="false"
          :transition="false"
        >
        </v-carousel-item>
      </v-carousel>
            </v-flex>
                <v-slider v-model="slider"
                :min="0"
                :max="imagesInCamerN-1"
                @input="model=slider"
                ticks> </v-slider>

            </v-flex>
</template>

<script>
export default {
  name: 'Slide',
  data() {
    return {
      camers: [],
      model: 0,
      slider: 0,
      imagesInCamerN: 1,
    };
  },
  methods: {
    async pingRouter() {
      const localhost = 'http://localhost:8050/gallery';
      const response = await fetch(localhost);
      const json = await response.json();
      this.camers = json;
      this.imagesInCamerN = json.length;
    },
  },
  mounted() {
    this.pingRouter();
  },
};
</script>

<style scoped>

</style>
