<script >
import Cards from './Cards.vue';
import store from '../store'
import axios from 'axios'
import CardCarousel from './CardCarousel.vue'
import Hero from './Hero.vue';

export default {
    components: {
        Cards,
        CardCarousel,
        Hero
    },
    data() {
        return {
            store,
            currentSlide: 0,
            currentIndex: 0,
            autoPlay: null,
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
        fetchData() {
            this.fetchTrending()
            this.fetchTopRated()
        },
        fetchTrending() {
            axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT').then(res => {
                //console.log(res.data.results)
                const { results } = res.data
                this.store.trending = results
            }).catch(() => {
                this.store.trending = []
            })
        },
        fetchTopRated() {
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT').then(res => {
                //console.log(res.data.results)
                const { results } = res.data
                this.store.topRated = results
            }).catch(() => {
                this.store.topRated = []
            })
        },
        change() {
            const lastIndex = this.store.trending.length - 1
            if (this.currentIndex < lastIndex) {
                this.currentIndex++
            } else {
                this.currentIndex = 0
            }
        },
        previousSlide() {
            const carouselEl = document.querySelector('.carousel-trending')
            const cardWidth = document.querySelector('.card-img').scrollWidth
            let size = this.currentSlide * -cardWidth + 'px'

            if (this.currentSlide >= 0) {
                this.currentSlide--
                carouselEl.style.transform = `translateX(${size})`
            }

        },
        previousSlideRated() {
            const carouselEl = document.querySelector('.carousel-top_rated')
            const cardWidth = document.querySelector('.card-img').scrollWidth
            let size = this.currentSlide * -cardWidth + 'px'

            console.log(this.currentSlide, size, cardWidth)
            if (this.currentSlide >= 0) {
                this.currentSlide--
                carouselEl.style.transform = `translateX(${size})`
            }

        },
        nextSlide() {
            const lastSlide = this.store.trending.length - 1
            const carouselEl = document.querySelector('.carousel-trending')
            const cardWidth = document.querySelector('.card-img').scrollWidth
            let size = this.currentSlide * -cardWidth + 'px'


            if (this.currentSlide < lastSlide) {
                this.currentSlide++
                carouselEl.style.transform = `translateX(${size})`
            }

        },
        nextSlideRated() {
            const lastSlide = this.store.topRated.length - 1
            const carouselEl = document.querySelector('.carousel-top_rated')
            const cardWidth = document.querySelector('.card-img').scrollWidth
            let size = this.currentSlide * -cardWidth + 'px'
            console.log(this.currentSlide, size, cardWidth, lastSlide, this.store.topRated)
            if (this.currentSlide < lastSlide) {
                this.currentSlide++
                carouselEl.style.transform = `translateX(${size})`
            }
        },

    },

    mounted() {
        this.fetchData()
        this.autoPlay = setInterval(this.change, 5000)
    }
}
</script>

<template>
    <main class="main-content">
        <div class="hero" v-show="store.isVisible">
            <Hero v-for="(trend, index) in store.trending" key="index" :result="trend"
                :class="index === currentIndex ? 'active' : ''" />
        </div>

        <div class="container card">
            <Cards v-for="result in mergedResults" :key="result.id" :result="result" :flag="setLanguageFlag(result)" />
        </div>

        <div class="container" v-show="store.isVisible">
            <h2 class="title">I titoli del momento</h2>
        </div>
        <div class="container flex" v-show="store.isVisible">
            <div class="trend-wrapper">
                <div class="arrow arrow-left" @click="previousSlide">
                    <font-awesome-icon icon="fa-solid fa-chevron-left" class="left" />
                </div>
                <div class="arrow arrow-right" @click="nextSlide">
                    <font-awesome-icon icon="fa-solid fa-chevron-right" class="right" />
                </div>
                <div class="carousel-trending">

                    <CardCarousel v-for="trend in store.trending" key="trend.id" :result="trend"
                        :flag="setLanguageFlag(trend)" />

                </div>
            </div>
        </div>

        <div class="container" v-show="store.isVisible">
            <h2 class="title">Top Rated di oggi</h2>
        </div>

        <div class="container flex" v-show="store.isVisible">
            <div class="top-rated-wrapper">

                <div class="arrow arrow-left" @click="previousSlideRated">
                    <font-awesome-icon icon="fa-solid fa-chevron-left" class="left" />
                </div>
                <div class="arrow arrow-right" @click="nextSlideRated">
                    <font-awesome-icon icon="fa-solid fa-chevron-right" class="right" />
                </div>
                <div class="carousel-top_rated">

                    <CardCarousel v-for="(top, index) in store.topRated" key="top.id" :result="top"
                        :flag="setLanguageFlag(top)" />

                </div>

            </div>
        </div>


    </main>
</template>

<style lang="scss" scoped >
@use '../style/partials/variables' as *;

.main-content {
    background-color: $main-bg;
    color: white;

    .container,
    .container.card,
    .container.flex {
        padding: 10px 20px;
    }

    .container.flex {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .container.card {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }
}

.title {
    margin-bottom: 10px;
}

.trend-wrapper,
.top-rated-wrapper {
    &:hover .arrow {
        opacity: 1;
    }

}

.arrow {
    color: white;
    font-size: 20px;
    position: absolute;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    height: 23%;
    opacity: 0;
    padding: 10px;

    &.arrow-left,
    .left {
        left: 0px;
    }

    &.arrow-right,
    .right {
        right: 0;
    }

    .left,
    .right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 3px;
    }
}

.carousel-top_rated,
.carousel-trending {
    display: flex;
    height: 200px;
    overflow: hidden;
    gap: 8px;
    scroll-behavior: smooth;
}


.d-none {
    display: none;
}
</style>