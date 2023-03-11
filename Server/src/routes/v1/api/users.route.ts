import express from 'express';
import isAuthenticated from '../../../middleware/validate';
import { getAllUsers, findUserById } from '../../../services/users.services';
import UsageHistory from '../../../services/usageHistory.services';
const app = express.Router();

app.get('/', isAuthenticated, async (req, res) => {

    const users = await getAllUsers();

    res.json(users);

});

app.get('/:id', isAuthenticated, async (req, res) => {

    const userId: string = req.params.id;

    const user = findUserById(userId);

    res.json({ user });

});

app.get('/:id/history', isAuthenticated, async (req, res) => {

    const userId: string = req.params.id;

    const userCount = await UsageHistory.getUsageCount(userId);

    res.json(userCount);

});




export default app;
