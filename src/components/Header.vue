<script >

</script>

<template>
    <header class="main-header">
        <figure class="header__logo">
            <img src="/img/logo.png" alt="">
        </figure>
        <div class="search-bar">
            <input class="search" type="text">
            <button>Cerca</button>

        </div>
    </header>
</template>

<style lang="scss" >
@use '../style/partials/variables' as *;

.main-header {
    background-color: $header-bg;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__logo {
    width: 200px;
}
</style>