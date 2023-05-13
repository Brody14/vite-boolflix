<script>

import store from '../store'


export default {
    props: {
        result: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            store,
        }
    },
    computed: {
        title() {
            return this.result.name || this.result.title
        },
        vote() {
            return Math.round(this.result.vote_average / 2)
        },
        path() {
            if (this.result.poster_path === null) {
                return '/img/movie_placeholder.png'
            }
            return 'https://image.tmdb.org/t/p/original' + this.result.backdrop_path
        },
        overview() {
            return this.result.overview
        },
    },
}

</script>

<template>
    <div class="card">
        <div class="card__bg" :style="{ backgroundImage: 'url(' + path + ')' }">

        </div>

        <div class="card__text">
            <h2 class="main-title">{{ title }} </h2>

            <div class="icons-wrapper">
                <div v-for="n in vote">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </div>
                <div v-for="n in 5 - vote">
                    <font-awesome-icon icon="fa-regular fa-star" />
                </div>
            </div>
            <p class="description"> {{ overview }}</p>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.card {
    color: white;
    position: relative;
    display: none;
    align-items: center;

    &.active {
        display: flex;
    }

    .card__bg {
        width: 100%;
        height: 500px;
        background-size: 100%;
        background-position: top;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1));
        }
    }

    .card__text {
        position: absolute;
        left: 0;
        width: 500px;
        padding: 20px;

        .main-title {
            font-size: 40px;
            margin-bottom: 20px;
            text-transform: uppercase;
            opacity: 1;
        }

        .description {
            width: 500px;
        }

        .icons-wrapper {
            color: rgb(255, 242, 4);
            display: flex;
            margin-bottom: 20px;
        }
    }


}
</style>
