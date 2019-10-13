<template>

  <v-flex md6>
    <v-list camers > <!--style="width:30%;" -->
         <v-list-item v-for="i in camersCount"  >
                  <v-list-item-content @click="pingRouter(i)">
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
          v-for="(filename) in camers"
          :key="filename"
          :src="getImage(filename)"
          alt="Изображение с камеры"
          style="width:100%;height:100%;"
          :reverse-transition="false"
          :transition="false"
        >
<!--          <v-sheet-->
<!--            v-if="foo()"-->
<!--          color="red"-->
<!--          height="100%"-->
<!--          tile-->
<!--        >-->
<!--          <v-row-->
<!--            class="fill-height"-->
<!--            align="center"-->
<!--            justify="center"-->
<!--          >-->
<!--            <div class="display-3">Камера недоступна</div>-->
<!--          </v-row>-->
<!--        </v-sheet>-->
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
    // async checkCamer(camerId) {
    //   const localhost = `http://localhost:8050/gallery/camera/${camerId}`;
    //   try {
    //     const response = await fetch(localhost);
    //     const { status } = response;
    //     console.log("я вывелся", status);
    //     if (status === 404) {
    //       const { statusText } = response;
    //       return false;
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    async pingRouter(camerId) {
      const localhost = `http://localhost:8050/gallery/camera/${camerId}`;
      const response = await fetch(localhost);
      const { status } = response;
      if (status === 404) {
        const { statusText } = response;
        console.log(statusText);
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
