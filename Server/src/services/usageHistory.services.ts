import { PrismaClient, UsageHistory } from '@prisma/client';
const prisma = new PrismaClient();

type TUsageHistory = Omit<UsageHistory, "id" | "createdAt" | "updatedAt">;

const createUsageCount = async (usageHistory: TUsageHistory) => {
    try {

        const data = await prisma.usageHistory.create({
            data: usageHistory
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}

const getUsageCount = async (userId: string) => {
    try {

        const data = await prisma.usageHistory.findUnique({
            where: {
                userId: userId
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}

const updateUsageCount = async (userId: string) => {
    try {
        const data = await prisma.usageHistory.update({
            where: {
                userId: userId
            },
            data: {
                translateBtnCount: {
                    increment: 1
                }
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}


export default {
    getUsageCount,
    updateUsageCount,
    createUsageCount
}
