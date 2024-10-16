import { Router } from 'express';
import { getAuth, getAuthById, logout, signin, signup, updateRole } from '../controllers/auth.js';
import { createAddress, deleteAddress, updateIsDefault } from '../controllers/address.js';

const Router_auth = Router();
Router_auth.get('/auth', getAuth)
Router_auth.post('/auth/signin', signin)
Router_auth.post('/auth/signup', signup)
Router_auth.post('/auth/logout', logout)
Router_auth.put('/auth/:userId', updateRole)
Router_auth.get('/auth/:userId', getAuthById)
// Address
Router_auth.post('/auth/create-address', createAddress)
Router_auth.patch('/auth/update-isDefault', updateIsDefault)
Router_auth.delete('/auth/delete-address', deleteAddress)
export default Router_auth;