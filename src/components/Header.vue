<script >
import store from '../store'

export default {
    data() {
        return {
            store,
        }
    },
}

</script>

<template>
    <header class="main-header">
        <figure class="header__logo">
            <img src="/img/logo.png" alt="">
        </figure>
        <div class="search-bar">
            <input @keyup.enter="$emit('onSearch')" class="search" type="text" v-model="store.search">
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.main-header {
    background-color: $header-bg;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__logo {
    width: 150px;
}
</style>