import express from 'express';
const app = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

import { generateTokens } from '../../../utils/jwt';
import hashToken from '../../../utils/hashToken';
import {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
} from '../../../services/auth.services';
import {
    findUserByEmail,
    createUserByEmailAndPassword,
    findUserById
} from '../../../services/users.services';


app.post('/register', async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body;

        if (!email || !password) {
            res.status(400).send('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            res.status(400).send('Email already in use.');
        }

        const user = await createUserByEmailAndPassword({
            email,
            name,
            password,
            role
        });

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
});


app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send('You must provide an email and a password.');
        }

        const existingUser: any = await findUserByEmail(email);

        if (!existingUser) {
            res.status(403).send('Invalid login credentials.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403).send('Invalid login credentials.');
        }

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        res.json({
            userData: existingUser,
            accessToken,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
});


app.post('/refreshToken', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).send('Missing refresh token.');
        }
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401).send('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken!.hashedToken) {
            res.status(401).send('Unauthorized');
        }

        const user = await findUserById(payload.userId);
        if (!user) {
            res.status(401).send('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken!.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user!.id });

        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        next(err);
    }
});

app.post('/revokeRefreshTokens', async (req, res, next) => {
    try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
        next(err);
    }
});


export default app;
