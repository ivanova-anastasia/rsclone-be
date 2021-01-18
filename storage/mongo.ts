import { Collection, MongoClient, ObjectID } from 'mongodb';
import { GameType } from '../types/game';

const DB_NAME = 'bird';
const collectionName = 'statistics2';

type DbWrapperType<T> = T & {
  _id: ObjectID;
};

const uri =
  'mongodb+srv://flappy-bird:0XefcRAh1O8ZWJYU@cluster0.jby6t.mongodb.net/bird?retryWrites=true&w=majority';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(uri);
  return client.db(DB_NAME);
};

const getCollection = async (): Promise<Collection> => {
  const db = await getMongoInstance();
  return db.collection<DbWrapperType<GameType>>(collectionName);
};

const listAll = async () => {
  const collection = await getCollection();
  return collection.find({}).toArray();
};

const getById = async (userId: string) => {
  const collection = await getCollection();
  const fineEl = await collection.find({ userId: userId }).toArray();
  return fineEl;
};

const create = async (game: GameType) => {
  const collection = await getCollection();

  const response = await collection.insertOne({ ...game });
  return response.ops[0];
};

const update = async (game: GameType) => {
  const collection = await getCollection();
  const id = game.userId;
  const response = await collection.replaceOne({ id }, game);

  return response.ops[0];
};

const remove = async (_id: string) => {
  const collection = await getCollection();
  return collection.deleteOne({ _id: new ObjectID(_id) });
};

export { listAll, getById, create, update, remove };
