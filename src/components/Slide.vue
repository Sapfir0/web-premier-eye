<template>

    <v-flex md12>
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="2">
                <v-card class="mx-auto" max-width="300" outlined tile>
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
                              :max="imagesInCamerN-1"
                              @input="getInfoFromImage(filename)"
                              ticks> </v-slider>
                </v-card>
            </v-col>
            <v-col cols="10" md="3">
                <v-card class="mx-auto" outlined tile>
                    <v-list>
                        <v-subheader>{{ this.info.filename}}</v-subheader>
                        <v-list-item>{{this.info.fixationDatetime}} </v-list-item>
                        <v-list-item>Снято с камеры №{{this.info.numberOfCam}} </v-list-item>
                        <v-list-item v-if="!this.info.objects">Объектов нет</v-list-item>

                        <v-list-group v-for="obj in this.info.objects" color="primary" value="false">
                            <template v-slot:activator >
                                <v-list-item-icon v-show="obj.typeOfObject === 'car' "><v-icon>mdi-car</v-icon></v-list-item-icon>
                                <v-list-item-icon v-show="obj.typeOfObject === 'person' "><v-icon>mdi-account</v-icon></v-list-item-icon>

                                <v-list-item-title>{{obj.typeOfObject}}</v-list-item-title>
                            </template>

                            <v-list-item>
                                <v-list-item-title>Степень уверенности: {{obj.scores.toFixed(2)}}</v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                    </v-list>
                </v-card>
            </v-col>
        </v-row>


    </v-flex>
</template>

<script>
    const routing = require('../router');

    export default {
        name: 'Slide',
        data() {
            return {
                imagesList: [],
                model: 0,
                slider: 0,
                imagesInCamerN: 1,
                camersCount: 5,
                filename: 'emptyFilename',
                info: {},
            };
        },
        methods: {
            async getInfoFromImage() {
                this.model= this.slider;
                this.info = await this.getInfoAboutImage(this.filename);
                console.log(this.info)
            },
            async pingRouter(camerId) {
                const url = `http://localhost:${routing.port}/gallery/camera/${camerId}`;
                const json = await routing.fetchTo(url);
                this.imagesList = json;
                this.imagesInCamerN = json.length;
                this.filename = json[0];
                this.getInfoFromImage()
            },
            getImage(filename) {
                this.filename = filename;
                return `http://localhost:${routing.port}/gallery/${filename}`;
            },
            async getInfoAboutImage(filename) {
                const url = `http://localhost:${routing.port}/gallery/${this.filename}/info`;
                return routing.fetchTo(url)
            },
        },
        mounted() {
            this.pingRouter(1);
        },
    };
</script>

<style scoped>

</style>
