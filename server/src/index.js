import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
// .env
dotenv.config();
// middlewares
import { notFound, errorHandler } from './middlewares';
import logs from './api/logs';
const app = express();

// mongoose
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'hello world!',
	});
});

app.use('/api/logs', logs);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
