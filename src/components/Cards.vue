<script>
import store from '../store'
import axios from 'axios'

export default {
    props: {
        result: {
            type: Object,
            required: true
        },
        flag: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            store,
            castMovies: [],
            castSeries: [],
            movieGenres: [],
            seriesGenres: []
        }
    },
    computed: {
        title() {
            return this.result.name || this.result.title
        },
        originalTitle() {
            return this.result.original_name || this.result.original_title
        },
        language() {
            return this.result.original_language
        },
        vote() {
            return Math.round(this.result.vote_average / 2)
        },
        path() {
            if (this.result.poster_path === null) {
                return '/img/movie_placeholder.png'
            }
            return 'https://image.tmdb.org/t/p/w342' + this.result.poster_path
        },
        overview() {
            return this.result.overview.slice(0, 150) + '...'
        },
        castInfo() {
            return this.castMovies.concat(this.castSeries)
        },
        cast() {
            return this.castInfo.splice(0, 5)
        },
        resultId() {
            return this.result.genre_ids
        },
        genres() {
            return this.resultGenres.filter(el => this.resultId.includes(el.id))
        },
        resultGenres() {
            return [...new Set(...[this.movieGenres, this.seriesGenres])]
        },
    },
    methods: {
        fetchData() {
            this.fetchCastMovie()
            this.fetchCastSeries()
            this.fetchMovieGenre()
            this.fetchSeriesGenre()
        },
        fetchCastMovie() {
            axios.get(`https://api.themoviedb.org/3/movie/${this.result.id}/credits?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT`)
                .then(res => {
                    //console.log(res)
                    const { cast } = res.data
                    this.castMovies = cast
                    //console.log('cast', this.castMovies)
                }).catch(() => {
                    this.castMovies = []
                })
        },
        fetchCastSeries() {
            axios.get(`https://api.themoviedb.org/3/tv/${this.result.id}/credits?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT`)
                .then(res => {
                    //console.log(res)
                    const { cast } = res.data
                    this.castSeries = cast
                    //console.log('cast', this.castSeries)
                }).catch(() => {
                    this.castSeries = []
                })
        },
        fetchMovieGenre() {
            axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT')
                .then(res => {
                    //console.log(res)
                    const { genres } = res.data
                    this.movieGenres = genres
                    //console.log('film', this.movieGenres)

                }).catch(() => {
                    this.movieGenres = []
                })
        },
        fetchSeriesGenre() {
            axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT')
                .then(res => {
                    //console.log(res)
                    const { genres } = res.data
                    this.seriesGenres = genres
                    //console.log(this.seriesGenres)

                }).catch(() => {
                    this.seriesGenres = []
                })
        },

    },
    mounted() {
        this.fetchData()
    },
}


</script>

<template>
    <div class="card">
        <div class="card-img">
            <img :src="path" alt="">
        </div>
        <div class="card-body">
            <h2 class="main-title">Titolo: <span class="title"> {{ result.title }} </span> </h2>
            <h3 class="main-original-title">Titolo originale: <span class="original-title"> {{ originalTitle }}</span></h3>
            <div v-if="flag !== ''">
                <img :src="flag" alt="">
            </div>
            <p v-else> {{ language }}</p>
            <div class="icons-wrapper">
                <h4 class="vote">Voto:</h4>
                <ul v-for="n in vote" :key="n">
                    <li>
                        <font-awesome-icon icon="fa-solid fa-star" />
                    </li>
                </ul>
                <ul v-for="n in 5 - vote" :key="5 + n">
                    <li>
                        <font-awesome-icon icon="fa-regular fa-star" />
                    </li>
                </ul>
            </div>
            <p> {{ overview }}</p>
            <ul>
                <h4>Cast:</h4>
                <li v-for="(actor, i) in cast" :key="i">{{ actor.name }} </li>
            </ul>
            <ul>
                <h4>Generi correlati: </h4>
                <li v-for="el in genres" :key="el"> {{ el.name }} </li>
            </ul>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.card {
    color: white;
    position: relative;

    .card-img img {
        width: 360px;
    }

    .card-body {
        padding: 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        opacity: 0;

        .main-title {
            font-size: 20px;

            .title {
                font-weight: lighter;
                font-size: 16px;
            }
        }

        .original-title {
            font-weight: lighter;
            font-size: 16px;
        }
    }
}

.card:hover .card-body {
    opacity: 1;
}

.card:hover .card-img {
    opacity: 0;
}

.icons-wrapper {
    color: rgb(255, 242, 4);
    display: flex;

    .vote {
        color: white;
        font-weight: bold;
        margin-right: 5px;
    }
}
</style>