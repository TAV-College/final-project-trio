const jwt = require('jsonwebtoken');
const {getUserByUsername} = require("../models/userModel")

module.exports = async (req, res, next) => {
  const token = req.cookies["authCookie"];

  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    try {
      const user = await getUserByUsername(payload.username);
      if (!user) return res.status(403).json({ message: "User not found" });

      req.user = { id: user.user_id, username: user.username, role: user.role };
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

