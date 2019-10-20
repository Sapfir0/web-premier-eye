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
                        <v-list-item-group color="primary">
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
                <v-card class="mx-auto"
                        outlined
                        tile
                >
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
    const routing = require('../router')

    export default {
        name: 'Slide',
        data() {
            return {
                imagesList: [],
                model: 0,
                slider: 0,
                imagesInCamerN: 1,
                camersCount: 5,
            };
        },
        methods: {
            async pingRouter(camerId) {
                const json = await routing.pingRouter(camerId);
                this.imagesList = json;
                this.imagesInCamerN = json.length;
            },
            getImage(filename) {
                console.log("Loading image ", filename) ;
                return `http://localhost:${routing.port}/gallery/${filename}`;

            },
        },
        mounted() {
            this.pingRouter(1);
        },
    };
</script>

<style scoped>

</style>
