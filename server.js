import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';
import studentRoutes from './src/students/routes.js';
import entrepriseRoutes from './src/entreprise/routes.js';
// import { default as entrepriseRoutes } from './routes/entreprise.router.js';
// import { default as professeurRoutes } from './routes/professeur.router.js';
// import { default as juryRoutes } from './routes/jury.router.js';
// import { default as soutenanceRoutes } from './routes/soutenance.router.js';

dotenv.config();

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(__dirname + '/public'));

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("[x] URL: "+req.url);
    console.log("[x] IP: "+req.ip);
    console.log("-----------------------");
    next();
});

// app.use('/entreprise', entrepriseRoutes);
// app.use('/professeur', professeurRoutes);
// app.use('/jury', juryRoutes);
// app.use('/soutenance', soutenanceRoutes);

app.use("/api/v1/students", studentRoutes);
app.use('/api/v1/entreprise', entrepriseRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("*", (req, res) => {
    res.status(404).send('404');
});

pool.connect().then(() => {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}).catch((err) => {
    console.log(err);
    console.log("Erreur de connexion à la base de données");
});