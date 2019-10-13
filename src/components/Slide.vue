<template>

  <v-flex md12>

      <v-row no-gutters>
        <v-col cols="12" sm="6" md="4">
     <v-card
      class="mx-auto"
      max-width="300"
      outlined
      tile
    >
      <v-list>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
             v-for="i in camersCount"
            :key="i"
             @click="pingRouter(i)"
          >
            <v-list-item-content>
              <v-list-item-title>Камера № {{ i }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
        </v-col>
        <v-col cols="10" md="6">
          <v-card class="mx-auto" outlined tile>

      <v-carousel
        v-model="model"
        hide-delimiters
        :show-arrows="false"
        :continuous="false">
          <v-carousel-item
            v-for="(filename) in camers"
            :key="filename"
            :reverse-transition="false"
            :transition="false"
          >
              <v-img :src="getImage(filename)" contain alt="Изображение с камеры">
              </v-img>

          </v-carousel-item>
      </v-carousel>

      <v-slider v-model="slider"
      :min="0"
      :max="imagesInCamerN-1"
      @input="model=slider"
      ticks> </v-slider>
      </v-card>
        </v-col>
      </v-row>


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
      return true;
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
