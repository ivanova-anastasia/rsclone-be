import express from 'express';
const router = express.Router();
import { GameModel } from '../types/game';

router.route('/').get((req, res) => {
  GameModel.find({})
    .then((items: any) => res.json(items))
    .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  GameModel.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const newGame = new GameModel({
    userId: req.body.userId,
    score: req.body.score,
    totalTime: req.body.totalTime,
  });

  newGame
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:userId').delete((req, res) => {
  GameModel.deleteMany({ userId: req.params.userId })
    .then(() => res.json('Game deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

export default router;
