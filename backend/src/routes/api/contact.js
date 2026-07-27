import express from "express";
import { createContact } from "../../controllers/contact.js";
import { validate } from "../../middlewares/validate.js";
import { contactSchema } from "../../validators/contact.js";

const router = express.Router();

/**
 * @openapi
 * /api/contact:
 *   post:
 *     summary: Submit a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, message]
 *             properties:
 *               username: { type: string, example: nabil }
 *               email: { type: string, example: [email protected] }
 *               message: { type: string, example: I'd like to know more. }
 *     responses:
 *       201: { description: Message received }
 *       400: { description: Validation failed }
 */
router.post("/", validate(contactSchema), createContact);

export default router;