import axios from "axios";

import { development } from "../settings";

const devURL = "http://localhost:8000/";
const prodURL = "https://django-backend-qrl8.onrender.com/";

export default axios.create({
  baseURL: development ? devURL : prodURL,
});

export const axiosCredentialPublic = axios.create({
  baseURL: development ? devURL : prodURL,
});

export const axiosPrivate = axios.create({
  baseURL: development ? devURL : prodURL,
  headers: { "Content-Type": "application/json" },
});
