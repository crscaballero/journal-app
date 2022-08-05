import axios from "axios";

const journalApi = axios.create({
    baseURL: process.env.VUE_APP_FIREBASE_URL
});

export default journalApi;
