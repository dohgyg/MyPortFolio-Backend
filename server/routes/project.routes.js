import { Router } from 'express';
import Project from '../models/project.model.js';

const router = Router();

router.post('/', async (req, res) => res.status(201).json(await Project.create(req.body)));
router.get('/', async (_req, res) => res.json(await Project.find()));
router.get('/:id', async (req, res) => res.json(await Project.findById(req.params.id)));
router.put('/:id', async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});
router.delete('/', async (_req, res) => {
  const result = await Project.deleteMany();
  res.json({ deleted: result.deletedCount });
});

export default router;
