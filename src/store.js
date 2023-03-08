import { reactive } from "vue";

const store = reactive({
	search: "",
	movies: [],
	series: [],
});

export default store;
