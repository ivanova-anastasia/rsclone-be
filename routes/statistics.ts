import { GameModel } from '../types/game';
import { BodyProp, Controller, Delete, Get, Post, Route, Tags } from 'tsoa';

@Route('/statistics')
@Tags('StatisticsController')
export class StatisticsController extends Controller {
  @Get()
  public async getAll(): Promise<any[]> {
    return GameModel.find({})
      .then((items: any) => items)
      .catch((err: any) => this.setStatus(500));
  }

  @Post()
  public async create(
    @BodyProp() userId: string,
    @BodyProp() score: string,
    @BodyProp() totalTime: string
  ): Promise<any> {
    const newGame = new GameModel({
      userId: userId,
      score: score,
      totalTime: totalTime,
    });
    this.setStatus(201);

    return newGame
      .save()
      .then((item) => {
        this.setStatus(201);
        return item;
      })
      .catch((err) => this.setStatus(500));
  }

  @Get('/{userId}')
  public async getByUserId(userId: string): Promise<any[]> {
    return GameModel.find({ userId: userId })
      .then((items: any) => items)
      .catch((err: any) => this.setStatus(500));
  }

  @Delete('/{userId}')
  public async deleteByUserId(userId: string): Promise<void> {
    GameModel.deleteMany({ userId: userId })
      .then(() => this.setStatus(204))
      .catch((err) => this.setStatus(500));
  }
}
