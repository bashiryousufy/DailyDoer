import express from 'express';
const app = express.Router();
import Todo from '../../../services/todo.services';
import isAuthenticated from '../../../middleware/validate';

app.get('/', isAuthenticated, async (req, res) => {

    const userId: string = res.locals.userId;

    const data = await Todo.get(userId);

    res.send(data);

});

app.get('/:id', isAuthenticated, async (req, res) => {

    const userId: string = res.locals.userId;

    const { id } = req.params;

    const data = await Todo.getById(id, userId);

    res.send(data);

});

app.post('/', isAuthenticated, async (req, res) => {

    const { title, description, isDone } = req.body;

    const userId: string = res.locals.userId;

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

    const userId: string = res.locals.userId;

    const body = req.body;

    const data = await Todo.update(id, userId, body);

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

    const userId: string = res.locals.userId;

    const data = await Todo.deletes(id, userId);

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