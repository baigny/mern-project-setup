import express from 'express';
import User from '../../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render("home", { title: "Home" });
});

router.get("/users", async (req, res) => {
    const users = await User.find().select("-password").sort({createdAt: -1});
    res.render("users", { title: "Users", users });
});


export default router;