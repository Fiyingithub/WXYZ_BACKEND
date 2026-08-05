import express, { type Request, type Response } from 'express';
// import pool from './config/pgdb.config.ts';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.route.ts';
import ENV from './config/env.config.ts';
import logger from './logger.ts';




const app = express();
const port = ENV.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// helmet
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

// CORS
const corsOptions = {
    origin: ["http://localhost:5174","*","https://wxyzwears.netlify.app", "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');

})

app.use('/api', routes);


app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});


// pool.connect()
// .then(() => {
//     app.listen(port, () => {
//         logger.info(`Server is running on http://localhost:${port}`);
//     });
// }
// ).catch((err: any) => {
//     logger.error('An error occurred:', err);
// })
