import express, { type Application, type Router } from 'express';
import type { Config } from './config/config.js';
import type { DBService } from './db/db.service.js';

export class App {
  constructor(
    private readonly config: Config,
    private readonly router: Router,
    private readonly db: DBService,
    private readonly app: Application = express(),
  ) {
    this.init();
  }

  private init() {
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // TODO: cors
    // TODO: rate limiter
    this.app.use('/api', this.router);
    // TODO: error middleware always last (err, req, res, next) => {...}
  }

  public bootstrap() {
    this.db
      .initialize()
      .then(() => console.log('db is up'))
      .catch(console.error);

    this.app.listen(this.config.APP_PORT, () => {
      console.log('server started at port:', this.config.APP_PORT);
    });
  }
}
