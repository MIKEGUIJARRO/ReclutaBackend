import dotenv from 'dotenv';
dotenv.config({
  path: `${__dirname}/config/${process.env.NODE_ENV}.env`,
});

import { App } from './app';

const runServerHandler = () => {
  const app = new App();
  app.init();
  app.listen();
};

runServerHandler();
