<script >
import Cards from './Cards.vue';
import store from '../store'

export default {
    components: {
        Cards,
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <main class="main-content">
        <div class="container">
            <Cards v-for="movie in store.movies" key="movie.id" :movie="movie" />
        </div>

    </main>
</template>

<style lang="scss" scoped >
@use '../style/partials/variables' as *;

.main-content {
    background-color: $main-bg;
    padding: 20px;
}

.container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
</style>