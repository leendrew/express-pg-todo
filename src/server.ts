import express from 'express';
import { dbService } from './db.service.js';
import { config } from './config.js';
import { router } from './core.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

(() => {
  dbService
    .initialize()
    .then(() => console.log('db is up'))
    .catch(console.error);

  app.listen(config.APP_PORT, () => {
    console.log('server started at port:', config.APP_PORT);
  });
})();
