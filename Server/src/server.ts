import express from 'express';
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
import Todo from './routes/v1/api/todo';

const app = express();

//config
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

//routes
app.use('/api/v1/todo', Todo);

app.get('/', async (req, res) => {
	res.send('Server running ');
});

app.listen(process.env.PORT || 5000, () => {
	console.log('Server running at PORT http://localhost:' + process.env.PORT);
});