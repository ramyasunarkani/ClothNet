const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["worker", "manufacturer"].includes(role)) {
      return res.status(400).json({ message: "Role must be worker or manufacturer" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!["worker", "manufacturer"].includes(role)) {
      return res.status(400).json({ message: "Role must be worker or manufacturer" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== role) {
      return res.status(403).json({ message: `This account is registered as ${user.role}, not ${role}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role, name: user.name,

     });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports={
    login,signup
}