<template>

    <v-list>
        <v-btn @click="detectConsole()"> </v-btn>

        <v-list-group color="primary" value="false">
            <template v-slot:activator>
                <v-list-item-title>Опознавание объектов</v-list-item-title>
            </template>
            <template v-for="(item, i) in this.detectionsList" v-show="isLoaded">
                <v-list-item :key="i">
                    <v-switch :input-value="item" :label="i"/>
                </v-list-item>
            </template>

        </v-list-group>
    </v-list>
</template>

<script>
    const cfg = require('../config');
    const routing = require('../router');

    export default {
        name: "DetectionsList",
        data() {
            return {
                detectionsList: {'fg': true},
                isLoaded: false
            };
        },
        methods: {
            async detect() {
                this.detectionList = await routing.fetchTo(cfg.server + '/detectionList');
                this.isLoaded = true;
                console.log(this.isLoaded)
                return this.detectionList;
            },
            async detectConsole() {
                console.log(this.detectionList)
            }
        },
        async created() {
            this.detect();
        }
    }
</script>

<style scoped>

</style>
