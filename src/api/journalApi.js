import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://journal-vue-1848b-default-rtdb.firebaseio.com'
});

export default journalApi;
