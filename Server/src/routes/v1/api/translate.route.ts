import express from 'express';
import isAuthenticated from '../../../middleware/validate';
const app = express.Router();
import { translate } from '../../../services/translate.services';
import UsageHistory from '../../../services/usageHistory.services';


app.post('/', isAuthenticated, async (req, res) => {

    const { data, target } = req.body;

    const userId: string = res.locals.userId;

    const isFirstUsage = await UsageHistory.getUsageCount(userId);

    if (!isFirstUsage) {
        //if there is no usage history before initialize the usage
        await UsageHistory.createUsageCount({
            translateBtnCount: 1,
            userId: userId
        });
    } else {
        //increment user's translate usage by 1
        await UsageHistory.updateUsageCount(userId);
    }

    const translatedTitle = await translate(data, target);

    res.json({ translatedTitle });

});


export default app;
