import { Router } from 'express';
import { getAuth, getAuthById, logout, signin, signup, updateRole } from '../controllers/auth.js';

const Router_auth = Router();
Router_auth.get('/auth', getAuth)
Router_auth.post('/auth/signin', signin)
Router_auth.post('/auth/signup', signup)
Router_auth.post('/auth/logout', logout)
Router_auth.put('/auth/:userId', updateRole)
Router_auth.get('/auth/:userId', getAuthById)
export default Router_auth;