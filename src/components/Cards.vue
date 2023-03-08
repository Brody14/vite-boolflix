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
            return parseInt(this.result.vote_average)
        }
    }
}

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h2 class="title">Titolo: {{ title }}</h2>
            <h3 class="original-title">Titolo originale: {{ originalTitle }}</h3>
            <div v-if="flag !== ''">
                <img :src="flag" alt="">
            </div>
            <p v-else> {{ language }}</p>
            <p class="vote">Voto: {{ vote }}</p>
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