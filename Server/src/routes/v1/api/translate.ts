import express from 'express';
import isAuthenticated from '../../../middleware/validate';
const app = express.Router();
import { translate } from '../../../services/translate.services';


app.post('/', isAuthenticated, async (req, res) => {

    const { text, target } = req.body;

    const data = await translate(text, target);

    res.send(data);

});


export default app;
