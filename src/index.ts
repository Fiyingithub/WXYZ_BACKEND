import express, { type Request, type Response } from 'express';
import pool from './config/pgdb.config.ts';
import UserRoute from './routes/user.route.ts';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.route.ts';



const app = express();
const port = 3000;
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
    origin: ["*", "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');

})

app.use('/api', routes);


pool.connect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
).catch((err) => {
    console.error('An error occuured:', err);
})
