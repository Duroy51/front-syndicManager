// accountServices.js

// Import necessary dependencies
import {jwtDecode} from 'jwt-decode'; // Optionnel, si tu utilises JWT
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const TOKEN_KEY = 'token'; // Clé pour le stockage du token dans localStorage
const TOKEN_SYND = 'organisationToken';

/**
 * Sauvegarde le token dans le stockage local.
 * @param {string} token - Le token d'authentification.
 */
export const saveToken = (token) => {

    localStorage.setItem(TOKEN_KEY, token);
};


export const saveOrganisationToken = (token) => {
    localStorage.setItem(TOKEN_SYND, token);
};


/**
 * Récupère le token depuis le stockage local.
 * @returns {string|null} - Le token d'authentification ou null s'il n'existe pas.
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getOrganisationToken = () => {
    return localStorage.getItem(TOKEN_SYND);
};

/**
 * Supprime le token du stockage local.
 */
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);

};

export const removeOrganisationToken = () => {
    localStorage.removeItem(TOKEN_SYND);
};

/**
 * Décode un token JWT pour extraire les informations.
 * @param {string} token - Le token JWT.
 * @returns {Object|null} - Les données décodées ou null en cas d'erreur.
 */
export const decodeToken = (token) => {
    if (!token) {
        console.error('Le token est vide ou indéfini.');
        return null;
    }

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Erreur de décodage du token:', error.message);
        return null;
    }
};

/**
 * Vérifie si un utilisateur est authentifié (basé sur le token).
 * @returns {boolean} - Vrai si l'utilisateur est authentifié, faux sinon.
 */
export const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
        return false;
    }else {
        return !isTokenExpired();
    }
};

/**
 * Configure les en-têtes d'authentification pour Axios.
 * @param {string|null} token - Le token d'authentification.
 */
export const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

/**
 * Initialise le service avec un token valide.
 */
export const initializeAuth = () => {
    const token = getToken();
    if (token && isAuthenticated()) {
        setAuthHeader(token);
    } else {
        removeToken();
        setAuthHeader(null);
    }
};

/**
 * Déconnecte l'utilisateur en supprimant le token.
 */
export const logout = () => {
    removeToken();
    setAuthHeader(null);

};

/**
 * Récupère les informations de l'utilisateur connecté (à partir du token).
 * @returns {Object|null} - Les informations de l'utilisateur ou null.
 */
export const getUserInfo = () => {
    const token = getToken();
    if (token) {
        return decodeToken(token);
    }
    return null;
};

/**
 * Récupère l'email de l'utilisateur depuis le token.
 * @returns {string|null} - L'email de l'utilisateur ou null si non disponible.
 */
export const getEmailToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.email || null;
};

/**
 * récupère le role de l'utilisateur via le toke,.
 * @return {string|null} -le role de l'utilisateur connecté
 */

export  const getRoleFromToken = () => {
    const token = getToken();
    if(!token) return null;

    const decoded = decodeToken(token);
    return decoded?.role || null;
}
/**
 * Récupère le prénom de l'utilisateur depuis le token.
 * @returns {string|null} - Le prénom de l'utilisateur ou null si non disponible.
 */
export const getFirstNameToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.nom || null;
};

/**
 * Récupère le nom de famille de l'utilisateur depuis le token.
 * @returns {string|null} - Le nom de famille de l'utilisateur ou null si non disponible.
 */
export const getLastNameToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.Prenom || null;
};

/**
 * Récupère l'ID de l'utilisateur depuis le token.
 * @returns {string|null} - L'ID de l'utilisateur ou null si non disponible.
 */
export const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.userId || null;
};

/**
 * Récupère la date d'expiration du token.
 * @returns {Date|null} - La date d'expiration ou null si non disponible.
 */
export const getTokenExpiration = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.exp ? new Date(decoded.exp * 1000) : null;
};

/**
 * Vérifie si le token est expiré.
 * @returns {boolean} - Vrai si le token est expiré, faux sinon.
 */
export const isTokenExpired = () => {
    const expirationDate = getTokenExpiration();
    return expirationDate ? Date.now() > expirationDate.getTime() : true;
};


/**
 * Suite de méthodes pour gérer la connexion à un syndicat donné
 *
 */

export const getOrganisationName = () => {
    const token = getOrganisationToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.name || null;
};

export const getOrganisationDescription = () => {
    const token = getOrganisationToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.description || null;
};

export const getOrganisationDomain = () => {
    const token = getOrganisationToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.domain || null;
};

export const getUserRole = () => {
    const token = getOrganisationToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.role || null;
};

export const getOrganisationId = () => {
    const token = getOrganisationToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.organisationId || null;
};

