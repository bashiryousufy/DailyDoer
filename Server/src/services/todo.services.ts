import { Prisma, PrismaClient, Todo } from '@prisma/client';
const prisma = new PrismaClient();

type TTodo = Omit<Todo, "id" | "createdAt" | "updatedAt" | "role">;

//get all todos
const get = async (userId: string) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: userId
            }
        });

        return todos;
    } catch (error) {
        console.log("Can not fetch todos" + error);
    }
}

//get single todo by id
const getById = async (id: string, userId: string) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                id,
                userId
            }
        });

        return todos;
    } catch (error) {
        console.log("Can not fetch todos" + error);
    }
}

//insert a new todo into db
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

//update a todo 
const update = async (todoId: string, userId: string, todo: Todo) => {
    try {
        const todos = await prisma.todo.updateMany({
            where: {
                id: todo.id,
                userId: userId
            },
            data: todo
        })

        return todos;
    } catch (error) {
        console.log("Can not create todos");
    }
}

//delete a specific todo by id
const deletes = async (todoId: string, userId: string) => {
    try {
        const todos = await prisma.todo.deleteMany({
            where: {
                id: todoId,
                userId
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
    deletes,
    getById
}


