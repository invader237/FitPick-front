import axios from "axios";

// Configure Axios avec le token JWT
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // URL de l'API backend
});

// Intercepteur pour ajouter le token Authorization
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); // Récupération du token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur pour gérer les réponses avec erreurs
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("Erreur Axios détectée :", error.response);
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
