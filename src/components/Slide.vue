<template>

  <v-flex>

      <v-list camers flat>
           <v-list-item v-for="i in camersCount"  >
                    <v-list-item-content @click="pingRouter(i)">
                    <v-list-item-title >Камера № {{ i }}</v-list-item-title>
                    </v-list-item-content>
           </v-list-item>
       </v-list>

      <v-carousel
        v-model="model"
        hide-delimiters
        :show-arrows="false"
        :continuous="false">
          <v-carousel-item
            v-for="(filename) in camers"
            :key="filename"
            :src="getImage(filename)"
            alt="Изображение с камеры"
            :reverse-transition="false"
            :transition="false"
          >
          </v-carousel-item>
      </v-carousel>

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
      camersCount: 5,
    };
  },
  methods: {
    async pingRouter(camerId) {
      const localhost = `http://localhost:8050/gallery/camera/${camerId}`;
      const response = await fetch(localhost);
      const { status } = response;
      if (status === 404) {
        const { statusText } = response;
        console.log('Статус', statusText);
        return false;
      }
      const json = await response.json();
      this.camers = json;
      this.imagesInCamerN = json.length;
    },
    async checkChanges() {
      return 0;
    },
    getImage(filename) {
      return `http://localhost:8050/gallery/${filename}`;
    },
  },
  mounted() {
    this.pingRouter(1);
  },
};
</script>

<style scoped>

</style>
