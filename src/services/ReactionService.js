import { apiClient } from './AxiosConfig';

/**
 * Ajoute un like à une publication (review)
 * @param {number|string} reviewId - L'identifiant de la publication à liker
 * @param {number|string} userId - L'identifiant de l'utilisateur
 * @returns {Promise}
 */
export function ajouterLike(targetId, userId) {
    return apiClient.post('/reaction/create', {
        target_id: targetId,
        user_id: userId,
        reaction_type: 'LIKE'
    });
}

/**
 * Retire un like d'une publication (review)
 * @param {number|string} reviewId - L'identifiant de la publication
 * @param {number|string} userId - L'identifiant de l'utilisateur
 * @returns {Promise}
 */
export function retirerLike(targetId, userId) {
    return apiClient.post('/reaction/create', {
        target_id: targetId,
        user_id: userId,
        reaction_type: 'UNLIKE'
    });
}

/**
 * Ajoute un commentaire à une publication (review)
 * @param {number|string} reviewId - L'identifiant de la publication
 * @param {string} commentaire - Le texte du commentaire
 * @param {number|string} userId - L'identifiant de l'utilisateur
 * @returns {Promise}
 */
export function ajouterCommentaire(reviewId, commentaire, userId) {
    return apiClient.post(`/reviews/${reviewId}/comment`, {
        user_id: userId,
        comment: commentaire
    });
}