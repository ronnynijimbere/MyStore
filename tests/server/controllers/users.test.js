const chai = require('chai');
const faker = require('faker');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
const { expect } = chai;

const User = require('../../../server/models/user');
const userController = rewire('../../../server/controllers/users.js');

chai.use(sinonChai);

let sandbox = null;

//testing our controllers
describe('Users controller', () => {
  let req = {
    user: {
      id: faker.random.number(),
    },
    value: {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    },
  };
  let res = {
    json: function() {
      return this;
    },
    status: function() {
      return this;
    },
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('secret', () => {
    it('should return resource when called', async () => {
      sandbox.spy(console, 'log');
      sandbox.spy(res, 'json');

      try {
        await userController.secret(req, res);

        expect(console.log).to.have.been.called;
        expect(
          res.json.calledWith({
            secret: 'Welcome Home',
          }),
        ).to.be.ok;
        expect(res.json).to.have.been.calledWith({
          secret: 'Welcome Home',
        });
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('googleOAuth', () => {
    it('should return token if user passed the passport google oauth', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');

      let signToken = userController.__set__('signToken', user => 'fakeTokenFromGoogleController');

      try {
        await userController.googleOAuth(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
          token: 'fakeTokenFromGoogleController',
        });
        signToken();
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});  
