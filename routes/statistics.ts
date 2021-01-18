import { v4 as uuid } from 'uuid';
import { Router } from 'express';
import * as storage from '../storage/mongo';
const router = Router();

router.get('/', async (req, res, next) => {
  const list = await storage.listAll();
  res.json(list);
});

router.get('/:id', async (req, res, next) => {
  const item = await storage.getById(req.params['id']);

  res.status(item ? 200 : 400).json(item);
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.create(body);
  res.json(newBody);
});

router.delete('/:id', async (req, res, next) => {
  const deletedValue = await storage.remove(req.params['id']);
  console.log('Del value: ' + deletedValue);

  res.status(204).json(null);
});
export default router;
