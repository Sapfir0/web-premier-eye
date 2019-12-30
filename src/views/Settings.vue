<template>
    <v-container>
        <v-layout
            text-center
            wrap
        >

            <v-container>
                <v-layout row>
                    <v-card>
                        Тут можно настроить сервис распознавания

                        <v-switch label="SAVE_COLORMAP"/>
                        <v-switch label="CAR_NUMBER_DETECTOR"/>

                        <v-list>
                            <v-list-group color="primary" value="false">
                                <template v-slot:activator>
                                    <v-list-item-title>Опознавание объектов</v-list-item-title>
                                </template>
                                <template v-for="(item, i) in this.detectionsList">
                                    <v-list-item :key="i">
                                        <v-switch :input-value="item" :label="i"/>
                                    </v-list-item>
                                </template>

                            </v-list-group>
                        </v-list>


                    </v-card>


                </v-layout>
            </v-container>


        </v-layout>
    </v-container>

</template>

<script>
    const cfg = require('../config');
    const routing = require('../router');

    export default {
        name: 'Settings',
        data() {
            return {
                detectionsList: {'лох': true}
            };
        },
        methods: {
            async detect() {
                this.detectionList = await routing.fetchTo(cfg.server + '/detectionList')
                console.log(this.detectionList)
            }
        },

        created() {
            this.detect();
        }

    }

</script>


<style scoped>

</style>
