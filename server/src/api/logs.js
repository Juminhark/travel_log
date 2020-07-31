import Router from 'express';

import LogEntry from '../models/LogEntry';
import { nextTick } from 'process';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const entries = await LogEntry.find();
		res.json(entries);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const logEntry = new LogEntry(req.body);
		const createdEntry = await logEntry.save();
		res.json(createdEntry);
	} catch (error) {
		if (error.name === 'ValidationError') {
			res.status(422);
		}
		next(error);
	}
});

export default router;
