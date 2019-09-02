const  expect = require('chai').expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const SignIn = require('../../../../client/src/components/SignIn.js');

chai.use(chaiHttp);

describe('SignIn', () => {
	it('simulates click events', () => {
    const onClick = sinon.spy();
    const wrapper = mount((
      <SignIn onClick={onClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(onClick).to.have.property('callCount', 1);
  });
});