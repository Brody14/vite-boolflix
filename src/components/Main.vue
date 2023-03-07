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
    },
    methods: {
        setLanguageFlag(movie) {
            let flag = '';
            switch (movie.original_language) {
                case 'it':
                    flag = '/img/it.png'
                    break
                case 'en':
                    flag = 'img/gb.png'
                    break
                case 'es':
                    flag = 'img/es.png'
                    break
                case 'fr':
                    flag = 'img/fr.png'
                    break
                default:
                    flag = 'img/place.png'
            }
            return flag

        }
    }
}
</script>

<template>
    <main class="main-content">
        <div class="container">
            <Cards v-for="movie in store.movies" key="movie.id" :movie="movie" :flag="setLanguageFlag(movie)" />
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