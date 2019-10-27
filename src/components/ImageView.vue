<template>
    <v-card class="mx-auto" outlined tile>
        <v-carousel
            v-model="model"
            hide-delimiters
            :show-arrows="false"
            :continuous="false">
            <v-carousel-item
                v-for="(filename) in imagesList"
                :key="filename"
                :reverse-transition="false"
                :transition="false"
            >
                <v-sheet
                    v-show="cameraNotFound"
                    color="red"
                    height="100%">
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                        <div class="display-1"> {{cameraNotFound}}</div>

                    </v-row>
                </v-sheet>
<!--                мб норм что я не указываю условное отображение у изображения, а только у цвета поверх-->
                <v-img
                    :src="getImage(filename)"
                    contain
                    alt="Изображение с камеры" />
            </v-carousel-item>
        </v-carousel>

        <v-slider v-model="slider"
                  :min="0"
                  :max="imagesList.length - 1"
                  @input="sliderController(slider)"
                  ticks> </v-slider>
    </v-card>
</template>

<script>
    const routing = require('../router');

    export default {
        name: 'ImageView',
        props: {
            imagesList: Array,
            cameraNotFound: String
        },
        data() {
            return {
                filename: 'emptyFilename',
                model: 0,
                slider: 0,
            }
        },
        methods: {
            getImage(filename) {
                return `http://localhost:${routing.port}/gallery/${filename}`;
            },
            async sliderController(slider) {
                this.model= this.slider;
                this.filename = this.imagesList[slider];
                this.$emit('nameChanged', this.filename)
            },
        }
    }
</script>

<style scoped>

</style>
