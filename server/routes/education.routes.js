import { Router } from 'express';
import Education from '../models/education.model.js';

const router = Router();

router.post('/', async (req, res) => res.status(201).json(await Education.create(req.body)));
router.get('/', async (_req, res) => res.json(await Education.find()));
router.get('/:id', async (req, res) => res.json(await Education.findById(req.params.id)));
router.put('/:id', async (req, res) => {
  const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/:id', async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: 'Education deleted' });
});
router.delete('/', async (_req, res) => {
  const result = await Education.deleteMany();
  res.json({ deleted: result.deletedCount });
});

export default router;
