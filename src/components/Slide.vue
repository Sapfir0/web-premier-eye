<template>

  <v-flex md6>
    <v-list camers > <!--style="width:30%;" -->
         <v-list-item v-for="i in camersCount"  >
                  <v-list-item-content @click="foo(i)">
                  <v-list-item-title >Камера № {{ i }}</v-list-item-title>
                  </v-list-item-content>
         </v-list-item>
     </v-list>
    <v-flex xs12>
      <v-carousel
        v-model="model"
        hide-delimiters
        :show-arrows="false"
        :continuous="false"
        style="width:100%">
        <v-carousel-item
          v-for="(camer) in camers"
          :key="camer"
          :src="getImage(camer)"
          alt="Изображение с камеры"
          style="width:100%;height:100%;"
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
        camersCount: 5,
    };
  },
  methods: {
      foo(i) {
          // изменить режим отображения у слайдшоу
          console.log(i)
      },
    async pingRouter() {
      const localhost = 'http://localhost:8050/gallery';
      const response = await fetch(localhost);
      const json = await response.json();
      this.camers = json;
      this.imagesInCamerN = json.length;
    },
    async checkChanges() {
      return 0;
    },
    getImage(camer) {
      return `http://localhost:8050/gallery/${camer}`;
    },
  },
  mounted() {
    this.pingRouter();
  },
};
</script>

<style scoped>

</style>
