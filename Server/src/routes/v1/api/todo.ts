import express from 'express';
const app = express.Router();
import Todo from '../../../services/todo.services';
import isAuthenticated from '../../../middleware/validate';

app.get('/', isAuthenticated, async (req, res) => {

    const data = await Todo.get();

    res.send(data);

});

app.post('/', isAuthenticated, async (req, res) => {

    const { title, description, isDone, userId } = req.body;

    const data = await Todo.create({
        title,
        description,
        userId,
        isDone,
    });

    res.send(data);

});

app.put('/:id', isAuthenticated, async (req, res) => {

    const { id } = req.params;

    const body = req.body;

    console.log(body);

    const data = await Todo.update(Number(id), body);

    if (data!.count > 0) {

        res.send({
            message: "Todo item updated successfully!"
        });

    } else {

        res.send({
            message: "Todo item update failed!"
        });

    }

});

app.delete('/:id', isAuthenticated, async (req, res) => {

    const { id } = req.params;

    const data = await Todo.deletes(Number(id));

    if (data!.count > 0) {

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