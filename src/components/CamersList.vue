<template>
        <v-list camers > <!--style="width:30%;" -->
    <v-list-item v-for="i in camersCount" @click="" >
        <v-list-item-content>
        <v-list-item-title >Камера № {{ i }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
data() {
  return {
    camersCount: 5, 
  }
}
});
</script>
