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
                              @input="getInfoFromImage(filename)"
                              ticks> </v-slider>
                </v-card>
            </v-col>
            <v-card class="mx-auto"
                    outlined
                    tile
            >

                <v-list>
                    <v-list-item>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-group prepend-icon="account_circle" value="true">
                        <template v-slot:activator>
                            <v-list-item-title>Users</v-list-item-title>
                        </template>

                        <v-list-group
                            no-action
                            sub-group
                            value="true"
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Admin</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item
                                v-for="(admin, i) in admins"
                                :key="i"
                                link
                            >
                                <v-list-item-title v-text="admin[0]"></v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon v-text="admin[1]"></v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-group>

                    </v-list-group>
                </v-list>
            </v-card>
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
                admins: [
                    ['Management', 'people_outline'],
                    ['Settings', 'settings'],
                ],
                cruds: [
                    ['Create', 'add'],
                    ['Read', 'insert_drive_file'],
                    ['Update', 'update'],
                    ['Delete', 'delete'],
                ],

            };
        },
        methods: {
            async getInfoFromImage() {
                this.model= this.slider;
                this.info = await this.getInfoAboutImage(this.filename)
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
