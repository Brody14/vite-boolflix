<script >
import store from '../store'
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            store,
            show: false,
        }
    },
    methods: {
        toggleSearch() {
            this.show = !this.show
        },
        closeSearch() {
            this.show = false
        }
    }

}

</script>

<template>
    <header class="main-header" @click.self="closeSearch">
        <figure class="header__logo">
            <img src="/img/logo.png" alt="">
        </figure>
        <ul class="header-menu">
            <Navbar />
        </ul>
        <div class="search-bar">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="search__icon" @click.stop="toggleSearch" />

            <div class="search_input">
                <input v-show="show" @keyup.enter="$emit('onSearch')" :class="['search__input', (show) ? 'active' : '']"
                    type="text" v-model="store.search" placeholder="Cerca film o serie tv">
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.main-header {
    background-color: $header-bg;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.header__logo {
    width: 150px;
}

.header-menu {
    color: white;
    display: flex;
    gap: 10px;
}

.search-bar {
    margin-left: auto;
    position: relative;

    .search__icon {
        color: white;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }

    .search__input {
        background-color: transparent;
        border: 2px solid rgb(61, 61, 61);
        padding: 10px;
        border-radius: 15px;
        color: grey;
        width: 0;
        opacity: 0;
        transition: width 10s;
    }

    .search__input.active {
        width: 200px;
        opacity: 1;
    }
}
</style>