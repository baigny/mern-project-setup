import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    message: "Message received. We'll get back to you soon.",
    contact,
  });
};