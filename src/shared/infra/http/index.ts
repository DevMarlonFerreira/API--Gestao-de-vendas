import logger from '@config/logger';
require('@config/process');
import { SetupServer } from './server';
// import { app } from './app';
// import { dataSource } from '../typeorm/ormconfig';

(async (): Promise<void> => {
  try {
    const server = new SetupServer(3333);
    await server.init();
    await server.start();
  } catch (error) {
    logger.error(`App encerrado com erro: ${error}`);
    process.exit(1); // Failure = 1, Success = 0
  }
})();

// dataSource.initialize().then(() => {
//   const server = app.listen(process.env.PORT || 3333, () => {
//     console.log(`Server started on port ${process.env.PORT || 3333}! 🏆`);
//   });
// });
