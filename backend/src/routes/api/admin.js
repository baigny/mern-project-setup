import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllContacts,
  deleteContact,
} from "../../controllers/admin.js";
import { authenticate } from "../../middlewares/auth.js";
import { requireAdmin } from "../../middlewares/admin.js";
import { validate } from "../../middlewares/validate.js";
import { updateUserSchema } from "../../validators/admin.js";

const router = express.Router();

// Applies to EVERY route below — token required AND must be admin
router.use(authenticate, requireAdmin);

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     summary: List all users (admin)
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of users }
 *       403: { description: Admin access required }
 */
router.get("/users", getAllUsers);

/**
 * @openapi
 * /api/admin/users/{id}:
 *   patch:
 *     summary: Update a user (admin)
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: User updated }
 *       404: { description: User not found }
 *   delete:
 *     summary: Delete a user (admin)
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: User deleted }
 *       404: { description: User not found }
 */
router.patch("/users/:id", validate(updateUserSchema), updateUser);
router.delete("/users/:id", deleteUser);

/**
 * @openapi
 * /api/admin/contacts:
 *   get:
 *     summary: List all contact messages (admin)
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of contacts }
 */
router.get("/contacts", getAllContacts);

/**
 * @openapi
 * /api/admin/contacts/{id}:
 *   delete:
 *     summary: Delete a contact message (admin)
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Contact deleted }
 *       404: { description: Contact not found }
 */
router.delete("/contacts/:id", deleteContact);

export default router;