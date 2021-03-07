const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const UserService = require("../services/user.service");
const userInstance = new UserService();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  }, (err) => {
    if (err) console.error(err);
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Find Users', () => {
  it('Expects to create user', async (done) => {
    const fetchedUser = await userInstance.getUsers()
    expect(fetchedUser).toBeArray();
    done()
  });
});