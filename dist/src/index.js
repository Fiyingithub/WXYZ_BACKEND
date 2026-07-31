import express, {} from 'express';
import pool from "./config/pgdb.config.js";
import UserRoute from "./routes/user.route.js";
const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api/user', UserRoute);
pool.connect()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('An error occuured:', err);
});
//# sourceMappingURL=index.js.map