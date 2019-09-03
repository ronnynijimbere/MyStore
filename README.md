# MyStore
MERN Stack Authentication that authenticates Local, google and facebook strategies

To Start the App
Front End
cd client && npm/yarn install 
npm run client-dev
server runs on http://localhost:3000

BackEnd
npm/yarn install && npm run server-dev
server runs on http://localhost:5000

How to use the App
1. The Dashboard is inaccessible to non-registered users

2. First Sign Up
a.Local Strategy(enter your email & password)
b. If user has google (goole-plus strategy) or facebook (facebook strategy), click appropriate button

3. User can logout and SignIn again using the 3 strategies mentioned above

Tests
Backend
npm run test / yarn test

front-end
npm run test1 / yarn test1 (Still having errors): Dont run tests for now

Third Party Api
GoogleOauth and FacebookOauth were used..A google and Facebook account is required
for users to be autheticated.
