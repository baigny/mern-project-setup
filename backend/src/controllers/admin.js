import User from "../models/user.js";
import Contact from "../models/contact.js";
import ApiError from "../utils/api-errors.js";

// --- Users ---
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.status(200).json({ count: users.length, users });
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the updated doc, not the old one
    runValidators: true, // enforce schema rules on update
  }).select("-password");

  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({ message: "User updated", user });
};

export const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id.toString()) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({ message: "User deleted" });
};

// --- Contacts ---
export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({ count: contacts.length, contacts });
};

export const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) throw new ApiError(404, "Contact not found");
  res.status(200).json({ message: "Contact deleted" });
};