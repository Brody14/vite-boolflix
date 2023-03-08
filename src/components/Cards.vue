<script>

export default {
    components: {

    },
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
            return 'https://image.tmdb.org/t/p/w185' + this.result.poster_path
        },
        overview() {
            return this.result.overview.slice(0, 150) + '...'
        }
    }
}

</script>

<template>
    <div class="card">
        <div class="card-img">
            <img :src="path" alt="">
        </div>
        <div class="card-body">
            <h2 class="main-title">Titolo: <span class="title"> {{ title }} </span> </h2>
            <h3 class="main-original-title">Titolo originale: <span class="original-title"> {{ originalTitle }}</span></h3>
            <div v-if="flag !== ''">
                <img :src="flag" alt="">
            </div>
            <p v-else> {{ language }}</p>
            <div class="icons-wrapper">
                <p class="vote">Voto:</p>
                <div v-for="n in vote">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </div>
                <div v-for="n in 5 - vote">
                    <font-awesome-icon icon="fa-regular fa-star" />
                </div>
            </div>
            <p> {{ overview }}</p>
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