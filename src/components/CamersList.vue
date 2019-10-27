<template>
    <v-card class="mx-auto" max-width="300" outlined tile>
        <v-list>
            <v-list-item-group color="primary">
                <v-list-item
                    v-for="i in camersCount"
                    :key="i"
                    @click="itemChangedTo(i)"
                >
                    <v-list-item-content>
                        <v-list-item-title>Камера № {{ i }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: 'CamersList',
        data() {
            return {
                camersCount: 5,
            };
        },
        methods: {
            itemChangedTo(index) {
                this.$emit('click', index)
            }
        }
    }
</script>

<style scoped>
</style>
