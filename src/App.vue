<script >
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import axios from 'axios'
import store from './store'

export default {
  components: {
    Header,
    Main,
  },
  data() {
    return {
      store,
    }
  },
  computed: {
    search() {
      return this.store.search.trim()
    }
  },
  methods: {
    fetchData() {
      this.fetchMovies()
      this.fetchTv()
    },
    fetchMovies() {

      if (this.search !== '') {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT&query=${this.search}`)
          .then((res) => {
            //console.log(res.data.results)
            const movie = res.data.results
            this.store.movies = movie
          }).catch(() => {
            this.store.movies = []
          })
      }
    },
    fetchTv() {
      if (this.search !== '') {
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=07957f00f230f554787ba82062ad2b4f&language=it-IT&query=${this.search}`)
          .then((res) => {
            //console.log(res.data.results)
            const tv = res.data.results
            this.store.series = tv
          }).catch(() => {
            this.store.series = []
          })
      }
    },

  }
}

</script>

<template>
  <div class="content">
    <Header @onSearch="fetchData" />
    <Main class="main" />

  </div>
</template>

<style lang="scss" >
@use './style/general.scss';

.content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;

  .main {
    flex-grow: 1;
  }
}
</style>