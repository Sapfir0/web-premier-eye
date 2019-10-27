<template>
    <v-card class="mx-auto" outlined tile>
        <v-list>
            <v-subheader>{{ this.info.filename}}</v-subheader>
            <v-list-item>{{this.info.fixationDatetime}} </v-list-item>
            <v-list-item>Снято с камеры №{{this.info.numberOfCam}} </v-list-item>
            <v-list-item v-if="!this.info.objects">Объектов нет</v-list-item>

            <v-list-group :key="obj" v-for="obj in this.info.objects" color="primary" value="false">
                <template v-slot:activator >
                    <v-list-item-icon v-show="obj.typeOfObject === 'car' "><v-icon>mdi-car</v-icon></v-list-item-icon>
                    <v-list-item-icon v-show="obj.typeOfObject === 'person' "><v-icon>mdi-account</v-icon></v-list-item-icon>

                    <v-list-item-title>{{obj.typeOfObject}}</v-list-item-title>
                </template>

                <v-list-item>
                    <v-list-item-title>Степень уверенности: {{obj.scores.toFixed(3)}}</v-list-item-title>
                </v-list-item>
            </v-list-group>

        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "ImageInfo",
        props: {
            info: Object
        }
    }
</script>

<style scoped>

</style>
