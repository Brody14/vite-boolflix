import { reactive } from "vue";

const store = reactive({
	search: "",
	movies: [],
	series: [],
	trending: [],
});

export default store;
