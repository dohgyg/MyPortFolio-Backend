import { Router } from "express";
import Education from "../models/education.model.js";
import authCtrl from "../controllers/auth.controller.js";

const router = Router();

// get list ( all users)
router.get("/", async (req, res) => {
  try {
    const list = await Education.find();
    res.json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Post only admin
router.post(
  "/",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  async (req, res) => {
    try {
      const created = await Education.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Get 1 item(all users)
router.get("/:id", async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    res.json(edu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update (admin)
router.put(
  "/:id",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  async (req, res) => {
    try {
      const updated = await Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Delete (admin)
router.delete(
  "/:id",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  async (req, res) => {
    try {
      await Education.findByIdAndDelete(req.params.id);
      res.json({ message: "Education deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

export default router;
