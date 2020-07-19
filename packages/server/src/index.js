import server from './app';
import connectDb from './models';
import { logger } from './utils';
import env from './config';

connectDb()
    .then(async () => {
        await server.listen(env.PORT);
        console.log(`Server running at port ${env.PORT}...`);
    })
    .catch(logger.log);
