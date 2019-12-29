<template>
    <v-card>
        Тут можно настроить сервис распознавания

        checkOldProcessedFrames = False  # если True, обработанные файлы второй раз не попадут в очередь на обработку
    SAVE_COLORMAP = False
    CAR_NUMBER_DETECTOR: bool = bool(os.environ['ENABLE_CAR_DETECTOR'])  # детекировать номер машины(только для камер №1, №2)
    AVAILABLE_OBJECTS = ['car', 'person', 'truck']  # искомые объекты

        Обнаруживаемые объекты:
        <v-list>
             <v-list-item-group >
                 <v-list-item
                     v-for="(item, i) in detectionsList"
                     :key="i">
                     <v-list-item-content>
                         <v-list-item-title v-text="i"> </v-list-item-title>
                     </v-list-item-content>
                     <v-switch :v-model="item"></v-switch>
                 </v-list-item>
             </v-list-item-group>
        </v-list>

        Дебаг функции
<!--        <v-list>-->
<!--            <v-list-group>-->
<!--                sendRequestToServer-->
<!--                      <v-switch-->
<!--                       v-model="switch1"-->

<!--                      ></v-switch>-->
<!--            </v-list-group>-->
<!--            <v-list-group>-->
<!--                        Обработанные файлы второй раз не попадут в очередь на обработку-->

<!--                      <v-switch-->
<!--                       v-model="switch1"-->

<!--                      ></v-switch>-->
<!--            </v-list-group>-->
<!--        </v-list>-->


    </v-card>

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
