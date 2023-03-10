<script >
import Cards from './Cards.vue';
import store from '../store'
import axios from 'axios'

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
        },
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

        },
        // fetchTrending() {
        //     axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=07957f00f230f554787ba82062ad2b4f').then(res => {
        //         console.log(res.data.results)
        //         const { results } = res.data
        //         this.store.trending = results
        //     }).catch(() => {
        //         this.store.trending = []
        //     })
        // },
    },
    mounted() {
        //this.fetchTrending()
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
    padding: 40px 20px;
    color: white;

    .container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>