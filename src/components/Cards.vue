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
            <h2 class="title">Titolo: {{ title }}</h2>
            <h3 class="original-title">Titolo originale: {{ originalTitle }}</h3>
            <div v-if="flag !== ''">
                <img :src="flag" alt="">
            </div>
            <p v-else> {{ language }}</p>
            <div class="icons-wrapper">
                <div v-for="n in vote">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </div>
                <div v-for="n in 5 - vote">
                    <font-awesome-icon icon="fa-regular fa-star" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.card {
    color: white;

    .card-img img {
        width: 340px;
    }

    .card-body {
        padding: 20px;
    }
}

.icons-wrapper {
    color: rgb(255, 242, 4);
    display: flex;
}
</style>