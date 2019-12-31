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

                        <detections-list />

                    </v-card>


                </v-layout>
            </v-container>


        </v-layout>
    </v-container>

</template>

<script lang="ts">
import Vue from 'vue';
import DetectionsList  from '../components/DetectionsList.vue';

export default Vue.extend({

  components: {
    DetectionsList,
  },
});
</script>



<style scoped>

</style>
