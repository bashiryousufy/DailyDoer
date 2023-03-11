import express from 'express';
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
import Todo from './routes/v1/api/todo.route';
import Auth from './routes/v1/api/auth.route';
import Translate from './routes/v1/api/translate.route';
import Users from './routes/v1/api/users.route';

const app = express();

//config
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

//routes
app.use('/api/v1/todo', Todo);
app.use('/api/v1/auth', Auth);
app.use('/api/v1/translate', Translate);
app.use('/api/v1/users', Users);

app.get('/', async (req, res) => {
	res.send('Server running ');
});

app.listen(process.env.PORT || 5000, () => {
	console.log('Server running at PORT http://localhost:' + process.env.PORT);
});