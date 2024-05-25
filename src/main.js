import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./style.css";
import App from "./App.vue";
import router from "./router.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Q-pMBYLY8xpwJxSrmgw4cZQlzry2OY4",
  authDomain: "dn-juhaas.firebaseapp.com",
  projectId: "dn-juhaas",
  storageBucket: "dn-juhaas.appspot.com",
  messagingSenderId: "229296670326",
  appId: "1:229296670326:web:9a7c505d8c8b821fb78157",
  measurementId: "G-H1F3ZX4QJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

createApp(App).use(router).mount("#app");
