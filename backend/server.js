// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error(err));

// --- NEW: User Schema ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// --- MODIFIED: Transaction Schema (added user link) ---
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: String,
  category: String,
  amount: Number,
  date: String,
  note: String,
});
const Transaction = mongoose.model("Transaction", transactionSchema);


// --- NEW: Auth Middleware ---
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret_key');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// --- NEW: User Routes ---
// POST /api/users/register
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_default_secret_key', { expiresIn: '30d' }),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// POST /api/users/login
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_default_secret_key', { expiresIn: '30d' }),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});


// --- MODIFIED: Transaction Routes (now protected and user-specific) ---
app.get("/api/transactions", protect, async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.json(transactions);
});

app.post("/api/transactions", protect, async (req, res) => {
  try {
    const tx = new Transaction({ ...req.body, user: req.user._id });
    await tx.save();
    res.status(201).json(tx);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/transactions/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    }
    const updatedTx = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTx);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/transactions/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
     if (transaction.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    }
    await transaction.deleteOne();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));