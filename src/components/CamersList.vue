<template>
    <v-card class="mx-auto" max-width="300" outlined tile >
        <v-list>
            <v-list-item-group color="primary" >
                <v-list-item
                    v-for="i in camersCount"
                    :key="i"
                    @click="itemChangedTo(i)"
                >
                    <v-list-item-icon><v-icon>mdi-filmstrip</v-icon></v-list-item-icon>
                    <v-list-item-title>Камера № {{ i }}</v-list-item-title>

                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    const cfg = require('../config');

    export default {
        name: 'CamersList',
        data() {
            return {
                camersCount: cfg.camersCount,
            };
        },
        methods: {
            itemChangedTo(index) {
                this.$emit('click', index)
            },
        }
    }
</script>

<style scoped>
</style>
