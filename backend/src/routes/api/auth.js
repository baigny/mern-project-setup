import  express from 'express';
import { login, register } from '../../controllers/auth.js';
import {validate} from '../../middlewares/validate.js';
import { registerSchema, loginSchema } from'../../validators/auth.js';

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username: { type: string, example: nabil }
 *               email: { type: string, example: [email protected] }
 *               password: { type: string, example: secret123 }
 *     responses:
 *       201: { description: Registered successfully }
 *       409: { description: Email already registered }
 */

router.post('/register', validate(registerSchema), register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: [email protected] }
 *               password: { type: string, example: secret123 }
 *     responses:
 *       200: { description: Logged in successfully }
 *       401: { description: Invalid credentials }
 */

router.post('/login', validate(loginSchema), login);

export default router;