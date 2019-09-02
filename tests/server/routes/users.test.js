const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;

const server = require('../../../server/app');

chai.use(chaiHttp);

//token variable to help run the test
let token;

//test suite for the user route
describe('Users route', () => {
  const signup = '/users/signup';
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const preSave = {
    email: 'rontest@gmail.com',
    password: faker.internet.password(),
  };

  before(async () => {
    const result = await chai
      .request(server)
      .post(signup)
      .send(preSave);
    expect(result.status).to.equal(200);
    token = result.body.token;
  });

  // after all test have run we drop our test database
  after('droping test db', async () => {
    await mongoose.connection.dropDatabase(() => {
      console.log('\n Test database dropped');
    });
    await mongoose.connection.close();
  });

  //testing signup
  describe('signup', () => {
    it('should crete new user if email not found', async () => {
      try {
        const result = await chai
          .request(server)
          .post(signup)
          .send(user);
        expect(result.status).to.equal(200);
        expect(result.body).not.to.be.empty;
        expect(result.body).to.have.property('token');
      } catch (error) {
        console.log(error);
      }
    });

    it('should return 403 if email was found', async () => {
      try {
        await chai
          .request(server)
          .post(signup)
          .send(preSave);
      } catch (error) {
        expect(error.status).to.equal(403);
        expect(error.response.text).to.equal('{"error":"Email is already in use"}');
      }
    });
  });
});  