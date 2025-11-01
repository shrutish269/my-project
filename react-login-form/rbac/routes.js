// rbac/routes.js
const express = require("express");
const router = express.Router();
const users = require("./users");
const { generateToken } = require("./jwt");
const { authenticate, authorizeRoles } = require("./authMiddleware");

// 🔐 Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token });
});

// 🛡️ Admin-only route
router.get("/admin-dashboard", authenticate, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin dashboard", user: req.user });
});

// 🛡️ Moderator-only route
router.get("/moderator-tools", authenticate, authorizeRoles("Moderator"), (req, res) => {
  res.json({ message: "Moderator access granted", user: req.user });
});

// 🛡️ General user route (accessible by all roles)
router.get("/user-profile", authenticate, authorizeRoles("User", "Admin", "Moderator"), (req, res) => {
  res.json({ message: `Welcome to your profile, ${req.user.username}`, user: req.user });
});

module.exports = router;