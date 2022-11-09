import { client } from '../server.js';

const list = (callback) => {
    client.query(
        `SELECT * FROM entreprise`,
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, results.rows);
        }
    );
}

const add = (body, callback) => {
    client.query(
        `INSERT INTO entreprise (nomentreprise) VALUES ($1)`,
        [body.nomentreprise],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, "Entreprise ajoutée");
        }
    );
}

export default {
    list,
    add
}