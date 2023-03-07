<script>
import { stringifyExpression } from '@vue/compiler-core';



export default {
    components: {

    },
    props: {
        movie: {
            type: Object,
            required: true
        },
        flag: {
            type: String,
            required: true
        }
    }
}

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h2 class="title">Titolo: {{ movie.title }}</h2>
            <h3 class="original-title">Titolo originale: {{ movie.original_title }}</h3>
            <div>
                <img :src="flag" alt="">
            </div>
            <p class="vote">Voto: {{ parseInt(movie.vote_average) }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.card {
    color: white;

    .card-body {
        padding: 20px;
    }
}
</style>