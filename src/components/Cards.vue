<script>
export default {
    props: {
        movie: {
            type: Object,
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
            <p class="language"> Lingua: {{ movie.original_language }}</p>
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