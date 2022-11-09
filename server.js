import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { default as entrepriseRoutes } from './routes/entreprise.router.js';
import { default as professeurRoutes } from './routes/professeur.router.js';
import { default as juryRoutes } from './routes/jury.router.js';
import { default as soutenanceRoutes } from './routes/soutenance.router.js';
import pkg from 'pg';
const { Client } = pkg;
dotenv.config();

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(__dirname + '/public'));
const pg_user = process.env.PG_USER;
const pg_host = process.env.PG_HOST;
const pg_database = process.env.PG_DATABASE;
const pg_password = process.env.PG_PASSWORD;

export const client = new Client({
    user: pg_user,
    host: pg_host,
    database: pg_database,
    password: pg_password,
});

client.connect();
console.log('Connexion à la base de données réussie');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("[x] URL: "+req.url);
    console.log("[x] IP: "+req.ip);
    console.log("-----------------------");
    next();
});

app.use('/entreprise', entrepriseRoutes);
app.use('/professeur', professeurRoutes);
app.use('/jury', juryRoutes);
app.use('/soutenance', soutenanceRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("*", (req, res) => {
    res.status(404).send('404');
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});