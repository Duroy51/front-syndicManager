export function generateFakeJWT(user) {
    const currentTime = Date.now();
    const expiration = currentTime + 30 * 60 * 1000;


    const header = {
        alg: "HS256",
        typ: "JWT",
    };


    const payload = {
        email: user.email,
        nom: user.firstName,
        Prenom: user.lastName,
        role: user.role,
        userId: String(user.id),
        exp: Math.floor(expiration / 1000),
        sub: user.email,
        iat: Math.floor(currentTime / 1000),
    };


    const base64Encode = (obj) => {
        return btoa(JSON.stringify(obj));
    };


    const token = `${base64Encode(header)}.${base64Encode(payload)}.signatureDummy`;

    return {
        Bearer: token,
        ExpireAt: new Date(expiration),
    };
}