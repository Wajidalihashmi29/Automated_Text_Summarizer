import express from "express";
import {summarizeInput} from '../controllers/summarizeInput.js';

const router = express.Router();

router.post('/summarize-input', summarizeInput);

export default router;