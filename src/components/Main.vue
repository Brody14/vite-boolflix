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
    computed: {
        mergedResults() {
            return [...this.store.movies, ...this.store.series]
        }
    },
    methods: {
        setLanguageFlag(result) {
            let flag = '';
            switch (result.original_language) {
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
                    flag = ''
            }
            return flag

        }
    }
}
</script>

<template>
    <main class="main-content">
        <div class="container">
            <Cards v-for="result in mergedResults" key="result.id" :result="result" :flag="setLanguageFlag(result)" />
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