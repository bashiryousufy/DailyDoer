import express from 'express';
import isAuthenticated from '../../../middleware/validate';
const app = express.Router();
import { translate } from '../../../services/translate.services';


app.post('/', isAuthenticated, async (req, res) => {

    const { data, target } = req.body;

    const translatedTitle = await translate(data, target);

    res.json({ translatedTitle });

});


export default app;
