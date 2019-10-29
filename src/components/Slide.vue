<template>

    <v-flex md12>
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="2">
                <CamersList @click="changeActiveCameraTo($event)"></CamersList>
            </v-col>
            <v-col cols="10" md="6">
                <ImageView
                    :images-list="imagesList"
                    :camera-not-found="cameraNotFound"
                    @nameChanged="getInfoImage($event)"
                />
            </v-col>
            <v-col cols="10" md="3">
                <ImageInfo :info="info" />
            </v-col>
        </v-row>
    </v-flex>

</template>

<script>
    const cfg = require('../config');
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
                filename: 'foo',
                cameraNotFound: ''
             };
        },
        components: {
            ImageView, CamersList, ImageInfo
        },
        methods: {
            async getInfoImage(filename) {
                this.filename = filename;
                const url = `${cfg.server}/gallery/${filename}/info`;
                this.info = await routing.fetchTo(url);
            },
            async changeActiveCameraTo(cameraId) {
                const url = `${cfg.server}/gallery/camera/${cameraId}`;

                let json = '';
                try {
                    json = await routing.fetchTo(url);
                } catch (err) {
                    this.cameraNotFound = 'Камера не найдена'; // какая-то неправильная обработка ошибок, мне не нравится
                    return;
                }
                this.cameraNotFound = '';

                this.imagesList = json; // список изображений тут
                this.filename = json[0];

                await this.getInfoImage(this.filename)
            },

        },
        created() {
            this.changeActiveCameraTo(1);
        },
    };
</script>

<style scoped>

</style>
