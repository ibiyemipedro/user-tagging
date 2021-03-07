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

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Auth Test', () => {
  it('Expects to create user', async (done) => {
    const createdTag = await tagInstance.createTag({ name: "JX", details: "JX Details" })
    expect(createdTag).toBeDefined();
    done()
  });
});





// const { mongoTestConnection, mongoTestDisconnect } = require("../config/testConfig")
// const Tag = require('../models/tag.models');


// const AuthService = require("../services/auth.service");
// const authInstance = new AuthService();

// const TagService = require("../services/tag.service");
// const tagInstance = new TagService();

// beforeAll(async () => {
//   await mongoTestConnection();
// });

// afterAll(async () => {
//   await Tag.deleteMany({ __v: 0 })
//   await mongoTestDisconnect()
// });


// describe('User Auth Test', () => {
//   it('Expects to create user', async (done) => {
//     const createdTag = await tagInstance.createTag({ name: "JX", details: "JX Details" })
//     expect(createdTag).toBeDefined();
//     done()
//   });
// });