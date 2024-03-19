export const jwtConfig = {
    secret: process.env.ACCESS_TOKEN_SECRET || 'MinhaChaveSecretaHomol',
    expiresIn: '3h',
};
