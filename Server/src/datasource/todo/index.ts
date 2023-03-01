import { Prisma, PrismaClient, Todo } from '@prisma/client';
const prisma = new PrismaClient();


const get = async () => {
    try {
        const todos = await prisma.todo.findMany();

        return todos;
    } catch (error) {
        throw new Error("Can not fetch todos" + error);
    }
}

const create = async (todo: Omit<Todo, "id">) => {
    try {
        const todos = await prisma.todo.create({
            data: todo
        })

        return todos;
    } catch (error) {
        throw new Error("Can not create todos" + error);
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
        throw new Error("Can not create todos");
    }
}

const deletes = async (todoId: Prisma.IntFilter) => {
    try {
        const todos = await prisma.todo.deleteMany({
            where: {
                id: todoId,
            }
        })

        return todos;
    } catch (error) {
        throw new Error("Can not create todos" + error);
    }
}



export default {
    get,
    create,
    update,
    deletes
}


