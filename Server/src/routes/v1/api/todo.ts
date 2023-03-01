import express from 'express';
const app = express.Router();
import Todo from '../../../datasource/todo';
import { Prisma } from '@prisma/client';

app.get('/', async (req, res) => {

    const data = await Todo.get();

    res.send(data);

});

app.post('/', async (req, res) => {

    const { title, description, isDone, userId} = req.body;

    const data = await Todo.create({
        title,
        description,
        userId,
        isDone,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    res.send({
        data
    });

});

app.put('/:id', async (req, res) => {

    const { id } = req.params;

    const body = req.body;

    const data = await Todo.update(Number(id),body); 

    if(data.count > 0){

        res.send({
            message: "Todo item updated successfully!"
        });

    } else {

        res.send({
            message: "Todo item update failed!"
        });

    }
   
});

app.delete('/:id', async (req, res) => {

    const { id } = req.params;

    const data = await Todo.deletes(Number(id) as Prisma.IntFilter);

    if(data.count > 0){

        res.send({
            message: "Todo item deleted successfully!"
        });

    } else {

        res.send({
            message: "Todo item delete failed!"
        });

    }

});

export default app;