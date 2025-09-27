
import express from 'express';
import { Usersignup, Userlogin} from '../controllers/authControllers.js'

const router = express.Router();

router.post('/signup', Usersignup);
router.post('/login', Userlogin);

export default router;
