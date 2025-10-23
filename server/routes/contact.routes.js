import { Router } from 'express';
import Contact from '../models/contact.model.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => res.json(await Contact.find()));
router.get('/:id', async (req, res) => res.json(await Contact.findById(req.params.id)));
router.put('/:id', async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
});
router.delete('/', async (_req, res) => {
  const result = await Contact.deleteMany();
  res.json({ deleted: result.deletedCount });
});

export default router;
