import express from 'express';
const app = express.Router();

app.get('/', async (req, res) => {
    res.send("heelo");
});


export default app;