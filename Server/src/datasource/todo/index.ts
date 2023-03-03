import { Prisma, PrismaClient, Todo } from '@prisma/client';
const prisma = new PrismaClient();

type TTodo = Omit<Todo, "id" | "createdAt" | "updatedAt" | "role">;

const get = async () => {
    try {
        const todos = await prisma.todo.findMany();

        return todos;
    } catch (error) {
        console.log("Can not fetch todos" + error);
    }
}

const create = async (todo: TTodo) => {
    try {
        const todos = await prisma.todo.create({
            data: {
                title: todo.title,
                description: todo.description,
                isDone: todo.isDone,
                userId: todo.userId,
                createdAt: new Date()
            }
        })

        return todos;
    } catch (error) {
        console.log("Can not create todos" + error);
    }
}

const update = async (todoId: Number, todo: Todo) => {
    try {
        const todos = await prisma.todo.updateMany({
            where: {
                id: todo.id
            },
            data: todo
        })

        return todos;
    } catch (error) {
        console.log("Can not create todos");
    }
}

const deletes = async (todoId: any) => {
    try {
        const todos = await prisma.todo.deleteMany({
            where: {
                id: todoId,
            }
        })

        return todos;
    } catch (error) {
        console.log("Can not create todos" + error);
    }
}



export default {
    get,
    create,
    update,
    deletes
}


