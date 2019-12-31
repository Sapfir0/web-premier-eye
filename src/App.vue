<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn href="/" class="font-weight-light" outlined>Premier-eye </v-btn>
      </v-toolbar-title>
        <v-spacer />
        <v-btn class="ma-2" href="/settings" outlined>
          <v-icon dark>mdi-wrench</v-icon>
        </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

      <v-footer>
          <v-spacer />
          <v-btn text href="https://github.com/Sapfir0/premier-eye" target="_blank" color="primary">
              <span class="mr-2">Source</span>
        <v-icon>open_in_new</v-icon> </v-btn></v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
});
</script>
