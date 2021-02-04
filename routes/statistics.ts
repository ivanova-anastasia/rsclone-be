import { GameModel } from '../types/game';
import { UsersModel } from '../types/user';
import {
  BodyProp,
  Controller,
  Delete,
  Get,
  Post,
  Route,
  Tags,
  Security,
  Request,
} from 'tsoa';

@Route('/statistics')
@Tags('StatisticsController')
export class StatisticsController extends Controller {
  @Get('/all')
  public async getAll(): Promise<any[]> {
    return GameModel.find({}).populate({ path: 'userId', select: 'userName' }).then((games: any) => {
      const users = [...Array.from(new Set(games.map(game => game.userId?.userName)))];
       return users.map(user => {
          const maxScore = games.filter(game => game.userId?.userName === user).sort((a, b) => b.score - a.score)[0].score
          return {user: user, score: maxScore}
        }).sort((a, b) => b.score - a.score)
      })
      .catch((err: any) => {
          this.setStatus(500)
      });
  }

  @Security('api_token')
  @Post()
  public async create(
    @BodyProp() score: number,
    @Request() req: any,
    @BodyProp() totalTime?: string
  ): Promise<any> {
    const userId = req.app.get('session');

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

  @Security('api_token')
  @Get()
  public async getByUserId(@Request() req: any): Promise<any[]> {
    const userId = req.app.get('session');
    return GameModel.find({ userId: userId })
      .then((items: any) => {
        return items;
      })
      .catch((err: any) => this.setStatus(500));
  }

  @Security('api_token')
  @Delete()
  public async deleteByUserId(@Request() req: any): Promise<void> {
    const userId = req.app.get('session');
    GameModel.deleteMany({ userId: userId })
      .then(() => this.setStatus(204))
      .catch((err) => this.setStatus(500));
  }
}
