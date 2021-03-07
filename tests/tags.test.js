const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const TagService = require("../services/tag.service");
const tagInstance = new TagService();

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

describe('User Auth Test', () => {
  it('Expects to create a tag and returns the tag object', async (done) => {
    const createdTag = await tagInstance.createTag({ name: "JX", details: "JX Details" })
    expect(createdTag).toBeObject();
    done()
  });
});