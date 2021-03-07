const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

const AuthService = require("../services/auth.service");
const authInstance = new AuthService();

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





describe('SignUp Service', () => {

  it('expects to create user and returns the created user object', async (done) => {
    const createdUser = await authInstance.signUp({
      firstName: "Demo",
      lastName: "User",
      email: "a@a.com",
      password: "1234567",
      userType: "contractor",
      duration: "5 months",
      role: "Product Manager"
    })
    expect(createdUser).toBeObject();
    done()
  });

});


describe('SignIn Service', () => {

  it('expects to sign user in and returns the created user object, and token', async (done) => {
    await authInstance.signUp({
      firstName: "Demo",
      lastName: "User",
      email: "a@a.com",
      password: "1234567",
      userType: "contractor",
      duration: "5 months",
      role: "Product Manager"
    })
    const authUser = await authInstance.signIn({ email: "a@a.com", password: "1234567" })
    expect(authUser.user).toBeObject();
    expect(authUser.token).toBeString();
    done()
  });

});