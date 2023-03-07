<script >
import Header from './components/Header.vue'
import axios from 'axios'
import store from './store'

export default {
  components: {
    Header,
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    fetchMovies() {
      const search = this.store.search.trim()
      if (search !== '') {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT&query=${search}`)
          .then((res) => {
            console.log(res.data.results)
          })

      }
    }
  }
}
</script>

<template>
  <Header @onSearch="fetchMovies" />
</template>

<style lang="scss" >
@use './style/general.scss';
</style>