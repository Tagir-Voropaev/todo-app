import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, 'secret111', { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, 'secret111', { expiresIn: '30d' });
    return { accessToken, refreshToken }
};
export const saveToken = async (userId, refreshToken) => {
    const tokenData = await prisma.tokenModel.findMany({where: { userId: userId }});
    if(tokenData.length > 0) {
        tokenData[0].refreshToken = refreshToken;
        const token = await prisma.tokenModel.update({ where: { id: tokenData[0].id }, data: { refreshToken: refreshToken } });
        return token
    } else {
        const token = await prisma.tokenModel.create({ data: { userId: userId, refreshToken: refreshToken } });
        return token
    }
} 