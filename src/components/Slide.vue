<template>

    <v-flex md12>
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="2">
                <CamersList @click="changeActiveCameraTo($event)"></CamersList>
            </v-col>
            <v-col cols="10" md="6">
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
                            <v-img :src="getImage(filename)" contain alt="Изображение с камеры" />
                        </v-carousel-item>
                    </v-carousel>

                    <v-slider v-model="slider"
                              :min="0"
                              :max="imagesList.length - 1"
                              @input="sliderController(slider)"
                              ticks> </v-slider>
                </v-card>
            </v-col>
            <v-col cols="10" md="3">
                <ImageInfo :info="this.info" />
            </v-col>
        </v-row>


    </v-flex>
</template>

<script>
    const routing = require('../router');
    import CamersList from '@/components/CamersList';
    import ImageInfo from "@/components/ImageInfo";

    export default {
        name: 'Slide',
        data() {
            return {
                imagesList: [],  // длина этого списка = длина слайдера
                model: 0,
                slider: 0,
                camersCount: 5,
                filename: 'emptyFilename',
                info: {}
             };
        },
        components: {
            CamersList, ImageInfo
        },
        methods: {
            async getInfoFromImage(filename) {
                // console.log("имя", filename)
                const url = `http://localhost:${routing.port}/gallery/${filename}/info`;
                this.info = await routing.fetchTo(url);
            },
            async changeActiveCameraTo(cameraId) {
                const url = `http://localhost:${routing.port}/gallery/camera/${cameraId}`;
                const json = await routing.fetchTo(url);
                this.imagesList = json; // список изображений тут
                this.filename = json[0];
                await this.getInfoFromImage(this.filename)
            },
            getImage(filename) {
                return `http://localhost:${routing.port}/gallery/${filename}`;
            },
            async sliderController(slider) {
                this.model= this.slider;
                this.filename = this.imagesList[slider];
                this.getInfoFromImage(this.filename)
            },
        },
        mounted() {
            this.changeActiveCameraTo(1);
        },
    };
</script>

<style scoped>

</style>
