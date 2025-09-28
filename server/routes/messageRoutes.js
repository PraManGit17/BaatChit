
import express from 'express';
import { UserLists } from '../controllers/messageController.js'

const router = express.Router();

router.get('/users', UserLists);

export default router;
