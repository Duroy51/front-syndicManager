import axios from 'axios';

// Créer une instance d'Axios
export const apiClient = axios.create({
    baseURL: 'https://gateway.yowyob.com', // Remplacez par votre URL de base
    /*timeout: 10000, // Timeout pour les requêtes*/
});

// Ajouter un intercepteur pour inclure le token dans chaque requête
apiClient.interceptors.request.use(
    (config) => {
        // Récupérer le token depuis le localStorage ou une autre source
        const token = localStorage.getItem('token');

        // Ajouter le token dans l'en-tête Authorization si disponible
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Gérer les erreurs liées à la configuration
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            // Ajouter une logique pour déconnecter l'utilisateur ou rediriger
        }
        return Promise.reject(error);
    }
);

export default apiClient;
