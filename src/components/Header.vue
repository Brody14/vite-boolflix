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
            iconshow: true,

        }
    },
    methods: {
        toggleSearch() {
            this.show = !this.show
            this.iconshow = !this.iconshow
        },
    }

}

</script>

<template>
    <header class="main-header" @click.self="toggleSearch">
        <figure class="header__logo">
            <img src="/img/logo.png" alt="">
        </figure>
        <ul class="header-menu">
            <Navbar />
        </ul>
        <div class="search-bar">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="search__icon" @click.stop="toggleSearch"
                v-show="iconshow" />

            <div>
                <input v-show="show" @keyup.enter="$emit('onSearch')" class="search__input" type="text"
                    v-model="store.search" placeholder="Cerca film o serie tv">
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

    .search__icon {
        color: white;
    }

    .search__input {
        background-color: unset;
        border: 2px solid rgb(61, 61, 61);
        padding: 10px;
        border-radius: 15px;
        color: grey;
    }
}
</style>