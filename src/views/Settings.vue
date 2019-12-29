<template>
    <v-card>
        Тут можно настроить сервис распознавания

        checkOldProcessedFrames = False  # если True, обработанные файлы второй раз не попадут в очередь на обработку
    SAVE_COLORMAP = False
    CAR_NUMBER_DETECTOR: bool = bool(os.environ['ENABLE_CAR_DETECTOR'])  # детекировать номер машины(только для камер №1, №2)
    AVAILABLE_OBJECTS = ['car', 'person', 'truck']  # искомые объекты
    Обнаруживаемые объекты:
        <v-list>

        </v-list>

        Дебаг функции
        <v-list>
            <v-list-group>
                sendRequestToServer
                      <v-switch
                       v-model="switch1"

                      ></v-switch>
            </v-list-group>
            <v-list-group>
                        Обработанные файлы второй раз не попадут в очередь на обработку

                      <v-switch
                       v-model="switch1"

                      ></v-switch>
            </v-list-group>
        </v-list>


        <v-switch
       v-model="switch1"

      ></v-switch>
    </v-card>

</template>

<script>
    export default {
        name: "Settings"
    }
</script>

<style scoped>

</style>
