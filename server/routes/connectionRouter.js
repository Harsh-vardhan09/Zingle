import express from 'express'
import { protect } from '../middleware/auth.js';
import { acceptConnectionRequest, getUserConnection, sendConnectionRequest } from '../controllers/connectionController.js';

const connectionRouter=express.Router();

connectionRouter.post('/connect',protect,sendConnectionRequest)
connectionRouter.post('/accept',protect,acceptConnectionRequest)
connectionRouter.get('/connections',protect,getUserConnection);

export default connectionRouter;