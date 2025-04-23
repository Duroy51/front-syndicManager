// accountServices.js

// Import necessary dependencies
import {jwtDecode} from 'jwt-decode'; // Optionnel, si tu utilises JWT
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const TOKEN_KEY = 'token'; // Clé pour le stockage du token dans localStorage
const TOKEN_SYND = 'organisationToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_DATA_KEY = 'user';
const LAST_ACTIVE_KEY = 'lastActive';

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
 * Récupère les données utilisateur depuis le stockage local
 * @returns {Object|null} - Les données utilisateur ou null
 */
export const getUserData = () => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
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
 * Récupère le prénom de l'utilisateur depuis le token.
 * @returns {string|null} - Le prénom de l'utilisateur ou null si non disponible.
 */
export const getFirstNameToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.nom || null;
};
export const getProfilFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.profile || null;
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
export const getEmailFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.email || decoded?.sub || null;
};

/**
 * Récupère le nom complet de l'utilisateur depuis le token.
 * @returns {string|null} - Le nom complet ou null si non disponible.
 */
export const getFullNameFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    const userData = decoded?.user ? JSON.parse(decoded.user) : decoded;

    // Essaie plusieurs propriétés possibles pour le nom
    const name = userData?.name || userData?.fullName || userData?.nom;
    if (name) return name;

    // Si pas de nom complet, essaie de combiner prénom et nom
    const firstName = userData?.firstName || userData?.prenom || userData?.firstname;
    const lastName = userData?.lastName || userData?.nom_famille || userData?.lastname;

    if (firstName && lastName) {
        return `${firstName} ${lastName}`;
    } else if (firstName) {
        return firstName;
    } else if (lastName) {
        return lastName;
    }

    return null;
};

/**
 * Récupère le rôle de l'utilisateur via le token.
 * @returns {string|null} - Le rôle de l'utilisateur connecté ou null si non disponible.
 */
export const getRoleFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.role || decoded?.authorities || null;
};

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 * @param {string|Array<string>} requiredRoles - Le(s) rôle(s) requis
 * @returns {boolean} - Vrai si l'utilisateur a le rôle requis
 */
export const hasRole = (requiredRoles) => {
    const userRole = getRoleFromToken();
    if (!userRole) return false;

    if (Array.isArray(requiredRoles)) {
        return requiredRoles.some(role => userRole === role || userRole.includes(role));
    }

    return userRole === requiredRoles || userRole.includes(requiredRoles);
};


/**
 * Récupère l'ID de l'utilisateur depuis le token.
 * @returns {string|null} - L'ID de l'utilisateur ou null si non disponible.
 */
export const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    const userData = decoded?.user ? JSON.parse(decoded.user) : decoded;

    return userData?.id || null;
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
 * Calcule le temps restant avant l'expiration du token en secondes
 * @returns {number|null} - Temps restant en secondes ou null si non disponible
 */
export const getTokenRemainingTime = () => {
    const expirationDate = getTokenExpiration();
    if (!expirationDate) return null;

    const remainingMs = expirationDate.getTime() - Date.now();
    return Math.max(0, Math.floor(remainingMs / 1000));
};

