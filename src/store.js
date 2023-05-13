import { reactive } from "vue";

const store = reactive({
	search: "",
	movies: [],
	series: [],
	trending: [],
	topRated: [],
	isVisible: true,
});

export default store;
