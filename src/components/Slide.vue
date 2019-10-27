<template>

    <v-flex md12>
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="2">
                <CamersList @click="changeActiveCameraTo($event)"></CamersList>
            </v-col>
            <v-col cols="10" md="6">
                <ImageView :images-list="imagesList" @nameChanged="imageViewController($event)" />
            </v-col>
            <v-col cols="10" md="3">
                <ImageInfo :info="info" />
            </v-col>
        </v-row>


    </v-flex>
</template>

<script>
    const routing = require('../router');
    import CamersList from '@/components/CamersList';
    import ImageInfo from '@/components/ImageInfo';
    import ImageView from '@/components/ImageView';

    export default {
        name: 'Slide',
        data() {
            return {
                info: {},
                imagesList: [], // длина этого списка = длина слайдера
                filename: 'foo'
             };
        },
        components: {
            ImageView, CamersList, ImageInfo
        },
        methods: {
            imageViewController(filename) {
                this.filename = filename
                this.getInfoFromImage(filename)
            },
            async getInfoFromImage(filename) {
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

        },
        mounted() {
            this.changeActiveCameraTo(1);
        },
    };
</script>

<style scoped>

</style>
