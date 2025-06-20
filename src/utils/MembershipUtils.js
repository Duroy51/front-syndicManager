// utils/membershipUtils.js - Utilitaires pour l'adhésion
export const generateMembershipId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `SYN-${timestamp}-${random}`;
};



export const validateMembershipForm = (formData, documents) => {
    const requiredFields = [
        'nom', 'prenom', 'numeroCNI', 'dateNaissance',
        'telephone', 'email', 'adresse', 'profession', 'motivation'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    const missingDocuments = [];

    if (!documents.photoIdentite) missingDocuments.push('Photo d\'identité');
    if (!documents.pieceIdentiteFace) missingDocuments.push('Pièce d\'identité face');
    if (!documents.pieceIdentiteDos) missingDocuments.push('Pièce d\'identité dos');

    return {
        isValid: missingFields.length === 0 && missingDocuments.length === 0,
        missingFields,
        missingDocuments
    };
};